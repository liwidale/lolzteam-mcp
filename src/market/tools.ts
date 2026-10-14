import type { McpServer } from "../mcp/server.ts";
import { s } from "../schema.ts";
import type { ApiClient } from "../http/client.ts";
import { registerTool } from "../tool.ts";
import { asRecord, bool, num, records, str } from "../util/json.ts";
import { cleanText, compact, excerpt, isoDate, stripMarkup } from "../util/text.ts";
import {
  buildFilterQuery,
  CATEGORY_NAMES,
  describeFilters,
  filterValues,
  getCategory,
  RESERVED_FILTERS,
} from "./catalog.ts";
import { formatFeedback, formatItem, itemUrl, webUrl } from "./format.ts";

export const MARKET_RATE_LIMITS = {
  search: { limit: 120, windowMs: 60_000 },
  get: { limit: 300, windowMs: 60_000 },
  post: { limit: 30, windowMs: 60_000 },
};

function enumOf(category: string, filter: string) {
  const values = filterValues(category, filter);
  if (values.length === 0) throw new Error(`The Market catalog has no values for ${filter}.`);
  return s.enum(values as [string, ...string[]]);
}

const GAME_CATEGORIES = CATEGORY_NAMES.filter((name) => name !== "all") as [string, ...string[]];
const STEAM_INVENTORY_APPS = [730, 578080, 753, 570, 440, 252490, 304930, 232090, 322330] as const;

const filterValue = s.union([
  s.string().max(200),
  s.number(),
  s.boolean(),
  s.array(s.union([s.string().max(200), s.number()])).max(50),
  s.record(s.string(), s.union([s.string().max(200), s.number()])),
]);

export function registerMarketTools(server: McpServer, market: ApiClient): void {
  registerTool(server, {
    name: "market_search",
    inputSchema: {
      category: s.enum(CATEGORY_NAMES).default("all"),
      title: s.string().trim().min(1).max(200).optional(),
      min_price: s.number().min(0).optional(),
      max_price: s.number().min(0).optional(),
      currency: enumOf("all", "currency").optional(),
      order_by: enumOf("all", "order_by").optional(),
      origin: s.array(enumOf("all", "origin[]")).min(1).max(10).optional(),
      exclude_origin: s.array(enumOf("all", "not_origin[]")).min(1).max(10).optional(),
      seller_id: s.number().int().positive().optional(),
      not_sold_before: s.boolean().optional(),
      filters: s.record(s.string().min(1).max(100), filterValue).optional(),
      cursor: s.string().trim().min(1).max(500).optional(),
      description_length: s.number().int().min(0).max(2_000).default(200),
      include_attributes: s.boolean().default(false),
    },
    handler: async (args, { signal }) => {
      const category = getCategory(args.category);
      const filters = buildFilterQuery(args.category, args.filters ?? {});
      const response = await market.request({
        path: category.path,
        bucket: "search",
        query: {
          ...filters,
          title: args.title,
          pmin: args.min_price,
          pmax: args.max_price,
          currency: args.currency,
          order_by: args.order_by,
          "origin[]": args.origin,
          "not_origin[]": args.exclude_origin,
          user_id: args.seller_id,
          nsb: args.not_sold_before === true ? true : undefined,
          after: args.cursor,
        },
        signal,
      });
      return compact(
        {
          category: args.category,
          total_items: num(response, "totalItems"),
          page: num(response, "page"),
          per_page: num(response, "perPage"),
          has_next_page: bool(response, "hasNextPage"),
          next_cursor: str(response, "nextCursor"),
          search_url: webUrl(str(response, "searchUrl")),
          items: records(response.items).map((item) =>
            formatItem(item, {
              descriptionLength: args.description_length,
              attributes: args.include_attributes ? "non_empty" : "none",
            }),
          ),
        },
        ["items"],
      );
    },
  });

  registerTool(server, {
    name: "market_get_item",
    inputSchema: {
      item_id: s.number().int().positive(),
      description_length: s.number().int().min(0).max(20_000).default(4_000),
    },
    handler: async (args, { signal }) => {
      const response = await market.request({ path: `/${args.item_id}`, bucket: "search", signal });
      return compact({
        item: formatItem(response.item, {
          descriptionLength: args.description_length,
          attributes: "all",
        }),
        url: str(response, "itemLink") ?? itemUrl(args.item_id),
        favorites: num(response, "faveCount"),
        same_items: num(response, "sameItemsCount"),
        can_buy: bool(response, "canBuyItem"),
        cannot_buy_reason: stripMarkup(response.cannotBuyItemError),
      });
    },
  });

  registerTool(server, {
    name: "market_list_categories",
    inputSchema: {},
    handler: async (_args, { signal }) => {
      const response = await market.request({ path: "/category", bucket: "get", signal });
      return {
        categories: records(response.categories ?? response.category).map((category) =>
          compact({
            category_id: num(category, "category_id"),
            name: str(category, "category_name"),
            title: cleanText(category.category_title),
            description: excerpt(
              stripMarkup(category.category_description_html_en) ??
                stripMarkup(category.category_description),
              300,
            ),
            has_guarantee: num(category, "has_guarantee") === 1 ? true : undefined,
          }),
        ),
        search_categories: CATEGORY_NAMES,
      };
    },
  });

  registerTool(server, {
    name: "market_get_category_filters",
    inputSchema: {
      category: s.enum(CATEGORY_NAMES),
    },
    handler: (args) => {
      const category = getCategory(args.category);
      return Promise.resolve({
        category: args.category,
        title: category.summary,
        typed_parameters: Object.values(RESERVED_FILTERS),
        filters: describeFilters(args.category).map((filter) => compact(filter)),
      });
    },
  });

  registerTool(server, {
    name: "market_list_category_games",
    inputSchema: {
      category: s.enum(GAME_CATEGORIES),
      query: s.string().trim().min(1).max(100).optional(),
      limit: s.number().int().min(1).max(200).default(30),
    },
    handler: async (args, { signal }) => {
      const response = await market.request({
        path: `/${args.category}/games`,
        bucket: "get",
        signal,
      });
      const needle = args.query?.toLowerCase();
      const matches = records(response.games).filter(
        (game) =>
          needle === undefined ||
          ["title", "abbr", "ru", "url"].some((key) =>
            str(game, key)?.toLowerCase().includes(needle),
          ),
      );
      return {
        total: matches.length,
        games: matches.slice(0, args.limit).map((game) =>
          compact({
            id: str(game, "app_id") ?? num(game, "app_id"),
            title: cleanText(game.title),
            abbr: cleanText(game.abbr),
          }),
        ),
      };
    },
  });

  registerTool(server, {
    name: "market_get_seller_feedback",
    inputSchema: {
      seller_id: s.number().int().positive(),
      type: s.enum(["all", "positive", "negative"]).default("all"),
      category_id: s.number().int().positive().optional(),
      exclude_automatic: s.boolean().default(false),
      page: s.number().int().min(1).max(10_000).optional(),
      limit: s.number().int().min(1).max(50).optional(),
      text_length: s.number().int().min(50).max(5_000).default(500),
    },
    handler: async (args, { signal }) => {
      const response = await market.request({
        path: "/feedback",
        bucket: "get",
        query: {
          user_id: args.seller_id,
          type: args.type,
          category_id: args.category_id,
          exclude_automatic: args.exclude_automatic,
          page: args.page,
          limit: args.limit,
        },
        signal,
      });
      const counts = asRecord(response.counts);
      const pagination = asRecord(response.pagination);
      return compact(
        {
          counts: compact({
            total: num(counts, "total"),
            positive: num(counts, "positive"),
            negative: num(counts, "negative"),
            positive_percentage: num(counts, "positive_percentage"),
          }),
          pagination: compact({
            page: num(pagination, "current_page"),
            pages: num(pagination, "last_page"),
            total: num(pagination, "total"),
          }),
          feedback: records(response.feedbacks).map((item) =>
            formatFeedback(item, args.text_length),
          ),
        },
        ["feedback"],
      );
    },
  });

  registerTool(server, {
    name: "market_get_steam_inventory_value",
    inputSchema: {
      item_id: s.number().int().positive(),
      app_id: s.literal(STEAM_INVENTORY_APPS).optional(),
      currency: enumOf("all", "currency").optional(),
    },
    handler: async (args, { signal }) => {
      const response = await market.request({
        path: `/${args.item_id}/inventory-value`,
        bucket: "get",
        query: { app_id: args.app_id, currency: args.currency },
        signal,
      });
      const data = asRecord(response.data);
      const items = records(data.items)
        .map((item) =>
          compact({
            title: cleanText(item.title),
            price: num(item, "price"),
            count: num(item, "count"),
            tradable: bool(item, "tradable"),
            marketable: bool(item, "marketable"),
            type: cleanText(item.type),
          }),
        )
        .sort((a, b) => (b.price ?? 0) * (b.count ?? 1) - (a.price ?? 0) * (a.count ?? 1));
      return compact(
        {
          app_id: num(data, "appId"),
          app_title: cleanText(data.appTitle),
          total_value: num(data, "totalValue"),
          currency: str(data, "currency"),
          item_count: num(data, "itemCount"),
          marketable_item_count: num(data, "marketableItemCount"),
          checked_at: isoDate(data.time),
          top_items: items.slice(0, 15),
        },
        ["top_items"],
      );
    },
  });

  registerTool(server, {
    name: "market_list_currencies",
    inputSchema: {},
    handler: async (_args, { signal }) => {
      const response = await market.request({ path: "/currency", bucket: "get", signal });
      const currencies = Object.entries(asRecord(response.currencyList)).map(([code, raw]) => {
        const currency = asRecord(raw);
        return compact({
          code,
          title: cleanText(currency.title),
          rate: num(currency, "rate"),
          symbol: cleanText(currency.symbol),
        });
      });
      return compact(
        {
          currencies,
          visitor_currency: str(response, "visitorCurrency"),
          updated_at: isoDate(response.lastUpdate),
        },
        ["currencies"],
      );
    },
  });
}
