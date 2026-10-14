import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import { describe, it } from "node:test";
import { McpServer, PROTOCOL_VERSIONS, type JsonRpcMessage } from "../src/mcp/server.ts";
import { StdioTransport } from "../src/mcp/stdio.ts";
import { parseShape, s, shapeToJson } from "../src/schema.ts";

describe("schema", () => {
  const shape = {
    query: s.string().trim().min(1).max(5),
    limit: s.number().int().min(1).max(50).optional(),
    page: s.number().int().positive().default(1),
    type: s.enum(["all", "threads"]).default("all"),
    user_id: s.union([s.number().int().positive(), s.literal("me")]).optional(),
    ids: s.array(s.number().int()).max(2).optional(),
    filters: s.record(s.string().min(1), s.union([s.string(), s.number()])).default({}),
    flag: s.boolean().optional(),
  };

  it("parses valid input, trims strings and fills defaults", () => {
    const result = parseShape(shape, { query: "  abc ", user_id: "me", ids: [1, 2] });
    assert.deepEqual(result, {
      ok: true,
      value: { query: "abc", page: 1, type: "all", user_id: "me", ids: [1, 2], filters: {} },
    });
  });

  it("does not share default objects between calls", () => {
    const first = parseShape(shape, { query: "a" });
    assert.ok(first.ok);
    first.value.filters.x = 1;
    const second = parseShape(shape, { query: "a" });
    assert.ok(second.ok);
    assert.deepEqual(second.value.filters, {});
  });

  it("reports every problem with its path", () => {
    const result = parseShape(shape, {
      query: "   ",
      limit: 1.5,
      page: 0,
      type: "posts",
      user_id: "you",
      ids: [1, 2, 3],
      filters: { "": 1, ok: true },
      flag: "yes",
    });
    assert.equal(result.ok, false);
    const paths = result.ok ? [] : result.issues.map((issue) => issue.path);
    assert.deepEqual(paths, [
      "query",
      "limit",
      "page",
      "type",
      "user_id",
      "ids",
      "filters.",
      "filters.ok",
      "flag",
    ]);
    assert.deepEqual(parseShape(shape, {}).ok, false);
    assert.deepEqual(parseShape(shape, "text").ok, false);
  });

  it("describes the shape as JSON Schema", () => {
    const json = shapeToJson({
      id: s.number().int().positive().describe("ID."),
      mode: s.enum(["a", "b"]).default("a"),
      app: s.literal([730, 570]).optional(),
      me: s.literal("me"),
    });
    assert.deepEqual(json, {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        id: {
          type: "integer",
          exclusiveMinimum: 0,
          maximum: Number.MAX_SAFE_INTEGER,
          description: "ID.",
        },
        mode: { type: "string", enum: ["a", "b"], default: "a" },
        app: { type: "number", enum: [730, 570] },
        me: { type: "string", const: "me" },
      },
      required: ["id", "me"],
    });
  });
});

function harness() {
  const server = new McpServer({ name: "test", title: "Test", version: "1.2.3" }, "Use it.");
  const sent: JsonRpcMessage[] = [];
  let receive: ((message: unknown) => void) | undefined;
  const transport = {
    start: () => Promise.resolve(),
    close: () => Promise.resolve(),
    send: (message: JsonRpcMessage) => {
      sent.push(message);
      return Promise.resolve();
    },
    set onmessage(handler: ((message: unknown) => void) | undefined) {
      receive = handler;
    },
    get onmessage() {
      return receive;
    },
  };
  return {
    server,
    sent,
    connect: () => server.connect(transport),
    deliver: async (message: unknown) => {
      receive?.(message);
      await new Promise((resolve) => setImmediate(resolve));
    },
  };
}

describe("MCP protocol", () => {
  it("negotiates the protocol version", async () => {
    const { sent, connect, deliver } = harness();
    await connect();
    await deliver({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { protocolVersion: "2025-06-18" },
    });
    await deliver({
      jsonrpc: "2.0",
      id: 2,
      method: "initialize",
      params: { protocolVersion: "1999-01-01" },
    });
    assert.deepEqual(sent[0], {
      jsonrpc: "2.0",
      id: 1,
      result: {
        protocolVersion: "2025-06-18",
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "test", title: "Test", version: "1.2.3" },
        instructions: "Use it.",
      },
    });
    assert.equal(
      (sent[1]?.result as { protocolVersion: string }).protocolVersion,
      PROTOCOL_VERSIONS[0],
    );
  });

  it("answers ping, rejects unknown methods and tools, and ignores notifications", async () => {
    const { sent, connect, deliver } = harness();
    await connect();
    await deliver({ jsonrpc: "2.0", id: "a", method: "ping" });
    await deliver({ jsonrpc: "2.0", id: "b", method: "resources/list" });
    await deliver({ jsonrpc: "2.0", id: "c", method: "tools/call", params: { name: "nope" } });
    await deliver({ jsonrpc: "2.0", method: "notifications/initialized" });
    await deliver({ hello: "world" });
    assert.deepEqual(sent, [
      { jsonrpc: "2.0", id: "a", result: {} },
      { jsonrpc: "2.0", id: "b", error: { code: -32601, message: "Method not found" } },
      { jsonrpc: "2.0", id: "c", error: { code: -32602, message: "Unknown tool: nope" } },
      { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid request" } },
    ]);
  });

  it("aborts a tool call when the client cancels it and sends no response", async () => {
    const { server, sent, connect, deliver } = harness();
    let aborted = false;
    server.addTool({
      name: "slow",
      title: "Slow",
      description: "Waits for cancellation.",
      inputSchema: { type: "object" },
      annotations: {},
      call: (_args, signal) =>
        new Promise((resolve) => {
          signal.addEventListener("abort", () => {
            aborted = true;
            resolve({ content: [] });
          });
        }),
    });
    await connect();
    await deliver({
      jsonrpc: "2.0",
      id: 7,
      method: "tools/call",
      params: { name: "slow", arguments: {} },
    });
    await deliver({ jsonrpc: "2.0", method: "notifications/cancelled", params: { requestId: 7 } });
    assert.equal(aborted, true);
    assert.deepEqual(sent, []);
  });

  it("reads newline-delimited JSON from stdio and reports malformed lines", async () => {
    const input = new PassThrough();
    const output = new PassThrough();
    let written = "";
    output.on("data", (chunk: Buffer) => (written += chunk.toString()));
    const server = new McpServer({ name: "t", title: "T", version: "1" }, "");
    await server.connect(new StdioTransport(input, output));
    input.write('{"jsonrpc":"2.0","id":1,"me');
    input.write('thod":"ping"}\r\nnot json\n');
    await new Promise((resolve) => setTimeout(resolve, 20));
    const lines = written
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as JsonRpcMessage)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));
    assert.deepEqual(lines, [
      { jsonrpc: "2.0", id: 1, result: {} },
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
    ]);
  });
});
