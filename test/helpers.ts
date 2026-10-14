import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { loadConfig } from "../src/config.ts";
import { createServer, createServices } from "../src/server.ts";

export interface RecordedRequest {
  method: string;
  url: URL;
  headers: Headers;
  body: unknown;
}

export type Handler = (request: RecordedRequest) => Response | Promise<Response>;

export const TEST_TOKEN = "test-token-1234567890";

export function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

export function fakeFetch(handler: Handler) {
  const requests: RecordedRequest[] = [];
  const fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const body = typeof init?.body === "string" ? (JSON.parse(init.body) as unknown) : undefined;
    const request: RecordedRequest = {
      method: init?.method ?? "GET",
      url: new URL(input instanceof Request ? input.url : input),
      headers: new Headers(init?.headers),
      body,
    };
    requests.push(request);
    return handler(request);
  };
  return { fetch, requests };
}

export async function connect(handler: Handler, env: Record<string, string> = {}) {
  const config = loadConfig({
    LOLZTEAM_TOKEN: TEST_TOKEN,
    LOLZTEAM_MAX_RETRIES: "0",
    ...env,
  });
  const { fetch, requests } = fakeFetch(handler);
  const server = createServer(createServices(config, fetch));
  const client = new Client({ name: "test", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

  async function call(name: string, args: Record<string, unknown> = {}) {
    const result = await client.callTool({ name, arguments: args });
    const content = result.content as { type: string; text: string }[];
    const text = content[0]?.text ?? "";
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    return { isError: result.isError === true, data: data as Record<string, any>, text };
  }

  return { client, server, requests, call, close: () => client.close() };
}
