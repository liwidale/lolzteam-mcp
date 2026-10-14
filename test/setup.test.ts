import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PassThrough } from "node:stream";
import { afterEach, beforeEach, describe, it } from "node:test";
import { messages } from "../src/i18n/index.ts";
import {
  detectClients,
  InvalidConfigError,
  knownClients,
  launcherFor,
  writeServer,
  type Environment,
} from "../src/setup/clients.ts";
import { runSetup, type SetupOptions } from "../src/setup/index.ts";
import { createTerminal, SetupCancelled, type Terminal } from "../src/setup/terminal.ts";
import { fakeFetch, json, TEST_TOKEN, type Handler } from "./helpers.ts";

let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), "lolzteam-mcp-setup-"));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

function environment(env: Record<string, string> = {}): Environment {
  return { platform: "linux", home: join(root, "home"), env };
}

function scriptedTerminal(answers: string[], interactive = true) {
  const lines: string[] = [];
  const terminal: Terminal = {
    interactive,
    write: (line) => lines.push(line),
    ask: () => Promise.resolve(answers.shift() ?? ""),
    askSecret: () => {
      const answer = answers.shift();
      return answer === undefined ? Promise.reject(new SetupCancelled()) : Promise.resolve(answer);
    },
  };
  return { terminal, lines };
}

const apiOk: Handler = (request) =>
  request.url.pathname === "/users/me"
    ? json({ user: { username: "tester", balance: "100.00" } })
    : json({ currencyList: {} });

async function setup(
  options: Partial<SetupOptions>,
  answers: string[],
  handler: Handler = apiOk,
  env: Record<string, string> = {},
) {
  const { terminal, lines } = scriptedTerminal(answers);
  const { fetch, requests } = fakeFetch(handler);
  const code = await runSetup(
    { yes: false, clients: [], ...options },
    {
      environment: environment(env),
      terminal,
      scriptPath: "/opt/lolzteam-mcp/dist/index.js",
      nodePath: "/usr/bin/node",
      language: "en",
      fetch,
    },
  );
  return { code, lines, requests, output: lines.join("\n") };
}

async function readConfig(path: string) {
  return JSON.parse(await readFile(path, "utf8")) as {
    mcpServers: Record<string, { command: string; args: string[]; env: Record<string, string> }>;
    [key: string]: unknown;
  };
}

describe("client configuration files", () => {
  it("knows where each client keeps its configuration", () => {
    const paths = (platform: NodeJS.Platform, env: Record<string, string> = {}) =>
      Object.fromEntries(
        knownClients({ platform, home: "/home/u", env }).map((client) => [
          client.id,
          client.configPath,
        ]),
      );
    assert.equal(
      paths("darwin")["claude-desktop"],
      join("/home/u", "Library", "Application Support", "Claude", "claude_desktop_config.json"),
    );
    assert.equal(
      paths("win32", { APPDATA: "C:\\Users\\u\\AppData\\Roaming" })["claude-desktop"],
      join("C:\\Users\\u\\AppData\\Roaming", "Claude", "claude_desktop_config.json"),
    );
    assert.equal(
      paths("linux")["claude-desktop"],
      join("/home/u", ".config", "Claude", "claude_desktop_config.json"),
    );
    assert.equal(paths("linux").cursor, join("/home/u", ".cursor", "mcp.json"));
    assert.equal(
      paths("linux").windsurf,
      join("/home/u", ".codeium", "windsurf", "mcp_config.json"),
    );
    for (const platform of ["linux", "darwin", "win32"] as const) {
      assert.equal(
        paths(platform).antigravity,
        join("/home/u", ".gemini", "config", "mcp_config.json"),
      );
    }
  });

  it("detects only the clients that are installed", async () => {
    await mkdir(join(root, "home", ".cursor"), { recursive: true });
    const found = await detectClients(environment());
    assert.deepEqual(
      found.map((client) => client.id),
      ["cursor"],
    );
  });

  it("detects Antigravity by its configuration folder", async () => {
    await mkdir(join(root, "home", ".gemini", "antigravity"), { recursive: true });
    assert.deepEqual(await detectClients(environment()), []);
    await mkdir(join(root, "home", ".gemini", "config"), { recursive: true });
    const found = await detectClients(environment());
    assert.deepEqual(
      found.map((client) => [client.id, client.name]),
      [["antigravity", "Antigravity"]],
    );
  });

  it("starts the server through npx when it runs from the npx cache", () => {
    assert.deepEqual(
      launcherFor(
        "/home/u/.npm/_npx/abc/node_modules/lolzteam-mcp/dist/index.js",
        "linux",
        "/usr/bin/node",
      ),
      {
        command: "npx",
        args: ["-y", "lolzteam-mcp@latest"],
      },
    );
    assert.deepEqual(
      launcherFor(
        "/home/u/.npm/_npx/abc/node_modules/lolzteam-mcp/dist/index.js",
        "win32",
        "node.exe",
      ),
      {
        command: "cmd",
        args: ["/c", "npx", "-y", "lolzteam-mcp@latest"],
      },
    );
    assert.deepEqual(
      launcherFor("/usr/lib/node_modules/lolzteam-mcp/dist/index.js", "linux", "/usr/bin/node"),
      {
        command: "/usr/bin/node",
        args: ["/usr/lib/node_modules/lolzteam-mcp/dist/index.js"],
      },
    );
  });

  it("adds the server, keeps everything else and backs up the old file", async () => {
    const path = join(root, "config.json");
    await writeFile(
      path,
      JSON.stringify({ theme: "dark", mcpServers: { other: { command: "x" } } }),
    );
    const entry = { command: "node", args: ["index.js"], env: { LOLZTEAM_TOKEN: "t" } };
    const result = await writeServer(path, entry);
    const config = await readConfig(path);
    assert.equal(config.theme, "dark");
    assert.deepEqual(Object.keys(config.mcpServers), ["other", "lolzteam"]);
    assert.deepEqual(config.mcpServers.lolzteam, entry);
    assert.equal(result.backupPath, `${path}.bak`);
    assert.match(await readFile(`${path}.bak`, "utf8"), /"theme":"dark"/);
  });

  it("creates missing files and refuses to overwrite broken JSON", async () => {
    const created = join(root, "new", "mcp.json");
    assert.deepEqual(await writeServer(created, { command: "node", args: [], env: {} }), {});
    assert.ok((await readConfig(created)).mcpServers.lolzteam);

    const broken = join(root, "broken.json");
    await writeFile(broken, "{ not json");
    await assert.rejects(
      writeServer(broken, { command: "node", args: [], env: {} }),
      InvalidConfigError,
    );
    assert.equal(await readFile(broken, "utf8"), "{ not json");
  });
});

describe("setup command", () => {
  it("checks the token and configures the chosen clients", async () => {
    await mkdir(join(root, "home", ".cursor"), { recursive: true });
    await mkdir(join(root, "home", ".config", "Claude"), { recursive: true });
    const { code, output, requests } = await setup({}, [TEST_TOKEN, "2"]);
    assert.equal(code, 0, output);
    assert.match(output, /signed in as tester/);
    assert.doesNotMatch(output, /100\.00/);
    assert.doesNotMatch(output, new RegExp(TEST_TOKEN));
    assert.deepEqual(
      requests.map((request) => request.url.pathname),
      ["/users/me", "/currency"],
    );
    const cursor = await readConfig(join(root, "home", ".cursor", "mcp.json"));
    assert.deepEqual(cursor.mcpServers.lolzteam, {
      command: "/usr/bin/node",
      args: ["/opt/lolzteam-mcp/dist/index.js"],
      env: { LOLZTEAM_TOKEN: TEST_TOKEN },
    });
    await assert.rejects(
      readFile(join(root, "home", ".config", "Claude", "claude_desktop_config.json")),
    );
    assert.match(
      output,
      /claude mcp add --transport stdio --scope user --env LOLZTEAM_TOKEN=<token> lolzteam -- \/usr\/bin\/node/,
    );
  });

  it("runs without questions from LOLZTEAM_TOKEN and --yes", async () => {
    await mkdir(join(root, "home", ".cursor"), { recursive: true });
    const { code, output } = await setup({ yes: true }, [], apiOk, { LOLZTEAM_TOKEN: TEST_TOKEN });
    assert.equal(code, 0, output);
    assert.match(output, new RegExp(messages.setup.tokenFromEnv.replace(".", "\\.")));
    assert.ok((await readConfig(join(root, "home", ".cursor", "mcp.json"))).mcpServers.lolzteam);
  });

  it("configures a client named with --client even if it is not installed yet", async () => {
    const { code } = await setup({ clients: ["windsurf"] }, [TEST_TOKEN]);
    assert.equal(code, 0);
    assert.ok(
      (await readConfig(join(root, "home", ".codeium", "windsurf", "mcp_config.json"))).mcpServers
        .lolzteam,
    );
    const antigravity = await setup({ clients: ["antigravity"] }, [TEST_TOKEN]);
    assert.equal(antigravity.code, 0);
    assert.ok(
      (await readConfig(join(root, "home", ".gemini", "config", "mcp_config.json"))).mcpServers
        .lolzteam,
    );
    const unknown = await setup({ clients: ["vim"] }, [TEST_TOKEN]);
    assert.match(unknown.output, /Unknown clients: vim/);
  });

  it("stops without changes when the token is rejected", async () => {
    await mkdir(join(root, "home", ".cursor"), { recursive: true });
    const { code, output } = await setup({ yes: true }, [TEST_TOKEN], () =>
      json({ errors: ["Invalid or expired access token."] }, 401),
    );
    assert.equal(code, 1);
    assert.match(output, /rejected the token/);
    await assert.rejects(readFile(join(root, "home", ".cursor", "mcp.json")));
  });

  it("keeps going when only the Market API is unavailable", async () => {
    await mkdir(join(root, "home", ".cursor"), { recursive: true });
    const { code, output } = await setup({ yes: true }, [TEST_TOKEN], (request) =>
      request.url.pathname === "/users/me"
        ? json({ user: { username: "tester" } })
        : json({ errors: ["No access"] }, 403),
    );
    assert.equal(code, 0);
    assert.match(output, /Market API: .*forum tools still work/);
  });

  it("rejects malformed tokens and handles cancellation", async () => {
    const malformed = await setup({}, ["two words"]);
    assert.equal(malformed.code, 1);
    assert.match(malformed.output, /printable ASCII/);
    assert.equal(malformed.requests.length, 0);

    const cancelled = await setup({}, []);
    assert.equal(cancelled.code, 130);
    assert.match(cancelled.output, /Setup cancelled/);
  });

  it("asks for an environment token when there is no terminal", async () => {
    const { terminal, lines } = scriptedTerminal([], false);
    const code = await runSetup(
      { yes: true, clients: [] },
      {
        environment: environment(),
        terminal,
        scriptPath: "/x.js",
        nodePath: "node",
        language: "en",
      },
    );
    assert.equal(code, 1);
    assert.match(lines.join("\n"), /Set LOLZTEAM_TOKEN/);
  });

  it("writes the interface language into the server configuration", async () => {
    await mkdir(join(root, "home", ".cursor"), { recursive: true });
    const { terminal } = scriptedTerminal([TEST_TOKEN]);
    const { fetch } = fakeFetch(apiOk);
    await runSetup(
      { yes: true, clients: [] },
      {
        environment: environment(),
        terminal,
        scriptPath: "/x.js",
        nodePath: "node",
        language: "ru",
        fetch,
      },
    );
    const config = await readConfig(join(root, "home", ".cursor", "mcp.json"));
    assert.equal(config.mcpServers.lolzteam?.env.LOLZTEAM_LOCALE, "ru");
  });
});

describe("terminal input", () => {
  function fakeTty(chunks: string[]) {
    const input = new PassThrough() as unknown as NodeJS.ReadStream;
    const output = new PassThrough() as unknown as NodeJS.WriteStream;
    const modes: boolean[] = [];
    Object.assign(input, {
      isTTY: true,
      setRawMode: (mode: boolean) => {
        modes.push(mode);
        return input;
      },
    });
    let written = "";
    (output as unknown as NodeJS.EventEmitter).on(
      "data",
      (chunk: Buffer) => (written += chunk.toString()),
    );
    setImmediate(() => {
      for (const chunk of chunks) input.write(chunk);
    });
    return { input, output, modes, written: () => written };
  }

  it("reads a hidden token with backspace support and restores the terminal", async () => {
    const tty = fakeTty([`secret-x${String.fromCharCode(127)}Y`, "\r"]);
    const value = await createTerminal(tty.input, tty.output).askSecret("Token: ");
    assert.equal(value, "secret-Y");
    assert.deepEqual(tty.modes, [true, false]);
    assert.doesNotMatch(tty.written(), /secret/);
  });

  it("cancels on Ctrl+C", async () => {
    const tty = fakeTty([`abc${String.fromCharCode(3)}`]);
    await assert.rejects(
      createTerminal(tty.input, tty.output).askSecret("Token: "),
      SetupCancelled,
    );
    assert.deepEqual(tty.modes, [true, false]);
  });
});
