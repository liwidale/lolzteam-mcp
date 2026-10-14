import type { JsonSchema } from "../schema.ts";

export const PROTOCOL_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];

type RequestId = string | number;

export interface JsonRpcError {
  code: number;
  message: string;
}

export interface JsonRpcMessage {
  jsonrpc: "2.0";
  id?: RequestId | null;
  method?: string;
  params?: unknown;
  result?: unknown;
  error?: JsonRpcError;
}

export interface Transport {
  start(): Promise<void>;
  send(message: JsonRpcMessage): Promise<void>;
  close(): Promise<void>;
  onmessage?(message: unknown): void;
  onclose?(): void;
  onerror?(error: Error): void;
}

export interface ToolContent {
  type: "text";
  text: string;
}

export interface ToolResult {
  content: ToolContent[];
  isError?: boolean;
}

export interface Tool {
  name: string;
  title: string;
  description: string;
  inputSchema: JsonSchema;
  annotations: Record<string, unknown>;
  call(args: unknown, signal: AbortSignal): Promise<ToolResult>;
}

export interface ServerInfo {
  name: string;
  title: string;
  version: string;
}

export const ERRORS = {
  parse: { code: -32700, message: "Parse error" },
  invalidRequest: { code: -32600, message: "Invalid request" },
  methodNotFound: { code: -32601, message: "Method not found" },
  invalidParams: { code: -32602, message: "Invalid params" },
  internal: { code: -32603, message: "Internal error" },
} as const;

class RpcFailure extends Error {
  readonly error: JsonRpcError;

  constructor(error: JsonRpcError) {
    super(error.message);
    this.error = error;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isRequestId(value: unknown): value is RequestId {
  return typeof value === "string" || typeof value === "number";
}

export class McpServer {
  readonly #info: ServerInfo;
  readonly #instructions: string;
  readonly #tools = new Map<string, Tool>();
  readonly #pending = new Map<RequestId, AbortController>();
  #transport: Transport | undefined;

  constructor(info: ServerInfo, instructions: string) {
    this.#info = info;
    this.#instructions = instructions;
  }

  addTool(tool: Tool): void {
    this.#tools.set(tool.name, tool);
  }

  async connect(transport: Transport): Promise<void> {
    this.#transport = transport;
    transport.onmessage = (message: unknown) => {
      void this.#receive(message);
    };
    transport.onclose = () => {
      for (const controller of this.#pending.values()) controller.abort();
      this.#pending.clear();
    };
    await transport.start();
  }

  async close(): Promise<void> {
    await this.#transport?.close();
  }

  async #send(message: JsonRpcMessage): Promise<void> {
    try {
      await this.#transport?.send(message);
    } catch (error) {
      this.#transport?.onerror?.(error instanceof Error ? error : new Error(String(error)));
    }
  }

  async #receive(message: unknown): Promise<void> {
    if (!isRecord(message) || message.jsonrpc !== "2.0") {
      await this.#send({ jsonrpc: "2.0", id: null, error: ERRORS.invalidRequest });
      return;
    }
    const { id, method, params } = message;
    if (typeof method !== "string") return;
    if (id === undefined) {
      this.#notify(method, params);
      return;
    }
    if (!isRequestId(id)) {
      await this.#send({ jsonrpc: "2.0", id: null, error: ERRORS.invalidRequest });
      return;
    }
    const controller = new AbortController();
    this.#pending.set(id, controller);
    try {
      const result = await this.#dispatch(method, params, controller.signal);
      if (!controller.signal.aborted) await this.#send({ jsonrpc: "2.0", id, result });
    } catch (error) {
      const failure = error instanceof RpcFailure ? error.error : ERRORS.internal;
      if (!controller.signal.aborted) await this.#send({ jsonrpc: "2.0", id, error: failure });
    } finally {
      this.#pending.delete(id);
    }
  }

  #notify(method: string, params: unknown): void {
    if (method !== "notifications/cancelled" || !isRecord(params)) return;
    const requestId = params.requestId;
    if (isRequestId(requestId)) this.#pending.get(requestId)?.abort();
  }

  async #dispatch(method: string, params: unknown, signal: AbortSignal): Promise<unknown> {
    switch (method) {
      case "initialize": {
        const requested = isRecord(params) ? params.protocolVersion : undefined;
        const protocolVersion =
          typeof requested === "string" && PROTOCOL_VERSIONS.includes(requested)
            ? requested
            : PROTOCOL_VERSIONS[0];
        return {
          protocolVersion,
          capabilities: { tools: { listChanged: false } },
          serverInfo: this.#info,
          instructions: this.#instructions,
        };
      }
      case "ping":
        return {};
      case "tools/list":
        return {
          tools: [...this.#tools.values()].map(
            ({ name, title, description, inputSchema, annotations }) => ({
              name,
              title,
              description,
              inputSchema,
              annotations,
            }),
          ),
        };
      case "tools/call": {
        const name = isRecord(params) ? params.name : undefined;
        const tool = typeof name === "string" ? this.#tools.get(name) : undefined;
        if (!isRecord(params) || !tool) {
          throw new RpcFailure({
            code: ERRORS.invalidParams.code,
            message: `Unknown tool: ${String(name)}`,
          });
        }
        return tool.call(params.arguments, signal);
      }
      default:
        throw new RpcFailure(ERRORS.methodNotFound);
    }
  }
}
