import { messages } from "../i18n/index.ts";
import { isRecord, type JsonRecord } from "./json.ts";
import { cleanText, compact, excerpt, isoDate } from "./text.ts";

const SENSITIVE_KEY =
  /pass(word)?|login|mafile|secret|token|cookie|imap|guard|recovery|phone|temp_?email|email_?code|^tel$|note|external_?auth/i;
const PRIVATE_KEY =
  /^(user_email|email|balance|hold|convertedBalance|convertedHold|dob|birthday|telegram_id|user_external_authentications)$/i;
const NOISE_KEY =
  /^can[A-Z_]|^can$|html|permissions|ignored|bumpSettings|copyFormatData|imagePreviewLinks|system_info|^show[A-Z]|visitor|uniqueKey|buyer|^img$|image|avatar|icon|^url$|cart|is_fave|isBirthday|customFields|unfurl/i;
const DATE_KEY = /(date|activity|_at|until|seen|expires|created|launched)$/i;

export interface SanitizeLimits {
  maxDepth: number;
  maxEntries: number;
  maxString: number;
  dropKeys?: RegExp;
}

function isHidden(key: string, value: unknown, limits: SanitizeLimits): boolean {
  if (NOISE_KEY.test(key) || PRIVATE_KEY.test(key) || limits.dropKeys?.test(key)) return true;
  return SENSITIVE_KEY.test(key) && typeof value !== "number" && typeof value !== "boolean";
}

export function sanitize(value: unknown, limits: SanitizeLimits, depth = 0, key = ""): unknown {
  if (typeof value === "number" && DATE_KEY.test(key) && value > 1e9 && value < 1e11) {
    return isoDate(value);
  }
  if (typeof value === "string") return excerpt(cleanText(value), limits.maxString);
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (depth > limits.maxDepth) return undefined;
  if (Array.isArray(value)) {
    const list = value
      .slice(0, limits.maxEntries)
      .map((item) => sanitize(item, limits, depth + 1))
      .filter((item) => item !== undefined);
    if (value.length > limits.maxEntries) {
      list.push(messages.output.omittedItems(value.length - limits.maxEntries));
    }
    return list.length > 0 ? list : undefined;
  }
  if (!isRecord(value)) return undefined;
  const entries = Object.entries(value).filter(([name, item]) => !isHidden(name, item, limits));
  const limit = depth === 0 ? entries.length : limits.maxEntries;
  const result: JsonRecord = {};
  for (const [name, item] of entries.slice(0, limit)) {
    const clean = sanitize(item, limits, depth + 1, name);
    if (clean !== undefined) result[name] = clean;
  }
  if (entries.length > limit) result._omitted_fields = entries.length - limit;
  return Object.keys(result).length > 0 ? compact(result) : undefined;
}
