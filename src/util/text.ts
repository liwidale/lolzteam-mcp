import { messages } from "../i18n/index.ts";
import { isRecord } from "./json.ts";

const INVISIBLE_RANGES: readonly (readonly [number, number])[] = [
  [0x00, 0x08],
  [0x0b, 0x0c],
  [0x0e, 0x1f],
  [0x7f, 0x9f],
  [0x200b, 0x200f],
  [0x202a, 0x202e],
  [0x2060, 0x2069],
  [0xfeff, 0xfeff],
];

function isVisible(character: string): boolean {
  const code = character.codePointAt(0) ?? 0;
  return !INVISIBLE_RANGES.some(([from, to]) => code >= from && code <= to);
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, body: string) => {
    if (body.startsWith("#")) {
      const code =
        body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : Number(body.slice(1));
      return Number.isInteger(code) && code > 0 && code <= 0x10ffff
        ? String.fromCodePoint(code)
        : entity;
    }
    return ENTITIES[body.toLowerCase()] ?? entity;
  });
}

export function cleanText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = Array.from(value.replace(/\r\n?/g, "\n"))
    .filter(isVisible)
    .join("")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text === "" ? undefined : text;
}

export function stripMarkup(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|blockquote|h\d)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\[\/?[a-z*][a-z0-9*]*(=[^\]]*)?\]/gi, "");
  return cleanText(decodeEntities(text));
}

export function excerpt(text: string | undefined, maxLength: number): string | undefined {
  if (text === undefined || text.length <= maxLength) return text;
  const rest = text.length - maxLength;
  return `${text.slice(0, maxLength).trimEnd()} ${messages.output.truncated(rest)}`;
}

export function isoDate(value: unknown): string | undefined {
  const seconds = typeof value === "string" ? Number(value) : value;
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds <= 0) return undefined;
  return new Date(seconds * 1000).toISOString();
}

export function textList(value: unknown): string[] {
  const list = Array.isArray(value) ? value : isRecord(value) ? Object.values(value) : [];
  return list.map(cleanText).filter((item): item is string => item !== undefined);
}

function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null || value === "") return true;
  if (Array.isArray(value)) return value.length === 0;
  return isRecord(value) && Object.keys(value).length === 0;
}

export function compact<T extends Record<string, unknown>>(
  value: T,
  keep: readonly (keyof T)[] = [],
): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([key, item]) => keep.includes(key) || !isEmpty(item)),
  ) as Partial<T>;
}
