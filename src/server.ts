import { McpServer } from "./mcp/server.ts";
import type { Config } from "./config.ts";
import { registerEndpointTools } from "./endpoints/tools.ts";
import { registerForumTools, FORUM_RATE_LIMITS } from "./forum/tools.ts";
import { ApiClient } from "./http/client.ts";
import { messages } from "./i18n/index.ts";
import { registerMarketTools, MARKET_RATE_LIMITS } from "./market/tools.ts";
import { VERSION } from "./version.ts";

export interface Services {
  forum: ApiClient;
  market: ApiClient;
}

export function createServices(config: Config, fetchImpl?: typeof fetch): Services {
  const shared = {
    locale: config.locale,
    timeoutMs: config.timeoutMs,
    maxRetries: config.maxRetries,
    maxRateLimitWaitMs: config.maxRateLimitWaitMs,
    fetch: fetchImpl,
  };
  return {
    forum: new ApiClient({
      ...shared,
      service: "Forum",
      baseUrl: config.forum.baseUrl,
      token: config.forum.token,
      tokenVariable: "LOLZTEAM_FORUM_TOKEN",
      buckets: FORUM_RATE_LIMITS,
    }),
    market: new ApiClient({
      ...shared,
      service: "Market",
      baseUrl: config.market.baseUrl,
      token: config.market.token,
      tokenVariable: "LOLZTEAM_MARKET_TOKEN",
      buckets: MARKET_RATE_LIMITS,
    }),
  };
}

export function createServer(services: Services): McpServer {
  const server = new McpServer(
    { name: "lolzteam-mcp", title: "LOLZTEAM", version: VERSION },
    messages.server.instructions,
  );
  registerForumTools(server, services.forum);
  registerMarketTools(server, services.market);
  registerEndpointTools(server, services);
  return server;
}
