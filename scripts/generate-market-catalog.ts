import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DEFAULT_SOURCE =
  "https://raw.githubusercontent.com/AS7RIDENIED/LOLZTEAM/main/Official%20Documentation/market.json";
const OUTPUT = fileURLToPath(new URL("../src/market/catalog.generated.ts", import.meta.url));
const SKIPPED_OPERATIONS = new Set(["Category.List", "Category.Params", "Category.Games"]);
const MAX_ENUM_VALUES = 60;

type Json = Record<string, unknown>;

interface Filter {
  name: string;
  type: string;
  items?: string;
  values?: (string | number)[];
  valueCount?: number;
  description: string;
}

async function loadSpec(source: string): Promise<Json> {
  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`Failed to download ${source}: HTTP ${response.status}`);
    return (await response.json()) as Json;
  }
  return JSON.parse(await readFile(source, "utf8")) as Json;
}

function resolve(spec: Json, node: unknown): Json {
  let current = node as Json;
  while (typeof current.$ref === "string") {
    current = current.$ref
      .replace(/^#\//, "")
      .split("/")
      .reduce<Json>((parent, key) => parent[key] as Json, spec);
  }
  return current;
}

function describe(text: unknown): string {
  return typeof text === "string" ? text.replace(/\s+/g, " ").trim().slice(0, 240) : "";
}

function toFilter(spec: Json, parameter: Json): Filter {
  const schema = resolve(spec, parameter.schema ?? {});
  const name = parameter.name as string;
  const itemsSchema = schema.items ? resolve(spec, schema.items) : undefined;
  let type = typeof schema.type === "string" ? schema.type : "string";
  let items = typeof itemsSchema?.type === "string" ? itemsSchema.type : undefined;
  let values = (schema.enum ?? itemsSchema?.enum) as (string | number)[] | undefined;
  if (name.endsWith("[]") && type !== "array") {
    items = type;
    type = "array";
  }
  if (type === "array") items ??= "string";
  if (type === "object") {
    const additional = schema.additionalProperties
      ? resolve(spec, schema.additionalProperties)
      : {};
    items = typeof additional.type === "string" ? additional.type : "integer";
    values = undefined;
  }
  const filter: Filter = { name, type, description: describe(parameter.description) };
  if (items) filter.items = items;
  if (values && values.length <= MAX_ENUM_VALUES) filter.values = values;
  else if (values) filter.valueCount = values.length;
  return filter;
}

async function main(): Promise<void> {
  const spec = await loadSpec(process.argv[2] ?? DEFAULT_SOURCE);
  const catalog: Record<string, { path: string; title: string; filters: Filter[] }> = {};
  for (const [path, item] of Object.entries(spec.paths as Record<string, Json>)) {
    const operation = item.get as Json | undefined;
    const operationId = operation?.operationId;
    if (typeof operationId !== "string" || !operationId.startsWith("Category.")) continue;
    if (SKIPPED_OPERATIONS.has(operationId)) continue;
    const key = path === "/" ? "all" : path.slice(1);
    const parameters = (operation?.parameters ?? []) as unknown[];
    catalog[key] = {
      path,
      title: typeof operation?.summary === "string" ? operation.summary : key,
      filters: parameters.map((parameter) => toFilter(spec, resolve(spec, parameter))),
    };
  }
  const body = JSON.stringify(catalog, null, 2);
  await writeFile(
    OUTPUT,
    `import type { MarketCatalog } from "./catalog.ts";\n\nexport const marketCatalog: MarketCatalog = ${body};\n`,
  );
  process.stdout.write(`Wrote ${Object.keys(catalog).length} categories to ${OUTPUT}\n`);
}

await main();
