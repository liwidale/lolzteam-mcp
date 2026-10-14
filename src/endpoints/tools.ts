import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { ApiClient } from "../http/client.ts";
import { messages } from "../i18n/index.ts";
import { registerTool } from "../tool.ts";
import { sanitize, type SanitizeLimits } from "../util/sanitize.ts";
import { compact } from "../util/text.ts";
import { buildRequest, CATALOGS, findEndpoint, type Service } from "./request.ts";
import type { Endpoint } from "./types.ts";

const SERVICES = ["forum", "market"] as const;
const MARKET_SEARCH = /^Category\.(?!List$|Params$|Games$)|^Managing\.Get$/;
const RESULT_LIMITS: SanitizeLimits = { maxDepth: 6, maxEntries: 100, maxString: 2_000 };

const paramValue = z.union([
  z.string().max(500),
  z.number(),
  z.boolean(),
  z.array(z.union([z.string().max(200), z.number()])).max(250),
  z.record(z.string(), z.union([z.string().max(200), z.number()])),
]);

const service = z.enum(SERVICES);
const operation = z.string().trim().min(1).max(100);

export function bucketFor(target: Service, id: string, endpoint: Endpoint): string {
  if (endpoint.method !== "GET") return "post";
  return target === "market" && MARKET_SEARCH.test(id) ? "search" : "get";
}

function matches(id: string, endpoint: Endpoint, query: string): boolean {
  const haystack = [id, endpoint.path, endpoint.summary, endpoint.description ?? ""]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

export function registerEndpointTools(
  server: McpServer,
  clients: Readonly<Record<Service, ApiClient>>,
): void {
  registerTool(server, {
    name: "api_list_endpoints",
    inputSchema: {
      service: service.optional(),
      query: z.string().trim().min(1).max(100).optional(),
    },
    handler: (args) => {
      const targets = args.service ? [args.service] : SERVICES;
      const result = Object.fromEntries(
        targets.map((target) => {
          const catalog = CATALOGS[target];
          const endpoints = Object.entries(catalog.endpoints)
            .filter(
              ([id, endpoint]) => args.query === undefined || matches(id, endpoint, args.query),
            )
            .map(([id, endpoint]) => ({
              operation: id,
              endpoint: `${endpoint.method} ${endpoint.path}`,
              summary: endpoint.summary,
            }));
          return [target, { spec_version: catalog.version, endpoints }];
        }),
      );
      return Promise.resolve(result);
    },
  });

  registerTool(server, {
    name: "api_describe_endpoint",
    inputSchema: { service, operation },
    handler: (args) => {
      const [id, endpoint] = findEndpoint(args.service, args.operation);
      return Promise.resolve(
        compact({
          service: args.service,
          operation: id,
          endpoint: `${endpoint.method} ${endpoint.path}`,
          summary: endpoint.summary,
          description: endpoint.description,
          scopes: endpoint.scopes,
          params: endpoint.params.map((param) =>
            compact({
              name: param.name,
              in: param.in,
              type:
                param.type === "array" || param.type === "object"
                  ? `${param.type} of ${param.items ?? "string"}`
                  : param.type,
              required: param.required,
              values: param.values,
              value_count: param.valueCount,
              description: param.description,
            }),
          ),
        }),
      );
    },
  });

  registerTool(server, {
    name: "api_call_endpoint",
    inputSchema: {
      service,
      operation,
      params: z.record(z.string().min(1).max(100), paramValue).default({}),
      max_chars: z.number().int().min(1_000).max(100_000).default(30_000),
    },
    handler: async (args, { signal }) => {
      const [id, endpoint] = findEndpoint(args.service, args.operation);
      const request = buildRequest(endpoint, args.params);
      const response = await clients[args.service].request({
        method: endpoint.method,
        path: request.path,
        query: request.query,
        body: request.body,
        bucket: bucketFor(args.service, id, endpoint),
        signal,
      });
      const result = sanitize(response, RESULT_LIMITS) ?? {};
      const text = JSON.stringify(result);
      const header = { operation: id, endpoint: `${endpoint.method} ${request.path}` };
      if (text.length <= args.max_chars) return { ...header, result };
      return {
        ...header,
        result_too_large: true,
        size: text.length,
        hint: messages.output.tooLargeHint,
        preview: text.slice(0, args.max_chars),
      };
    },
  });
}
