#!/usr/bin/env node
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ConfigError, loadConfig } from "./config.ts";
import { messages, setLocale } from "./i18n/index.ts";
import { createServer, createServices } from "./server.ts";
import { runSetup } from "./setup/index.ts";
import { createTerminal } from "./setup/terminal.ts";
import { VERSION } from "./version.ts";

function systemLocale(): string {
  const { LC_ALL, LC_MESSAGES, LANG } = process.env;
  return LC_ALL ?? LC_MESSAGES ?? LANG ?? Intl.DateTimeFormat().resolvedOptions().locale;
}

async function serve(): Promise<void> {
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

async function setup(args: string[], language: string): Promise<number> {
  const { values } = parseArgs({
    args,
    options: {
      yes: { type: "boolean", default: false },
      client: { type: "string", multiple: true, default: [] },
    },
  });
  return runSetup(
    { yes: values.yes, clients: values.client },
    {
      environment: { platform: process.platform, home: homedir(), env: process.env },
      terminal: createTerminal(),
      scriptPath: fileURLToPath(import.meta.url),
      nodePath: process.execPath,
      language,
    },
  );
}

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  const locale = process.env.LOLZTEAM_LOCALE?.trim();
  const language = setLocale(command === undefined ? locale : (locale ?? systemLocale()));

  if (command === undefined) return serve();
  if (command === "setup") {
    try {
      process.exitCode = await setup(args, language);
    } catch (error) {
      if (!(error instanceof TypeError && "code" in error)) throw error;
      process.stderr.write(`${messages.cli.badOptions}\n\n${messages.cli.help}\n`);
      process.exitCode = 2;
    }
    return;
  }
  if (command === "--version" || command === "-v") {
    process.stdout.write(`${VERSION}\n`);
    return;
  }
  if (command === "--help" || command === "-h" || command === "help") {
    process.stdout.write(`${messages.cli.help}\n`);
    return;
  }
  process.stderr.write(`${messages.cli.unknownCommand(command)}\n\n${messages.cli.help}\n`);
  process.exitCode = 2;
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
