#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ConfigError, loadConfig } from "./config.ts";
import { messages, setLocale } from "./i18n/index.ts";
import { createServer, createServices } from "./server.ts";
import { VERSION } from "./version.ts";

async function main(): Promise<void> {
  setLocale(process.env.LOLZTEAM_LOCALE?.trim());
  const config = loadConfig();
  const services = createServices(config);
  const server = createServer(services);

  const missing = [
    services.forum.configured ? undefined : "Forum",
    services.market.configured ? undefined : "Market",
  ].filter((name) => name !== undefined);
  if (missing.length > 0) {
    process.stderr.write(`${messages.startup.missingToken(missing.join(messages.startup.and))}\n`);
  }

  const shutdown = () => {
    void server.close().finally(() => process.exit(0));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  await server.connect(new StdioServerTransport());
  process.stderr.write(`${messages.startup.running(VERSION)}\n`);
}

main().catch((error: unknown) => {
  const reason = error instanceof Error ? error.message : String(error);
  const message =
    error instanceof ConfigError
      ? messages.startup.configError(reason)
      : messages.startup.failed(reason);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
