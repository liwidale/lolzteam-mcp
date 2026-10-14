import { messages } from "./i18n/index.ts";

export const DEFAULT_FORUM_BASE_URL = "https://api.lolz.live";
export const DEFAULT_MARKET_BASE_URL = "https://api.lzt.market";

export interface ServiceConfig {
  baseUrl: string;
  token: string | undefined;
}

export interface Config {
  forum: ServiceConfig;
  market: ServiceConfig;
  locale: string | undefined;
  timeoutMs: number;
  maxRetries: number;
  maxRateLimitWaitMs: number;
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

type Env = Record<string, string | undefined>;

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

function read(env: Env, name: string): string | undefined {
  const value = env[name]?.trim();
  return value ? value : undefined;
}

export function isValidToken(token: string): boolean {
  return token.length <= 4096 && /^[\x21-\x7e]+$/.test(token);
}

function readToken(env: Env, name: string): string | undefined {
  const token = read(env, name);
  if (token === undefined) return undefined;
  if (!isValidToken(token)) {
    throw new ConfigError(messages.config.token(name));
  }
  return token;
}

function readBaseUrl(env: Env, name: string, fallback: string): string {
  const raw = read(env, name) ?? fallback;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new ConfigError(messages.config.absoluteUrl(name));
  }
  const isLocal = LOCAL_HOSTS.has(url.hostname);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocal)) {
    throw new ConfigError(messages.config.https(name));
  }
  if (url.username || url.password || url.search || url.hash) {
    throw new ConfigError(messages.config.urlParts(name));
  }
  return url.href.replace(/\/+$/, "");
}

function readInteger(env: Env, name: string, fallback: number, min: number, max: number): number {
  const raw = read(env, name);
  if (raw === undefined) return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new ConfigError(messages.config.integer(name, min, max));
  }
  return value;
}

function readLocale(env: Env): string | undefined {
  const locale = read(env, "LOLZTEAM_LOCALE");
  if (locale !== undefined && !/^[a-z]{2}(-[a-z]{2})?$/i.test(locale)) {
    throw new ConfigError(messages.config.locale);
  }
  return locale;
}

export function loadConfig(env: Env = process.env): Config {
  const sharedToken = readToken(env, "LOLZTEAM_TOKEN");
  return {
    forum: {
      baseUrl: readBaseUrl(env, "LOLZTEAM_FORUM_BASE_URL", DEFAULT_FORUM_BASE_URL),
      token: readToken(env, "LOLZTEAM_FORUM_TOKEN") ?? sharedToken,
    },
    market: {
      baseUrl: readBaseUrl(env, "LOLZTEAM_MARKET_BASE_URL", DEFAULT_MARKET_BASE_URL),
      token: readToken(env, "LOLZTEAM_MARKET_TOKEN") ?? sharedToken,
    },
    locale: readLocale(env),
    timeoutMs: readInteger(env, "LOLZTEAM_TIMEOUT_MS", 60_000, 1_000, 600_000),
    maxRetries: readInteger(env, "LOLZTEAM_MAX_RETRIES", 2, 0, 5),
    maxRateLimitWaitMs: readInteger(env, "LOLZTEAM_MAX_RATE_LIMIT_WAIT_MS", 15_000, 0, 120_000),
  };
}
