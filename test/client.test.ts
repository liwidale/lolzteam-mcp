import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { LolzteamError } from "../src/errors.ts";
import { ApiClient, type ApiClientOptions } from "../src/http/client.ts";
import { fakeFetch, json, TEST_TOKEN, type Handler } from "./helpers.ts";

function createClient(handler: Handler, options: Partial<ApiClientOptions> = {}) {
  let now = 1_000_000;
  const sleeps: number[] = [];
  const { fetch, requests } = fakeFetch(handler);
  const client = new ApiClient({
    service: "Forum",
    baseUrl: "https://api.example.test",
    token: TEST_TOKEN,
    tokenVariable: "LOLZTEAM_FORUM_TOKEN",
    timeoutMs: 5_000,
    maxRetries: 2,
    maxRateLimitWaitMs: 10_000,
    buckets: { get: { limit: 300, windowMs: 60_000 } },
    fetch,
    now: () => now,
    sleep: (ms) => {
      sleeps.push(ms);
      now += ms;
      return Promise.resolve();
    },
    ...options,
  });
  return { client, requests, sleeps, advance: (ms: number) => (now += ms) };
}

async function failure(promise: Promise<unknown>): Promise<LolzteamError> {
  try {
    await promise;
  } catch (error) {
    assert.ok(error instanceof LolzteamError);
    return error;
  }
  assert.fail("Expected the request to fail");
}

describe("ApiClient", () => {
  it("sends the bearer token, locale and query parameters", async () => {
    const { client, requests } = createClient(() => json({ ok: true }), { locale: "ru" });
    const result = await client.request({
      path: "/threads",
      bucket: "get",
      query: { forum_id: 8 },
    });
    assert.deepEqual(result, { ok: true });
    const [request] = requests;
    assert.equal(request?.headers.get("authorization"), `Bearer ${TEST_TOKEN}`);
    assert.equal(request?.url.pathname, "/threads");
    assert.equal(request?.url.searchParams.get("forum_id"), "8");
    assert.equal(request?.url.searchParams.get("locale"), "ru");
  });

  it("sends JSON bodies for POST requests", async () => {
    const { client, requests } = createClient(() => json({ data: [] }));
    await client.request({ method: "POST", path: "/search", bucket: "get", body: { q: "steam" } });
    assert.equal(requests[0]?.method, "POST");
    assert.equal(requests[0]?.headers.get("content-type"), "application/json");
    assert.deepEqual(requests[0]?.body, { q: "steam" });
  });

  it("refuses to call the API without a token", async () => {
    const { client, requests } = createClient(() => json({}), { token: undefined });
    const error = await failure(client.request({ path: "/x", bucket: "get" }));
    assert.equal(error.code, "not_configured");
    assert.match(error.message, /LOLZTEAM_FORUM_TOKEN/);
    assert.equal(requests.length, 0);
  });

  for (const [status, code] of [
    [400, "bad_request"],
    [401, "unauthorized"],
    [403, "forbidden"],
    [404, "not_found"],
  ] as const) {
    it(`maps HTTP ${status} to ${code} with the API messages`, async () => {
      const { client, requests } = createClient(() =>
        json({ errors: ["Problem happened"] }, status),
      );
      const error = await failure(client.request({ path: "/threads/1", bucket: "get" }));
      assert.equal(error.code, code);
      assert.equal(error.details.status, status);
      assert.equal(error.details.endpoint, "GET /threads/1");
      assert.deepEqual(error.details.apiMessages, ["Problem happened"]);
      assert.equal(requests.length, 1);
    });
  }

  it("never echoes the token back in API messages", async () => {
    const { client } = createClient(() =>
      json({ errors: [`Token ${TEST_TOKEN} is invalid`] }, 401),
    );
    const error = await failure(client.request({ path: "/users/me", bucket: "get" }));
    assert.deepEqual(error.details.apiMessages, ["Token [redacted] is invalid"]);
    assert.doesNotMatch(JSON.stringify(error.details), new RegExp(TEST_TOKEN));
  });

  it("handles non-JSON error pages", async () => {
    const { client } = createClient(() => new Response("<html>401</html>", { status: 401 }));
    const error = await failure(client.request({ path: "/", bucket: "get" }));
    assert.equal(error.code, "unauthorized");
    assert.equal(error.details.apiMessages, undefined);
  });

  it("reports successful responses that are not JSON objects", async () => {
    const { client } = createClient(() => new Response("<html></html>", { status: 200 }));
    const error = await failure(client.request({ path: "/", bucket: "get" }));
    assert.equal(error.code, "invalid_response");
  });

  it("treats a 200 response that only carries errors as a failure", async () => {
    const { client } = createClient(() => json({ errors: ["retry_request"], system_info: {} }));
    const error = await failure(client.request({ path: "/", bucket: "get" }));
    assert.equal(error.code, "bad_request");
    assert.deepEqual(error.details.apiMessages, ["retry_request"]);
  });

  it("retries 429 responses after Retry-After and then succeeds", async () => {
    let calls = 0;
    const { client, sleeps } = createClient(() =>
      ++calls === 1 ? json({ errors: ["Too many"] }, 429, { "retry-after": "3" }) : json({ ok: 1 }),
    );
    assert.deepEqual(await client.request({ path: "/", bucket: "get" }), { ok: 1 });
    assert.equal(calls, 2);
    assert.ok(sleeps.includes(3_000));
  });

  it("returns rate_limited with retry_after_seconds when the wait is too long", async () => {
    const { client, requests } = createClient(() =>
      json({ errors: ["Too many"] }, 429, { "retry-after": "60" }),
    );
    const error = await failure(client.request({ path: "/", bucket: "get" }));
    assert.equal(error.code, "rate_limited");
    assert.equal(error.details.retryAfterSeconds, 60);
    assert.equal(requests.length, 1);

    const second = await failure(client.request({ path: "/", bucket: "get" }));
    assert.equal(second.code, "rate_limited");
    assert.equal(requests.length, 1, "the local limiter blocks until the reset");
  });

  it("uses X-RateLimit-Reset when Retry-After is missing", async () => {
    const { client } = createClient(
      () => json({}, 429, { "x-ratelimit-reset": String(1_000 + 120) }),
      { maxRetries: 0 },
    );
    const error = await failure(client.request({ path: "/", bucket: "get" }));
    assert.equal(error.details.retryAfterSeconds, 120);
  });

  it("pauses when the server reports an exhausted window", async () => {
    let calls = 0;
    const { client, sleeps } = createClient(() => {
      calls++;
      return json({ ok: calls }, 200, {
        "x-ratelimit-remaining": "0",
        "x-ratelimit-reset": String(1_000 + 5),
      });
    });
    await client.request({ path: "/", bucket: "get" });
    await client.request({ path: "/", bucket: "get" });
    assert.deepEqual(sleeps, [5_000]);
  });

  it("enforces the local request budget per bucket", async () => {
    const { client, requests } = createClient(() => json({}), {
      buckets: { get: { limit: 2, windowMs: 60_000 } },
      maxRateLimitWaitMs: 1_000,
    });
    await client.request({ path: "/", bucket: "get" });
    await client.request({ path: "/", bucket: "get" });
    const error = await failure(client.request({ path: "/", bucket: "get" }));
    assert.equal(error.code, "rate_limited");
    assert.equal(error.details.retryAfterSeconds, 60);
    assert.equal(requests.length, 2);
  });

  it("retries server errors and gives up with upstream_unavailable", async () => {
    const { client, requests } = createClient(() => json({}, 503));
    const error = await failure(client.request({ path: "/", bucket: "get" }));
    assert.equal(error.code, "upstream_unavailable");
    assert.equal(requests.length, 3);
  });

  it("recovers from a transient network failure", async () => {
    let calls = 0;
    const { client } = createClient(() => {
      if (++calls === 1) throw new TypeError("fetch failed");
      return json({ ok: true });
    });
    assert.deepEqual(await client.request({ path: "/", bucket: "get" }), { ok: true });
  });

  it("maps persistent network failures and timeouts", async () => {
    const network = createClient(
      () => {
        throw new TypeError("fetch failed");
      },
      { maxRetries: 0 },
    );
    assert.equal(
      (await failure(network.client.request({ path: "/", bucket: "get" }))).code,
      "network_error",
    );

    const timeout = createClient(
      () => {
        throw new DOMException("The operation timed out.", "TimeoutError");
      },
      { maxRetries: 0 },
    );
    const error = await failure(timeout.client.request({ path: "/", bucket: "get" }));
    assert.equal(error.code, "timeout");
  });

  it("does not retry a request the caller cancelled", async () => {
    const controller = new AbortController();
    controller.abort();
    const { client, requests } = createClient(() => {
      throw new DOMException("Aborted", "AbortError");
    });
    const error = await failure(
      client.request({ path: "/", bucket: "get", signal: controller.signal }),
    );
    assert.equal(error.code, "cancelled");
    assert.equal(requests.length, 1);
  });

  it("rejects oversized responses", async () => {
    const { client } = createClient(
      () =>
        new Response("{}", {
          status: 200,
          headers: { "content-length": String(64 * 1024 * 1024) },
        }),
    );
    assert.equal(
      (await failure(client.request({ path: "/", bucket: "get" }))).code,
      "invalid_response",
    );
  });
});
