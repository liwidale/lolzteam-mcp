import { isValidToken, loadConfig } from "../config.ts";
import { LolzteamError } from "../errors.ts";
import { asRecord, str } from "../util/json.ts";
import { messages } from "../i18n/index.ts";
import { createServices } from "../server.ts";
import { VERSION } from "../version.ts";
import {
  detectClients,
  InvalidConfigError,
  knownClients,
  launcherFor,
  SERVER_NAME,
  writeServer,
  type Client,
  type Environment,
  type Launcher,
  type ServerEntry,
} from "./clients.ts";
import { SetupCancelled, type Terminal } from "./terminal.ts";

export interface SetupOptions {
  yes: boolean;
  clients: string[];
}

export interface SetupContext {
  environment: Environment;
  terminal: Terminal;
  scriptPath: string;
  nodePath: string;
  language: string;
  fetch?: typeof fetch;
}

type Check = "ok" | "rejected" | "failed";

function describeFailure(error: unknown): string {
  return error instanceof LolzteamError ? error.message : messages.errors.internal;
}

async function checkToken(token: string, context: SetupContext): Promise<Check> {
  const { terminal, environment } = context;
  const config = loadConfig({
    LOLZTEAM_FORUM_BASE_URL: environment.env.LOLZTEAM_FORUM_BASE_URL,
    LOLZTEAM_MARKET_BASE_URL: environment.env.LOLZTEAM_MARKET_BASE_URL,
    LOLZTEAM_TOKEN: token,
    LOLZTEAM_MAX_RETRIES: "0",
    LOLZTEAM_TIMEOUT_MS: "20000",
  });
  const { forum, market } = createServices(config, context.fetch);
  terminal.write(messages.setup.checking);
  let result: Check = "ok";
  try {
    const response = await forum.request({ path: "/users/me", bucket: "get" });
    terminal.write(messages.setup.forumOk(str(asRecord(response.user), "username") ?? "?"));
  } catch (error) {
    if (error instanceof LolzteamError && error.code === "unauthorized") return "rejected";
    terminal.write(messages.setup.forumFailed(describeFailure(error)));
    result = "failed";
  }
  try {
    await market.request({ path: "/currency", bucket: "get" });
    terminal.write(messages.setup.marketOk);
  } catch (error) {
    terminal.write(messages.setup.marketFailed(describeFailure(error)));
  }
  return result;
}

async function readToken(context: SetupContext): Promise<string | undefined> {
  const { terminal, environment } = context;
  const fromEnv = environment.env.LOLZTEAM_TOKEN?.trim();
  if (fromEnv) {
    terminal.write(messages.setup.tokenFromEnv);
    return fromEnv;
  }
  if (!terminal.interactive) {
    terminal.write(messages.setup.needToken);
    return undefined;
  }
  terminal.write(messages.setup.tokenHelp);
  return terminal.askSecret(messages.setup.tokenPrompt);
}

async function pickClients(options: SetupOptions, context: SetupContext): Promise<Client[]> {
  const { terminal, environment } = context;
  if (options.clients.length > 0) {
    const all = knownClients(environment);
    const unknown = options.clients.filter((id) => !all.some((client) => client.id === id));
    if (unknown.length > 0) {
      terminal.write(
        messages.setup.unknownClients(
          unknown.join(", "),
          all.map((client) => client.id).join(", "),
        ),
      );
      return [];
    }
    return all.filter((client) => options.clients.includes(client.id));
  }
  const detected = await detectClients(environment);
  if (detected.length === 0 || options.yes || !terminal.interactive) return detected;
  terminal.write(messages.setup.detected);
  detected.forEach((client, index) => {
    terminal.write(`  ${index + 1}. ${client.name} (${client.configPath})`);
  });
  const answer = await terminal.ask(messages.setup.choose);
  if (answer === "") return detected;
  const picked = new Set(
    answer
      .split(/[\s,]+/)
      .map(Number)
      .filter((number) => Number.isInteger(number) && number >= 1 && number <= detected.length),
  );
  return detected.filter((_, index) => picked.has(index + 1));
}

function shellQuote(value: string): string {
  return /^[\w./:=@-]+$/.test(value) ? value : `"${value.replace(/"/g, '\\"')}"`;
}

function claudeCodeCommand(launcher: Launcher): string {
  return [
    "claude mcp add --transport stdio --scope user --env LOLZTEAM_TOKEN=<token>",
    SERVER_NAME,
    "--",
    launcher.command,
    ...launcher.args,
  ]
    .map((part, index) => (index < 2 ? part : shellQuote(part)))
    .join(" ");
}

export async function runSetup(options: SetupOptions, context: SetupContext): Promise<number> {
  const { terminal, environment } = context;
  terminal.write(messages.setup.title(VERSION));
  try {
    const token = await readToken(context);
    if (token === undefined) return 1;
    if (!isValidToken(token)) {
      terminal.write(messages.setup.tokenFormat);
      return 1;
    }
    if ((await checkToken(token, context)) === "rejected") {
      terminal.write(messages.setup.tokenRejected);
      return 1;
    }

    const launcher = launcherFor(context.scriptPath, environment.platform, context.nodePath);
    const entry: ServerEntry = {
      ...launcher,
      env:
        context.language === "en"
          ? { LOLZTEAM_TOKEN: token }
          : { LOLZTEAM_TOKEN: token, LOLZTEAM_LOCALE: context.language },
    };
    const clients = await pickClients(options, context);
    if (clients.length === 0) terminal.write(messages.setup.noClients);

    let failures = 0;
    for (const client of clients) {
      try {
        const result = await writeServer(client.configPath, entry);
        terminal.write(messages.setup.configured(client.name, client.configPath));
        if (result.backupPath) terminal.write(messages.setup.backup(result.backupPath));
      } catch (error) {
        failures++;
        terminal.write(
          error instanceof InvalidConfigError
            ? messages.setup.invalidConfig(client.name, error.path)
            : messages.setup.writeFailed(
                client.name,
                error instanceof Error ? error.message : String(error),
              ),
        );
      }
    }

    terminal.write("");
    terminal.write(messages.setup.claudeCode);
    terminal.write(`  ${claudeCodeCommand(launcher)}`);
    terminal.write("");
    terminal.write(clients.length > failures ? messages.setup.restart : messages.setup.manual);
    return failures > 0 ? 1 : 0;
  } catch (error) {
    if (error instanceof SetupCancelled) {
      terminal.write(messages.setup.cancelled);
      return 130;
    }
    throw error;
  }
}
