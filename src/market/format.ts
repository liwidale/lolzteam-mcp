import { asRecord, bool, isRecord, num, records, str, type JsonRecord } from "../util/json.ts";
import { cleanText, compact, excerpt, isoDate, stripMarkup } from "../util/text.ts";

export const MARKET_WEB_URL = "https://lzt.market";

const SENSITIVE_KEY =
  /pass(word)?|login|mafile|secret|token|cookie|imap|guard|recovery|phone|temp_?email|email_?code|^tel$|note/i;
const NOISE_KEY =
  /^can[A-Z_]|^can$|html|permissions|ignored|bumpSettings|copyFormatData|imagePreviewLinks|system_info|^show[A-Z]|visitor|uniqueKey|buyer|^description/i;
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
  "published_date",
  "update_stat_date",
  "refreshed_date",
  "view_count",
  "guarantee",
  "extended_guarantee",
  "nsb",
  "allow_ask_discount",
  "seller",
  "tags",
  "category",
  "itemOriginPhrase",
]);

function details(value: unknown, depth: number): unknown {
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
    ([key]) => !SENSITIVE_KEY.test(key) && !NOISE_KEY.test(key),
  );
  const result: JsonRecord = {};
  for (const [key, item] of entries.slice(0, MAX_ENTRIES)) {
    const clean = details(item, depth + 1);
    if (clean !== undefined) result[key] = clean;
  }
  if (entries.length > MAX_ENTRIES) result._omitted_fields = entries.length - MAX_ENTRIES;
  return Object.keys(result).length > 0 ? compact(result) : undefined;
}

export function itemUrl(itemId: number | undefined): string | undefined {
  return itemId === undefined ? undefined : `${MARKET_WEB_URL}/${itemId}/`;
}

function formatSeller(raw: unknown) {
  const seller = asRecord(raw);
  return compact({
    user_id: num(seller, "user_id"),
    username: cleanText(seller.username),
    sold_items: num(seller, "sold_items_count"),
    active_items: num(seller, "active_items_count"),
    restore_percent: num(seller, "restore_percents"),
    is_banned: bool(seller, "is_banned") === true ? true : undefined,
  });
}

function tagTitles(raw: unknown): string[] {
  return records(raw)
    .map((tag) => cleanText(tag.title))
    .filter((title): title is string => title !== undefined);
}

export function formatItemSummary(raw: unknown, descriptionLength: number) {
  const item = asRecord(raw);
  const itemId = num(item, "item_id");
  const guarantee = item.guarantee;
  return compact({
    item_id: itemId,
    title: cleanText(item.title),
    title_en:
      cleanText(item.title_en) === cleanText(item.title) ? undefined : cleanText(item.title_en),
    category_id: num(item, "category_id"),
    price: num(item, "price"),
    currency: str(item, "price_currency"),
    price_rub: num(item, "rub_price"),
    state: str(item, "item_state"),
    origin: cleanText(item.itemOriginPhrase) ?? str(item, "item_origin"),
    published_at: isoDate(item.published_date),
    updated_at: isoDate(item.update_stat_date),
    views: num(item, "view_count"),
    has_guarantee: typeof guarantee === "boolean" ? guarantee : undefined,
    extended_guarantee: num(item, "extended_guarantee") === 1 ? true : undefined,
    not_sold_before: num(item, "nsb") === 1 ? true : undefined,
    allows_discount_requests: num(item, "allow_ask_discount") === 1 ? true : undefined,
    tags: tagTitles(item.tags),
    seller: formatSeller(item.seller),
    url: itemUrl(itemId),
    description: excerpt(
      cleanText(item.descriptionPlain) ?? stripMarkup(item.description),
      descriptionLength,
    ),
  });
}

export function formatItemDetail(raw: unknown, descriptionLength: number) {
  const item = asRecord(raw);
  const category = asRecord(item.category);
  const guarantee = asRecord(item.guarantee);
  const rest = Object.fromEntries(Object.entries(item).filter(([key]) => !SUMMARY_KEYS.has(key)));
  return compact({
    ...formatItemSummary(item, descriptionLength),
    category: compact({
      category_id: num(category, "category_id"),
      name: str(category, "category_name"),
      title: cleanText(category.category_title),
    }),
    guarantee: compact({
      duration: cleanText(guarantee.durationPhrase),
      active: guarantee.active,
      cancelled: guarantee.cancelled,
      ends_at: isoDate(guarantee.endDate),
    }),
    attributes: details(rest, 0),
  });
}

export function formatFeedback(raw: unknown, textLength: number) {
  const feedback = asRecord(raw);
  const automatic = bool(feedback, "is_automatic") === true;
  return compact({
    feedback_id: num(feedback, "feedback_id"),
    date: isoDate(feedback.feedback_date),
    author: compact({
      user_id: num(feedback, "from_user_id"),
      username: cleanText(asRecord(feedback.from_user).username),
    }),
    item_id: num(feedback, "item_id"),
    category_id: num(feedback, "category_id"),
    is_positive: bool(feedback, "is_positive"),
    is_automatic: automatic ? true : undefined,
    purchases_from_seller: num(feedback, "buy_count"),
    comments: num(feedback, "comment_count"),
    text: automatic
      ? undefined
      : excerpt(stripMarkup(feedback.message_html) ?? stripMarkup(feedback.message), textLength),
  });
}
