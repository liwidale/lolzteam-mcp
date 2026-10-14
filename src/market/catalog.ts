import { invalidInput } from "../errors.ts";
import type { Query, QueryScalar, QueryValue } from "../http/query.ts";
import { marketCatalog } from "./catalog.generated.ts";

export interface MarketFilter {
  name: string;
  type: string;
  items?: string;
  values?: (string | number)[];
  valueCount?: number;
  description: string;
}

export interface MarketCategory {
  path: string;
  title: string;
  filters: MarketFilter[];
}

export type MarketCatalog = Record<string, MarketCategory>;

export type FilterValue =
  string | number | boolean | (string | number)[] | Record<string, string | number>;

export const RESERVED_FILTERS: Readonly<Record<string, string>> = {
  after: "cursor",
  title: "title",
  pmin: "min_price",
  pmax: "max_price",
  currency: "currency",
  order_by: "order_by",
  "origin[]": "origin",
  "not_origin[]": "exclude_origin",
  user_id: "seller_id",
  nsb: "not_sold_before",
};

export const CATEGORY_NAMES = Object.keys(marketCatalog) as [string, ...string[]];

export function getCategory(name: string): MarketCategory {
  const category = marketCatalog[name];
  if (!category) throw invalidInput(`Unknown Market category "${name}".`);
  return category;
}

export function filterValues(category: string, name: string): string[] {
  const filter = getCategory(category).filters.find((item) => item.name === name);
  return (filter?.values ?? []).map(String);
}

export function describeFilters(category: string) {
  return getCategory(category)
    .filters.filter((filter) => !(filter.name in RESERVED_FILTERS))
    .map((filter) => ({
      name: filter.name,
      type: filter.type === "array" ? `array of ${filter.items ?? "string"}` : filter.type,
      values: filter.values,
      value_count: filter.valueCount,
      description: filter.description || undefined,
    }));
}

function findFilter(category: MarketCategory, key: string): MarketFilter | undefined {
  return (
    category.filters.find((filter) => filter.name === key) ??
    category.filters.find((filter) => filter.name === `${key}[]`)
  );
}

function checkScalar(filter: MarketFilter, kind: string | undefined, value: unknown): QueryScalar {
  const label = `Filter "${filter.name}"`;
  if (kind === "boolean") {
    if (typeof value !== "boolean") throw invalidInput(`${label} expects true or false.`);
    return value;
  }
  if (kind === "integer" || kind === "number") {
    const numeric = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
    if (typeof numeric !== "number" || !Number.isFinite(numeric)) {
      throw invalidInput(`${label} expects a number.`);
    }
    if (kind === "integer" && !Number.isInteger(numeric)) {
      throw invalidInput(`${label} expects a whole number.`);
    }
    if (filter.values && !filter.values.map(Number).includes(numeric)) {
      throw invalidInput(`${label} must be one of: ${filter.values.join(", ")}.`);
    }
    return numeric;
  }
  if (typeof value !== "string" && typeof value !== "number") {
    throw invalidInput(`${label} expects text.`);
  }
  const text = String(value);
  if (text.length > 200) throw invalidInput(`${label} is too long.`);
  if (filter.values && !filter.values.map(String).includes(text)) {
    throw invalidInput(`${label} must be one of: ${filter.values.join(", ")}.`);
  }
  return text;
}

function toQueryValue(filter: MarketFilter, value: FilterValue): QueryValue {
  if (filter.type === "array") {
    const list = Array.isArray(value) ? value : [value];
    if (list.length === 0 || list.length > 50) {
      throw invalidInput(`Filter "${filter.name}" expects between 1 and 50 values.`);
    }
    return list.map((item) => checkScalar(filter, filter.items, item));
  }
  if (filter.type === "object") {
    if (typeof value !== "object" || Array.isArray(value)) {
      throw invalidInput(`Filter "${filter.name}" expects an object such as {"730": 100}.`);
    }
    const entries = Object.entries(value);
    if (entries.length === 0 || entries.length > 50) {
      throw invalidInput(`Filter "${filter.name}" expects between 1 and 50 keys.`);
    }
    return Object.fromEntries(
      entries.map(([key, item]) => {
        if (!/^[\w .:-]{1,100}$/.test(key)) {
          throw invalidInput(`Filter "${filter.name}" has an invalid key "${key}".`);
        }
        return [key, checkScalar(filter, filter.items, item)];
      }),
    );
  }
  if (Array.isArray(value) || typeof value === "object") {
    throw invalidInput(`Filter "${filter.name}" expects a single value.`);
  }
  return checkScalar(filter, filter.type, value);
}

export function buildFilterQuery(
  categoryName: string,
  filters: Record<string, FilterValue>,
): Query {
  const category = getCategory(categoryName);
  const query: Record<string, QueryValue> = {};
  for (const [key, value] of Object.entries(filters)) {
    const filter = findFilter(category, key);
    if (!filter) {
      throw invalidInput(
        `Unknown filter "${key}" for category "${categoryName}". Call market_get_category_filters to see the supported filters.`,
      );
    }
    const typed = RESERVED_FILTERS[filter.name];
    if (typed !== undefined) {
      throw invalidInput(`Use the ${typed} parameter instead of the "${filter.name}" filter.`);
    }
    query[filter.name] = toQueryValue(filter, value);
  }
  return query;
}
