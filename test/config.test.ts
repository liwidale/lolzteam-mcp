import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ConfigError,
  DEFAULT_FORUM_BASE_URL,
  DEFAULT_MARKET_BASE_URL,
  loadConfig,
} from "../src/config.ts";

describe("loadConfig", () => {
  it("uses safe defaults without any variables", () => {
    const config = loadConfig({});
    assert.equal(config.forum.baseUrl, DEFAULT_FORUM_BASE_URL);
    assert.equal(config.market.baseUrl, DEFAULT_MARKET_BASE_URL);
    assert.equal(config.forum.token, undefined);
    assert.equal(config.market.token, undefined);
    assert.equal(config.timeoutMs, 60_000);
    assert.equal(config.maxRetries, 2);
    assert.equal(config.maxRateLimitWaitMs, 15_000);
    assert.equal(config.locale, undefined);
  });

  it("shares one token and lets service tokens override it", () => {
    const config = loadConfig({ LOLZTEAM_TOKEN: "shared", LOLZTEAM_MARKET_TOKEN: " market " });
    assert.equal(config.forum.token, "shared");
    assert.equal(config.market.token, "market");
  });

  it("treats blank values as unset", () => {
    const config = loadConfig({ LOLZTEAM_TOKEN: "   ", LOLZTEAM_TIMEOUT_MS: "" });
    assert.equal(config.forum.token, undefined);
    assert.equal(config.timeoutMs, 60_000);
  });

  it("rejects tokens that could break the Authorization header", () => {
    assert.throws(() => loadConfig({ LOLZTEAM_TOKEN: "abc def" }), ConfigError);
    assert.throws(() => loadConfig({ LOLZTEAM_FORUM_TOKEN: "abc\ndef" }), ConfigError);
  });

  it("normalizes base URLs and enforces https", () => {
    const config = loadConfig({ LOLZTEAM_FORUM_BASE_URL: "https://api.lolz.team/" });
    assert.equal(config.forum.baseUrl, "https://api.lolz.team");
    assert.throws(
      () => loadConfig({ LOLZTEAM_MARKET_BASE_URL: "http://api.lzt.market" }),
      /must use https/,
    );
    assert.equal(
      loadConfig({ LOLZTEAM_MARKET_BASE_URL: "http://localhost:8080" }).market.baseUrl,
      "http://localhost:8080",
    );
  });

  it("rejects base URLs with credentials, queries or garbage", () => {
    assert.throws(() => loadConfig({ LOLZTEAM_FORUM_BASE_URL: "not a url" }), ConfigError);
    assert.throws(
      () => loadConfig({ LOLZTEAM_FORUM_BASE_URL: "https://user:pass@api.lolz.live" }),
      ConfigError,
    );
    assert.throws(
      () => loadConfig({ LOLZTEAM_FORUM_BASE_URL: "https://api.lolz.live/?a=1" }),
      ConfigError,
    );
  });

  it("validates numeric limits and locale", () => {
    assert.equal(loadConfig({ LOLZTEAM_MAX_RETRIES: "0" }).maxRetries, 0);
    assert.throws(() => loadConfig({ LOLZTEAM_MAX_RETRIES: "9" }), ConfigError);
    assert.throws(() => loadConfig({ LOLZTEAM_TIMEOUT_MS: "1.5" }), ConfigError);
    assert.throws(() => loadConfig({ LOLZTEAM_TIMEOUT_MS: "abc" }), ConfigError);
    assert.equal(loadConfig({ LOLZTEAM_LOCALE: "ru" }).locale, "ru");
    assert.throws(() => loadConfig({ LOLZTEAM_LOCALE: "russian" }), ConfigError);
  });
});
