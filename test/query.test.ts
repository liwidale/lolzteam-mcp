import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildQuery } from "../src/http/query.ts";
import { RateLimiter } from "../src/http/rate-limiter.ts";

describe("buildQuery", () => {
  it("encodes scalars, booleans, arrays and deep objects", () => {
    const params = buildQuery({
      title: "cs 2",
      pmin: 10,
      nsb: true,
      vac: false,
      "game[]": [730, 570],
      hours_played: { "730": 100 },
      skipped: undefined,
    });
    assert.deepEqual(
      [...params.entries()],
      [
        ["title", "cs 2"],
        ["pmin", "10"],
        ["nsb", "1"],
        ["vac", "0"],
        ["game[]", "730"],
        ["game[]", "570"],
        ["hours_played[730]", "100"],
      ],
    );
  });

  it("escapes reserved characters instead of letting them change the query", () => {
    const params = buildQuery({ title: "a&b=c#d" });
    assert.equal(params.toString(), "title=a%26b%3Dc%23d");
  });
});

describe("RateLimiter", () => {
  it("waits until the oldest request leaves the window", () => {
    const limiter = new RateLimiter({ limit: 2, windowMs: 1_000 });
    assert.equal(limiter.waitTime(0), 0);
    limiter.reserve(0);
    limiter.reserve(100);
    assert.equal(limiter.waitTime(200), 800);
    assert.equal(limiter.waitTime(1_000), 0);
  });

  it("honors an explicit block", () => {
    const limiter = new RateLimiter({ limit: 10, windowMs: 1_000 });
    limiter.blockUntil(5_000);
    assert.equal(limiter.waitTime(2_000), 3_000);
    assert.equal(limiter.waitTime(6_000), 0);
  });
});
