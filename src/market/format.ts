import { asRecord, bool, isRecord, num, records, str, type JsonRecord } from "../util/json.ts";
import { cleanText, compact, excerpt, isoDate, stripMarkup } from "../util/text.ts";

export const MARKET_WEB_URL = "https://lzt.market";

const SENSITIVE_KEY =
  /pass(word)?|login|mafile|secret|token|cookie|imap|guard|recovery|phone|temp_?email|email_?code|^tel$|note|external_?auth/i;
const NOISE_KEY =
  /^can[A-Z_]|^can$|html|permissions|ignored|bumpSettings|copyFormatData|imagePreviewLinks|system_info|^show[A-Z]|visitor|uniqueKey|buyer|^description|^img$|image|avatar|icon|^url$|cart|is_fave|isBirthday|customFields|unfurl/i;
const DATE_KEY = /(date|activity|_at|until|seen|expires|created|launched)$/i;
const MAX_DEPTH = 3;
const MAX_ENTRIES = 40;
const MAX_STRING = 500;

const SUMMARY_KEYS = new Set([
  "item_id",
  "title",
  "title_en",
  "category_id",
  "price",
  "price_currency",
  "rub_price",
  "item_state",
  "item_origin",
  "resale_item_origin",
  "published_date",
  "update_stat_date",
  "refreshed_date",
  "view_count",
  "guarantee",
  "guarantee_duration",
  "extended_guarantee",
  "nsb",
  "allow_ask_discount",
  "seller",
  "tags",
  "category",
  "itemOriginPhrase",
  "feedback_data",
]);

function isSecret(key: string, value: unknown): boolean {
  return SENSITIVE_KEY.test(key) && typeof value !== "number" && typeof value !== "boolean";
}

function details(value: unknown, depth: number, key = ""): unknown {
  if (typeof value === "number" && DATE_KEY.test(key) && value > 1e9 && value < 1e11) {
    return isoDate(value);
  }
  if (typeof value === "string") return excerpt(cleanText(value), MAX_STRING);
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (depth > MAX_DEPTH) return undefined;
  if (Array.isArray(value)) {
    const list = value
      .slice(0, MAX_ENTRIES)
      .map((item) => details(item, depth + 1))
      .filter((item) => item !== undefined);
    if (value.length > MAX_ENTRIES) list.push(`[${value.length - MAX_ENTRIES} more items omitted]`);
    return list.length > 0 ? list : undefined;
  }
  if (!isRecord(value)) return undefined;
  const entries = Object.entries(value).filter(
    ([name, item]) => !isSecret(name, item) && !NOISE_KEY.test(name),
  );
  const limit = depth === 0 ? entries.length : MAX_ENTRIES;
  const result: JsonRecord = {};
  for (const [name, item] of entries.slice(0, limit)) {
    const clean = details(item, depth + 1, name);
    if (clean !== undefined) result[name] = clean;
  }
  if (entries.length > limit) result._omitted_fields = entries.length - limit;
  return Object.keys(result).length > 0 ? compact(result) : undefined;
}

function attributes(item: JsonRecord, skipEmpty: boolean): unknown {
  const rest = Object.entries(item).filter(([key, value]) => {
    if (SUMMARY_KEYS.has(key)) return false;
    return !skipEmpty || !(value === 0 || value === "" || value === false || value === null);
  });
  return details(Object.fromEntries(rest), 0);
}

function sellerFeedback(raw: unknown) {
  let data: unknown = raw;
  if (typeof raw === "string") {
    try {
      data = JSON.parse(raw);
    } catch {
      return undefined;
    }
  }
  let positive = 0;
  let negative = 0;
  for (const entry of records(data)) {
    positive += num(entry, "positive") ?? 0;
    negative += num(entry, "negative") ?? 0;
  }
  return positive + negative > 0 ? { positive, negative } : undefined;
}

export function itemUrl(itemId: number | undefined): string | undefined {
  return itemId === undefined ? undefined : `${MARKET_WEB_URL}/${itemId}/`;
}

export function webUrl(path: string | undefined): string | undefined {
  if (path === undefined) return undefined;
  return path.startsWith("/") ? `${MARKET_WEB_URL}${path}` : path;
}

function formatSeller(raw: unknown, feedback: unknown) {
  const seller = asRecord(raw);
  return compact({
    user_id: num(seller, "user_id"),
    username: cleanText(seller.username),
    sold_items: num(seller, "sold_items_count"),
    active_items: num(seller, "active_items_count"),
    restore_percent: num(seller, "restore_percents"),
    feedback: sellerFeedback(feedback),
    is_banned: bool(seller, "is_banned") === true ? true : undefined,
  });
}

function tagTitles(raw: unknown): string[] {
  return records(raw)
    .map((tag) => cleanText(tag.title))
    .filter((title): title is string => title !== undefined);
}

function guaranteeHours(item: JsonRecord): number | undefined {
  const seconds = num(item, "guarantee_duration") ?? num(asRecord(item.guarantee), "duration");
  return seconds !== undefined && seconds > 0 ? Math.round(seconds / 3600) : undefined;
}

export interface ItemFormat {
  descriptionLength: number;
  attributes: "none" | "non_empty" | "all";
}

export function formatItem(raw: unknown, format: ItemFormat) {
  const item = asRecord(raw);
  const itemId = num(item, "item_id");
  const title = cleanText(item.title);
  const titleEn = cleanText(item.title_en);
  return compact({
    item_id: itemId,
    title,
    title_en: titleEn === title ? undefined : titleEn,
    category_id: num(item, "category_id"),
    price: num(item, "price"),
    currency: str(item, "price_currency"),
    price_rub: num(item, "rub_price"),
    state: str(item, "item_state"),
    origin: str(item, "item_origin"),
    resale_origin: str(item, "resale_item_origin"),
    published_at: isoDate(item.published_date),
    updated_at: isoDate(item.update_stat_date),
    views: num(item, "view_count"),
    guarantee_hours: guaranteeHours(item),
    extended_guarantee: num(item, "extended_guarantee") === 1 ? true : undefined,
    not_sold_before: num(item, "nsb") === 1 ? true : undefined,
    allows_discount_requests: num(item, "allow_ask_discount") === 1 ? true : undefined,
    tags: tagTitles(item.tags),
    seller: formatSeller(item.seller, item.feedback_data),
    url: itemUrl(itemId),
    description:
      format.descriptionLength > 0
        ? excerpt(
            cleanText(item.descriptionPlain) ?? stripMarkup(item.description),
            format.descriptionLength,
          )
        : undefined,
    attributes:
      format.attributes === "none"
        ? undefined
        : attributes(item, format.attributes === "non_empty"),
  });
}

export function formatFeedback(raw: unknown, textLength: number) {
  const feedback = asRecord(raw);
  const item = asRecord(feedback.item);
  const automatic = bool(feedback, "is_automatic") === true;
  return compact({
    feedback_id: num(feedback, "feedback_id"),
    date: isoDate(feedback.feedback_date),
    author: compact({
      user_id: num(feedback, "from_user_id"),
      username: cleanText(asRecord(feedback.from_user).username),
    }),
    item: compact({
      item_id: num(feedback, "item_id") ?? num(item, "item_id"),
      title: cleanText(item.title),
      price: num(item, "price"),
      url: str(item, "url"),
    }),
    category_id: num(feedback, "category_id"),
    is_positive: bool(feedback, "is_positive"),
    is_automatic: automatic ? true : undefined,
    purchases_from_seller: num(feedback, "buy_count"),
    comments: num(feedback, "comment_count"),
    url: str(asRecord(feedback.links), "permalink"),
    text: automatic
      ? undefined
      : excerpt(stripMarkup(feedback.message_html) ?? stripMarkup(feedback.message), textLength),
  });
}
