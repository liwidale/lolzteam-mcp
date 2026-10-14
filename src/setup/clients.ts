import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, sep } from "node:path";

export interface Environment {
  platform: NodeJS.Platform;
  home: string;
  env: Readonly<Record<string, string | undefined>>;
}

export interface Client {
  id: "claude-desktop" | "cursor" | "windsurf" | "antigravity";
  name: string;
  configPath: string;
}

export interface Launcher {
  command: string;
  args: string[];
}

export interface ServerEntry extends Launcher {
  env: Record<string, string>;
}

export const SERVER_NAME = "lolzteam";
export const PACKAGE_NAME = "lolzteam-mcp";

function claudeDesktopDir({ platform, home, env }: Environment): string {
  if (platform === "win32") return join(env.APPDATA ?? join(home, "AppData", "Roaming"), "Claude");
  if (platform === "darwin") return join(home, "Library", "Application Support", "Claude");
  return join(env.XDG_CONFIG_HOME ?? join(home, ".config"), "Claude");
}

export function knownClients(environment: Environment): Client[] {
  const { home } = environment;
  return [
    {
      id: "claude-desktop",
      name: "Claude Desktop",
      configPath: join(claudeDesktopDir(environment), "claude_desktop_config.json"),
    },
    { id: "cursor", name: "Cursor", configPath: join(home, ".cursor", "mcp.json") },
    {
      id: "windsurf",
      name: "Windsurf",
      configPath: join(home, ".codeium", "windsurf", "mcp_config.json"),
    },
    {
      id: "antigravity",
      name: "Antigravity",
      configPath: join(home, ".gemini", "config", "mcp_config.json"),
    },
  ];
}

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function detectClients(environment: Environment): Promise<Client[]> {
  const clients = knownClients(environment);
  const found = await Promise.all(clients.map((client) => exists(dirname(client.configPath))));
  return clients.filter((_, index) => found[index]);
}

export function launcherFor(scriptPath: string, platform: NodeJS.Platform, node: string): Launcher {
  if (scriptPath.includes(`${sep}_npx${sep}`) || scriptPath.includes("/_npx/")) {
    return platform === "win32"
      ? { command: "cmd", args: ["/c", "npx", "-y", `${PACKAGE_NAME}@latest`] }
      : { command: "npx", args: ["-y", `${PACKAGE_NAME}@latest`] };
  }
  return { command: node, args: [scriptPath] };
}

export class InvalidConfigError extends Error {
  readonly path: string;

  constructor(path: string) {
    super(`Invalid JSON in ${path}`);
    this.name = "InvalidConfigError";
    this.path = path;
  }
}

export interface WriteResult {
  backupPath?: string;
}

export async function writeServer(configPath: string, entry: ServerEntry): Promise<WriteResult> {
  let config: Record<string, unknown> = {};
  let backupPath: string | undefined;
  if (await exists(configPath)) {
    const text = await readFile(configPath, "utf8");
    if (text.trim() !== "") {
      try {
        const parsed: unknown = JSON.parse(text);
        if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
          throw new InvalidConfigError(configPath);
        }
        config = parsed as Record<string, unknown>;
      } catch {
        throw new InvalidConfigError(configPath);
      }
      backupPath = `${configPath}.bak`;
      await copyFile(configPath, backupPath);
    }
  }
  const current = config.mcpServers;
  const servers =
    typeof current === "object" && current !== null && !Array.isArray(current)
      ? (current as Record<string, unknown>)
      : {};
  const next = { ...config, mcpServers: { ...servers, [SERVER_NAME]: entry } };
  await mkdir(dirname(configPath), { recursive: true });
  await writeFile(configPath, `${JSON.stringify(next, null, 2)}\n`, { mode: 0o600 });
  return backupPath === undefined ? {} : { backupPath };
}
