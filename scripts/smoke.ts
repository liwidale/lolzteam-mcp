import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const CHECKS: [string, Record<string, unknown>][] = [
  ["forum_list_categories", {}],
  ["forum_search", { query: "steam", type: "threads", limit: 3, text_length: 120 }],
  ["forum_list_threads", { limit: 3, text_length: 120 }],
  ["forum_find_tags", {}],
  ["market_list_currencies", {}],
  ["market_search", { category: "steam", order_by: "price_to_up", description_length: 0 }],
];

if (!process.env.LOLZTEAM_TOKEN) {
  process.stderr.write("Set LOLZTEAM_TOKEN to run the live smoke test.\n");
  process.exit(1);
}

const env = Object.fromEntries(
  Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined),
);
const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["dist/index.js"],
  env,
});
const client = new Client({ name: "lolzteam-mcp-smoke", version: "1.0.0" });
await client.connect(transport);

let failures = 0;
for (const [name, args] of CHECKS) {
  const result = await client.callTool({ name, arguments: args });
  const content = result.content as { type: string; text: string }[];
  const text = content[0]?.text ?? "";
  if (result.isError) failures++;
  process.stdout.write(`${result.isError ? "FAIL" : "ok  "} ${name}: ${text.slice(0, 300)}\n`);
}
await client.close();
process.exit(failures > 0 ? 1 : 0);
