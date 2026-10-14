import { LolzteamError, type ErrorCode } from "../errors.ts";
import { VERSION } from "../version.ts";
import { buildQuery, type Query } from "./query.ts";
import { RateLimiter, type RateLimit } from "./rate-limiter.ts";

export type JsonObject = Record<string, unknown>;

export interface ApiClientOptions {
  service: string;
  baseUrl: string;
  token: string | undefined;
  tokenVariable: string;
  locale?: string | undefined;
  timeoutMs: number;
  maxRetries: number;
  maxRateLimitWaitMs: number;
  buckets: Readonly<Record<string, RateLimit>>;
  fetch?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
  now?: () => number;
}

export interface ApiRequest {
  method?: "GET" | "POST";
  path: string;
  query?: Query;
  body?: JsonObject;
  bucket: string;
  signal?: AbortSignal | undefined;
}

const MAX_RESPONSE_BYTES = 8 * 1024 * 1024;
const RETRYABLE_STATUSES = new Set([500, 502, 503, 504]);

const STATUS_ERRORS: Record<number, { code: ErrorCode; message: string }> = {
  400: { code: "bad_request", message: "The API rejected the request parameters." },
  401: { code: "unauthorized", message: "The API token is missing, invalid or expired." },
  403: {
    code: "forbidden",
    message: "The token does not have permission for this action or lacks a required scope.",
  },
  404: { code: "not_found", message: "The requested resource was not found." },
  422: { code: "bad_request", message: "The API rejected the request parameters." },
};

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function backoff(attempt: number): number {
  return Math.min(1_000 * 2 ** attempt, 8_000);
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export class ApiClient {
  readonly #options: ApiClientOptions;
  readonly #limiters = new Map<string, RateLimiter>();
  readonly #fetch: typeof fetch;
  readonly #sleep: (ms: number) => Promise<void>;
  readonly #now: () => number;

  constructor(options: ApiClientOptions) {
    this.#options = options;
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.#sleep = options.sleep ?? defaultSleep;
    this.#now = options.now ?? Date.now;
    for (const [name, limit] of Object.entries(options.buckets)) {
      this.#limiters.set(name, new RateLimiter(limit));
    }
  }

  get configured(): boolean {
    return this.#options.token !== undefined;
  }

  async request(request: ApiRequest): Promise<JsonObject> {
    const { token, tokenVariable, service, maxRetries } = this.#options;
    if (token === undefined) {
      throw new LolzteamError(
        "not_configured",
        `No ${service} API token is configured. Set ${tokenVariable} or LOLZTEAM_TOKEN in the MCP server environment.`,
      );
    }
    const method = request.method ?? "GET";
    const endpoint = `${method} ${request.path}`;
    const url = this.#url(request);
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "User-Agent": `lolzteam-mcp/${VERSION}`,
    };
    if (request.body) headers["Content-Type"] = "application/json";

    for (let attempt = 0; ; attempt++) {
      await this.#acquire(request.bucket, endpoint);
      let response: Response;
      try {
        response = await this.#fetch(url, {
          method,
          headers,
          body: request.body ? JSON.stringify(request.body) : null,
          signal: this.#signal(request.signal),
        });
      } catch (error) {
        const failure = this.#transportError(error, endpoint, request.signal);
        if (failure.code === "cancelled" || attempt >= maxRetries) throw failure;
        await this.#sleep(backoff(attempt));
        continue;
      }

      this.#syncLimits(request.bucket, response.headers);

      if (response.status === 429) {
        const delay = this.#retryDelay(response.headers) ?? backoff(attempt);
        this.#limiter(request.bucket).blockUntil(this.#now() + delay);
        if (attempt < maxRetries && delay <= this.#options.maxRateLimitWaitMs) {
          await this.#sleep(delay);
          continue;
        }
        throw new LolzteamError(
          "rate_limited",
          `The ${service} API rate limit was reached. Try again later.`,
          { status: 429, endpoint, retryAfterSeconds: Math.max(1, Math.ceil(delay / 1000)) },
        );
      }

      if (RETRYABLE_STATUSES.has(response.status) && attempt < maxRetries) {
        await this.#sleep(backoff(attempt));
        continue;
      }

      return this.#parse(response, endpoint);
    }
  }

  #url(request: ApiRequest): string {
    const url = new URL(this.#options.baseUrl + request.path);
    const params = buildQuery({ ...request.query, locale: this.#options.locale });
    url.search = params.toString();
    return url.href;
  }

  #signal(external: AbortSignal | undefined): AbortSignal {
    const timeout = AbortSignal.timeout(this.#options.timeoutMs);
    return external ? AbortSignal.any([timeout, external]) : timeout;
  }

  #limiter(bucket: string): RateLimiter {
    const limiter = this.#limiters.get(bucket);
    if (!limiter) throw new Error(`Unknown rate limit bucket: ${bucket}`);
    return limiter;
  }

  async #acquire(bucket: string, endpoint: string): Promise<void> {
    const limiter = this.#limiter(bucket);
    for (;;) {
      const wait = limiter.waitTime(this.#now());
      if (wait <= 0) {
        limiter.reserve(this.#now());
        return;
      }
      if (wait > this.#options.maxRateLimitWaitMs) {
        throw new LolzteamError(
          "rate_limited",
          `The local ${this.#options.service} rate limit is exhausted. Try again later.`,
          { endpoint, retryAfterSeconds: Math.max(1, Math.ceil(wait / 1000)) },
        );
      }
      await this.#sleep(wait);
    }
  }

  #syncLimits(bucket: string, headers: Headers): void {
    const remaining = Number(headers.get("x-ratelimit-remaining"));
    const reset = Number(headers.get("x-ratelimit-reset"));
    if (headers.has("x-ratelimit-remaining") && remaining <= 0 && reset > 0) {
      this.#limiter(bucket).blockUntil(reset * 1000);
    }
  }

  #retryDelay(headers: Headers): number | undefined {
    const retryAfter = headers.get("retry-after");
    if (retryAfter !== null) {
      const seconds = Number(retryAfter);
      if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
      const date = Date.parse(retryAfter);
      if (!Number.isNaN(date)) return Math.max(0, date - this.#now());
    }
    const reset = Number(headers.get("x-ratelimit-reset"));
    if (reset > 0) return Math.max(0, reset * 1000 - this.#now());
    return undefined;
  }

  #transportError(
    error: unknown,
    endpoint: string,
    external: AbortSignal | undefined,
  ): LolzteamError {
    if (external?.aborted) {
      return new LolzteamError("cancelled", "The request was cancelled.", { endpoint });
    }
    const name = error instanceof Error ? error.name : "";
    if (name === "TimeoutError" || name === "AbortError") {
      return new LolzteamError(
        "timeout",
        `The ${this.#options.service} API did not respond within ${this.#options.timeoutMs} ms.`,
        { endpoint },
      );
    }
    return new LolzteamError(
      "network_error",
      `Could not reach the ${this.#options.service} API. Check the network connection and the base URL.`,
      { endpoint },
    );
  }

  async #parse(response: Response, endpoint: string): Promise<JsonObject> {
    const declaredLength = Number(response.headers.get("content-length"));
    if (declaredLength > MAX_RESPONSE_BYTES) {
      throw new LolzteamError("invalid_response", "The API response is too large to process.", {
        status: response.status,
        endpoint,
      });
    }
    const text = await response.text();
    if (text.length > MAX_RESPONSE_BYTES) {
      throw new LolzteamError("invalid_response", "The API response is too large to process.", {
        status: response.status,
        endpoint,
      });
    }
    let payload: unknown;
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = undefined;
    }
    const apiMessages = this.#apiMessages(payload);

    if (!response.ok) {
      const known = STATUS_ERRORS[response.status];
      const code: ErrorCode = known?.code ?? "upstream_unavailable";
      const message =
        known?.message ??
        `The ${this.#options.service} API returned HTTP ${response.status}. Try again later.`;
      throw new LolzteamError(code, message, { status: response.status, endpoint, apiMessages });
    }
    if (!isJsonObject(payload)) {
      throw new LolzteamError("invalid_response", "The API returned a response that is not JSON.", {
        status: response.status,
        endpoint,
      });
    }
    if (
      apiMessages &&
      Object.keys(payload).every((key) => key === "errors" || key === "system_info")
    ) {
      throw new LolzteamError("bad_request", "The API returned an error.", {
        status: response.status,
        endpoint,
        apiMessages,
      });
    }
    return payload;
  }

  #apiMessages(payload: unknown): string[] | undefined {
    if (!isJsonObject(payload)) return undefined;
    const raw = payload.errors ?? payload.error ?? payload.message;
    const list = Array.isArray(raw) ? raw : isJsonObject(raw) ? Object.values(raw) : [raw];
    const token = this.#options.token;
    const messages = list
      .filter((item): item is string => typeof item === "string" && item.trim() !== "")
      .slice(0, 5)
      .map((item) => {
        const clean = item.slice(0, 500);
        return token ? clean.split(token).join("[redacted]") : clean;
      });
    return messages.length > 0 ? messages : undefined;
  }
}
