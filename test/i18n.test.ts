import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { en } from "../src/i18n/en.ts";
import { LANGUAGES, messages, setLocale } from "../src/i18n/index.ts";
import { ru } from "../src/i18n/ru.ts";
import { connect, json } from "./helpers.ts";

function shape(value: unknown): unknown {
  if (typeof value === "function") return `function/${value.length}`;
  if (typeof value === "string") return "string";
  if (typeof value !== "object" || value === null) return typeof value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => [key, shape(item)]),
  );
}

describe("localization", () => {
  afterEach(() => setLocale("en"));

  it("ships English as the source and a complete Russian translation", () => {
    assert.deepEqual(LANGUAGES, ["en", "ru"]);
    assert.deepEqual(shape(ru), shape(en));
  });

  it("picks the catalog from the locale and falls back to English", () => {
    assert.equal(setLocale("ru-RU"), "ru");
    assert.equal(messages.errors.notFound, ru.errors.notFound);
    assert.equal(setLocale("de"), "en");
    assert.equal(messages.errors.notFound, en.errors.notFound);
    assert.equal(setLocale(undefined), "en");
  });

  it("keeps translated strings free of exclamation marks and emoji", () => {
    const texts: string[] = [];
    const collect = (value: unknown): void => {
      if (typeof value === "string") texts.push(value);
      else if (typeof value === "function")
        texts.push((value as (...args: string[]) => string)("x", "y", "z"));
      else if (typeof value === "object" && value !== null) Object.values(value).forEach(collect);
    };
    collect(en);
    collect(ru);
    for (const text of texts) {
      assert.doesNotMatch(text, /!|\p{Extended_Pictographic}/u, text);
    }
  });

  it("uses Russian plural forms", () => {
    assert.equal(ru.output.truncated(1), "[обрезано, еще 1 символ]");
    assert.equal(ru.output.truncated(64), "[обрезано, еще 64 символа]");
    assert.equal(ru.output.truncated(12), "[обрезано, еще 12 символов]");
    assert.equal(ru.output.omittedItems(21), "[еще 21 элемент не показан]");
    assert.equal(ru.output.omittedItems(5), "[еще 5 элементов не показано]");
  });

  it("serves tool descriptions and errors in Russian", async () => {
    setLocale("ru");
    const { client, call, close } = await connect(() => json({ errors: ["Not found"] }, 404));
    const { tools } = await client.listTools();
    const search = tools.find((tool) => tool.name === "forum_search");
    assert.equal(search?.title, ru.tools.forum_search.title);
    const properties = search?.inputSchema.properties as Record<string, { description?: string }>;
    assert.equal(properties.query?.description, ru.tools.forum_search.params.query);
    assert.equal(properties.page?.description, ru.common.page);
    assert.equal(client.getInstructions(), ru.server.instructions);

    const missing = await call("forum_get_thread", { thread_id: 1 });
    assert.equal(missing.data.error.message, ru.errors.notFound);
    assert.equal(missing.data.error.hint, ru.hints.not_found);
    const invalid = await call("forum_search", {});
    assert.equal(invalid.data.error.message, ru.validation.searchTarget);
    await close();
  });
});
