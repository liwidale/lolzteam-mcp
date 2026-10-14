import { invalidInput, LolzteamError } from "./errors.ts";
import { messages, type ToolName } from "./i18n/index.ts";
import type { McpServer, ToolResult } from "./mcp/server.ts";
import { parseShape, shapeToJson, type Issue, type InferShape, type Shape } from "./schema.ts";

export interface ToolContext {
  signal: AbortSignal;
}

export interface ToolDefinition<S extends Shape> {
  name: ToolName;
  inputSchema: S;
  handler: (args: InferShape<S>, context: ToolContext) => Promise<unknown>;
}

export function successResult(data: unknown): ToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
}

export function errorResult(error: unknown): ToolResult {
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

function describeShape(name: ToolName, shape: Shape): Shape {
  const params: Readonly<Record<string, string>> = messages.tools[name].params;
  return Object.fromEntries(
    Object.entries(shape).map(([key, schema]) => {
      const description = params[key] ?? messages.common[key];
      if (description === undefined) throw new Error(`No description for ${name}.${key}`);
      return [key, schema.describe(description)];
    }),
  );
}

function formatIssues(issues: Issue[]): string {
  return issues
    .map((issue) => (issue.path ? `${issue.path}: ${issue.message}` : issue.message))
    .join("; ");
}

export function registerTool<S extends Shape>(server: McpServer, tool: ToolDefinition<S>): void {
  const text = messages.tools[tool.name];
  const shape = describeShape(tool.name, tool.inputSchema) as S;
  server.addTool({
    name: tool.name,
    title: text.title,
    description: text.description,
    inputSchema: shapeToJson(shape),
    annotations: {
      title: text.title,
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
    call: async (args, signal) => {
      const parsed = parseShape(shape, args);
      if (!parsed.ok) {
        return errorResult(
          invalidInput(messages.validation.invalidArguments(formatIssues(parsed.issues))),
        );
      }
      try {
        return successResult(await tool.handler(parsed.value, { signal }));
      } catch (error) {
        if (!(error instanceof LolzteamError)) {
          const reason = error instanceof Error ? error.message : String(error);
          process.stderr.write(`${messages.startup.toolFailed(tool.name, reason)}\n`);
        }
        return errorResult(error);
      }
    },
  });
}
