import { invalidInput } from "../errors.ts";
import type { Query } from "../http/query.ts";
import { marketCatalog } from "../endpoints/market.generated.ts";
import { buildRequest, findParam, type ParamValue } from "../endpoints/request.ts";
import type { Endpoint } from "../endpoints/types.ts";

export type FilterValue = ParamValue;

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

const REFERENCE_OPERATIONS = new Set(["Category.List", "Category.Params", "Category.Games"]);

const CATEGORIES: Readonly<Record<string, Endpoint>> = Object.fromEntries(
  Object.entries(marketCatalog.endpoints)
    .filter(
      ([id, endpoint]) =>
        id.startsWith("Category.") &&
        !REFERENCE_OPERATIONS.has(id) &&
        endpoint.method === "GET" &&
        !endpoint.path.includes("{"),
    )
    .map(([, endpoint]) => [endpoint.path === "/" ? "all" : endpoint.path.slice(1), endpoint]),
);

export const CATEGORY_NAMES = Object.keys(CATEGORIES) as [string, ...string[]];

export function getCategory(name: string): Endpoint {
  const category = CATEGORIES[name];
  if (!category) throw invalidInput(`Unknown Market category "${name}".`);
  return category;
}

export function filterValues(category: string, name: string): string[] {
  return (findParam(getCategory(category), name)?.values ?? []).map(String);
}

export function describeFilters(category: string) {
  return getCategory(category)
    .params.filter((param) => !(param.name in RESERVED_FILTERS))
    .map((param) => ({
      name: param.name,
      type: param.type === "array" ? `array of ${param.items ?? "string"}` : param.type,
      values: param.values,
      value_count: param.valueCount,
      description: param.description || undefined,
    }));
}

export function buildFilterQuery(
  categoryName: string,
  filters: Record<string, FilterValue>,
): Query {
  const category = getCategory(categoryName);
  for (const key of Object.keys(filters)) {
    const typed = RESERVED_FILTERS[findParam(category, key)?.name ?? key];
    if (typed !== undefined) {
      throw invalidInput(`Use the ${typed} parameter instead of the "${key}" filter.`);
    }
  }
  return buildRequest(
    category,
    filters,
    `It is not a filter of category "${categoryName}". Call market_get_category_filters to see the supported filters.`,
  ).query;
}
