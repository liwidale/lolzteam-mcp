import type { McpServer, ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { z } from "zod";
import { LolzteamError } from "./errors.ts";
import { messages, type ToolName } from "./i18n/index.ts";

export interface ToolContext {
  signal: AbortSignal;
}

export interface ToolDefinition<Shape extends z.ZodRawShape> {
  name: ToolName;
  inputSchema: Shape;
  handler: (args: z.infer<z.ZodObject<Shape>>, context: ToolContext) => Promise<unknown>;
}

export function successResult(data: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
}

export function errorResult(error: unknown): CallToolResult {
  const failure =
    error instanceof LolzteamError
      ? error
      : new LolzteamError("internal_error", messages.errors.internal);
  const { status, endpoint, retryAfterSeconds, apiMessages } = failure.details;
  const body = {
    error: {
      code: failure.code,
      message: failure.message,
      status,
      endpoint,
      retry_after_seconds: retryAfterSeconds,
      api_messages: apiMessages,
      hint: messages.hints[failure.code],
    },
  };
  return { isError: true, content: [{ type: "text", text: JSON.stringify(body) }] };
}

function describeShape(name: ToolName, shape: z.ZodRawShape): z.ZodRawShape {
  const params: Readonly<Record<string, string>> = messages.tools[name].params;
  return Object.fromEntries(
    Object.entries(shape).map(([key, schema]) => {
      const description = params[key] ?? messages.common[key];
      if (description === undefined) throw new Error(`No description for ${name}.${key}`);
      return [key, (schema as z.ZodType).describe(description)];
    }),
  );
}

export function registerTool<Shape extends z.ZodRawShape>(
  server: McpServer,
  tool: ToolDefinition<Shape>,
): void {
  const text = messages.tools[tool.name];
  const handler: ToolCallback<z.ZodRawShape> = async (args, extra) => {
    try {
      const input = args as z.infer<z.ZodObject<Shape>>;
      return successResult(await tool.handler(input, { signal: extra.signal }));
    } catch (error) {
      if (!(error instanceof LolzteamError)) {
        const reason = error instanceof Error ? error.message : String(error);
        process.stderr.write(`${messages.startup.toolFailed(tool.name, reason)}\n`);
      }
      return errorResult(error);
    }
  };
  server.registerTool<z.ZodRawShape, z.ZodRawShape>(
    tool.name,
    {
      title: text.title,
      description: text.description,
      inputSchema: describeShape(tool.name, tool.inputSchema),
      annotations: {
        title: text.title,
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    handler,
  );
}
