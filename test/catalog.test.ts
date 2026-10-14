import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { LolzteamError } from "../src/errors.ts";
import {
  buildFilterQuery,
  CATEGORY_NAMES,
  describeFilters,
  filterValues,
  getCategory,
  RESERVED_FILTERS,
} from "../src/market/catalog.ts";

function invalid(run: () => unknown, pattern: RegExp): void {
  assert.throws(run, (error: unknown) => {
    assert.ok(error instanceof LolzteamError);
    assert.equal(error.code, "invalid_input");
    assert.match(error.message, pattern);
    return true;
  });
}

describe("Market catalog", () => {
  it("covers every documented search category", () => {
    for (const name of ["all", "steam", "telegram", "discord", "world-of-tanks", "onlyfans"]) {
      assert.ok(CATEGORY_NAMES.includes(name), name);
    }
    assert.equal(getCategory("all").path, "/");
    assert.equal(getCategory("world-of-tanks").path, "/world-of-tanks");
  });

  it("knows the shared parameters of every category", () => {
    for (const name of CATEGORY_NAMES) {
      const filters = new Set(getCategory(name).filters.map((filter) => filter.name));
      for (const reserved of Object.keys(RESERVED_FILTERS)) {
        assert.ok(filters.has(reserved), `${name} lacks ${reserved}`);
      }
    }
    assert.ok(filterValues("all", "currency").includes("usd"));
    assert.ok(filterValues("all", "origin[]").includes("autoreg"));
  });

  it("describes filters without the typed parameters", () => {
    const names = describeFilters("steam").map((filter) => filter.name);
    assert.ok(names.includes("game[]"));
    assert.ok(names.includes("hours_played"));
    assert.ok(!names.includes("pmin"));
  });

  it("builds queries for scalar, array and object filters", () => {
    assert.deepEqual(
      buildFilterQuery("steam", {
        game: [730],
        no_vac: true,
        mm_ban: "no",
        hours_played: { "730": 100 },
        lmin: "5",
      }),
      { "game[]": [730], no_vac: true, mm_ban: "no", hours_played: { "730": 100 }, lmin: 5 },
    );
    assert.deepEqual(buildFilterQuery("telegram", { premium: "yes", "country[]": "RUS" }), {
      premium: "yes",
      "country[]": ["RUS"],
    });
  });

  it("rejects unknown filters and points to the discovery tool", () => {
    invalid(() => buildFilterQuery("steam", { drop_table: 1 }), /market_get_category_filters/);
    invalid(() => buildFilterQuery("vpn", { "game[]": [730] }), /Unknown filter/);
    invalid(() => buildFilterQuery("unknown", {}), /Unknown Market category/);
  });

  it("asks for the typed parameter instead of a reserved filter", () => {
    invalid(() => buildFilterQuery("steam", { pmin: 1 }), /min_price/);
    invalid(() => buildFilterQuery("steam", { origin: ["brute"] }), /origin/);
  });

  it("validates value types and documented values", () => {
    invalid(() => buildFilterQuery("telegram", { premium: "maybe" }), /must be one of/);
    invalid(() => buildFilterQuery("steam", { no_vac: "yes" }), /true or false/);
    invalid(() => buildFilterQuery("steam", { mm_ban: true }), /expects text/);
    invalid(() => buildFilterQuery("steam", { eg: 5 }), /must be one of/);
    invalid(() => buildFilterQuery("steam", { lmin: 1.5 }), /whole number/);
    invalid(() => buildFilterQuery("steam", { lmin: "ten" }), /expects a number/);
    invalid(() => buildFilterQuery("steam", { lmin: [1] }), /single value/);
    invalid(() => buildFilterQuery("steam", { "game[]": [] }), /between 1 and 50/);
    invalid(() => buildFilterQuery("steam", { hours_played: [1] }), /expects an object/);
    invalid(() => buildFilterQuery("steam", { hours_played: { "a]&b": 1 } }), /invalid key/);
  });
});
