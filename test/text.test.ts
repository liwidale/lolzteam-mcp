import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cleanText, compact, excerpt, isoDate, stripMarkup, textList } from "../src/util/text.ts";

describe("text utilities", () => {
  it("removes invisible and bidirectional control characters", () => {
    const hidden = `safe${String.fromCodePoint(0x202e)}text${String.fromCodePoint(0x200b)}\u0007 here`;
    assert.equal(cleanText(hidden), "safetext here");
    assert.equal(cleanText("  a\r\n\n\n\nb  "), "a\n\nb");
    assert.equal(cleanText("   "), undefined);
    assert.equal(cleanText(42), undefined);
  });

  it("strips HTML and BBCode and decodes entities", () => {
    assert.equal(
      stripMarkup("<b>Hello</b><br>[url=https://x.y]link[/url] &amp; &#39;ok&#39;"),
      "Hello\nlink & 'ok'",
    );
    assert.equal(stripMarkup("<p>one</p><p>two</p>"), "one\ntwo");
  });

  it("truncates with an explicit marker", () => {
    assert.equal(excerpt("abcdef", 10), "abcdef");
    assert.equal(excerpt("abcdefghij", 4), "abcd [truncated, 6 more characters]");
    assert.equal(excerpt(undefined, 4), undefined);
  });

  it("converts unix timestamps to ISO dates", () => {
    assert.equal(isoDate(1_700_000_000), "2023-11-14T22:13:20.000Z");
    assert.equal(isoDate("1700000000"), "2023-11-14T22:13:20.000Z");
    assert.equal(isoDate(0), undefined);
    assert.equal(isoDate("never"), undefined);
  });

  it("reads tag lists from arrays and objects", () => {
    assert.deepEqual(textList(["a", " ", "b"]), ["a", "b"]);
    assert.deepEqual(textList({ 1: "x", 2: "y" }), ["x", "y"]);
    assert.deepEqual(textList(null), []);
  });

  it("drops empty values", () => {
    assert.deepEqual(compact({ a: 1, b: undefined, c: "", d: [], e: {}, f: false, g: 0 }), {
      a: 1,
      f: false,
      g: 0,
    });
  });
});
