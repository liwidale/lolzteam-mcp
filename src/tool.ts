import type { McpServer, ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { z } from "zod";
import { LolzteamError, type ErrorCode } from "./errors.ts";

export interface ToolContext {
  signal: AbortSignal;
}

export interface ToolDefinition<Shape extends z.ZodRawShape> {
  name: string;
  title: string;
  description: string;
  inputSchema: Shape;
  handler: (args: z.infer<z.ZodObject<Shape>>, context: ToolContext) => Promise<unknown>;
}

const HINTS: Partial<Record<ErrorCode, string>> = {
  invalid_input: "Fix the arguments described in the message and call the tool again.",
  not_configured:
    "The server owner has to add an API token to the MCP server configuration. Retrying will not help.",
  unauthorized:
    "The configured token was rejected. Ask the user to create a new token. Retrying will not help.",
  forbidden:
    "The token lacks a required scope or the account has no access. Forum search needs the post scope, Market needs the market scope.",
  not_found: "Check the identifier. The content may have been deleted or hidden.",
  rate_limited: "Wait at least retry_after_seconds before calling this API again.",
  upstream_unavailable: "The service is having problems. Try again in a minute.",
  timeout: "Try again, possibly with narrower filters or a smaller page size.",
  network_error: "Try again later. If the problem persists, the API host may be unreachable.",
};

export function successResult(data: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
}

export function errorResult(error: unknown): CallToolResult {
  const failure =
    error instanceof LolzteamError
      ? error
      : new LolzteamError("internal_error", "The MCP server failed to process the request.");
  const { status, endpoint, retryAfterSeconds, apiMessages } = failure.details;
  const body = {
    error: {
      code: failure.code,
      message: failure.message,
      status,
      endpoint,
      retry_after_seconds: retryAfterSeconds,
      api_messages: apiMessages,
      hint: HINTS[failure.code],
    },
  };
  return { isError: true, content: [{ type: "text", text: JSON.stringify(body) }] };
}

export function registerTool<Shape extends z.ZodRawShape>(
  server: McpServer,
  tool: ToolDefinition<Shape>,
): void {
  const handler: ToolCallback<z.ZodRawShape> = async (args, extra) => {
    try {
      const input = args as z.infer<z.ZodObject<Shape>>;
      return successResult(await tool.handler(input, { signal: extra.signal }));
    } catch (error) {
      if (!(error instanceof LolzteamError)) {
        process.stderr.write(
          `lolzteam-mcp: ${tool.name} failed: ${error instanceof Error ? error.message : String(error)}\n`,
        );
      }
      return errorResult(error);
    }
  };
  server.registerTool<z.ZodRawShape, z.ZodRawShape>(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: {
        title: tool.title,
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    handler,
  );
}
