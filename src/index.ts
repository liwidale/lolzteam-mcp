#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ConfigError, loadConfig } from "./config.ts";
import { createServer, createServices } from "./server.ts";

async function main(): Promise<void> {
  const config = loadConfig();
  const services = createServices(config);
  const server = createServer(services);

  const missing = [
    services.forum.configured ? undefined : "Forum",
    services.market.configured ? undefined : "Market",
  ].filter((name) => name !== undefined);
  if (missing.length > 0) {
    process.stderr.write(
      `lolzteam-mcp: no API token for ${missing.join(" and ")}. Those tools will return not_configured until LOLZTEAM_TOKEN is set.\n`,
    );
  }

  const shutdown = () => {
    void server.close().finally(() => process.exit(0));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  await server.connect(new StdioServerTransport());
}

main().catch((error: unknown) => {
  const message =
    error instanceof ConfigError
      ? `Configuration error: ${error.message}`
      : `Failed to start: ${error instanceof Error ? error.message : String(error)}`;
  process.stderr.write(`lolzteam-mcp: ${message}\n`);
  process.exit(1);
});
