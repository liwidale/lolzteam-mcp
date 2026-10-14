import { asRecord, bool, num, records, str, type JsonRecord } from "../util/json.ts";
import { sanitize, type SanitizeLimits } from "../util/sanitize.ts";
import { cleanText, compact, excerpt, isoDate, stripMarkup } from "../util/text.ts";

export const MARKET_WEB_URL = "https://lzt.market";

const ATTRIBUTE_LIMITS: SanitizeLimits = {
  maxDepth: 3,
  maxEntries: 40,
  maxString: 500,
  dropKeys: /^description/i,
};

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

function attributes(item: JsonRecord, skipEmpty: boolean): unknown {
  const rest = Object.entries(item).filter(([key, value]) => {
    if (SUMMARY_KEYS.has(key)) return false;
    return !skipEmpty || !(value === 0 || value === "" || value === false || value === null);
  });
  return sanitize(Object.fromEntries(rest), ATTRIBUTE_LIMITS);
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
