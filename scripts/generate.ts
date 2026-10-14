import { readFile, writeFile } from "node:fs/promises";
import type { EndpointCatalog } from "../src/endpoints/types.ts";
import {
  buildCatalog,
  catalogPath,
  SERVICES,
  specPath,
  type Json,
  type Service,
} from "./catalog.ts";

async function readPrevious(service: Service): Promise<EndpointCatalog | undefined> {
  try {
    const text = await readFile(catalogPath(service), "utf8");
    const start = text.indexOf("= {");
    return JSON.parse(text.slice(start + 2, text.lastIndexOf("}") + 1)) as EndpointCatalog;
  } catch {
    return undefined;
  }
}

function describeChanges(
  service: Service,
  previous: EndpointCatalog | undefined,
  next: EndpointCatalog,
): string[] {
  const before = previous?.endpoints ?? {};
  const added = Object.keys(next.endpoints).filter((id) => !(id in before));
  const removed = Object.keys(before).filter((id) => !(id in next.endpoints));
  const changed = Object.keys(next.endpoints).flatMap((id) => {
    const old = before[id];
    if (!old) return [];
    const oldNames = new Set(old.params.map((param) => param.name));
    const newNames = new Set(next.endpoints[id]?.params.map((param) => param.name));
    const plus = [...newNames].filter((name) => !oldNames.has(name));
    const minus = [...oldNames].filter((name) => !newNames.has(name));
    const parts = [
      plus.length > 0 ? `added ${plus.map((name) => `\`${name}\``).join(", ")}` : "",
      minus.length > 0 ? `removed ${minus.map((name) => `\`${name}\``).join(", ")}` : "",
    ].filter(Boolean);
    return parts.length > 0 ? [`\`${id}\`: ${parts.join("; ")}`] : [];
  });
  const previousExcluded = previous?.excluded ?? {};
  const newlyExcluded = Object.entries(next.excluded).filter(([id]) => !(id in previousExcluded));
  const lines = [
    `## ${service[0]?.toUpperCase()}${service.slice(1)} ${previous?.version ?? "none"} to ${next.version}`,
  ];
  const section = (title: string, items: string[]) => {
    if (items.length > 0) lines.push("", `### ${title}`, "", ...items.map((item) => `- ${item}`));
  };
  section(
    "Added endpoints",
    added.map((id) => {
      const endpoint = next.endpoints[id];
      return `\`${id}\` ${endpoint?.method} ${endpoint?.path}: ${endpoint?.summary}`;
    }),
  );
  section("Changed parameters", changed);
  section(
    "Removed endpoints",
    removed.map((id) => `\`${id}\``),
  );
  section(
    "New operations excluded by the read-only policy",
    newlyExcluded.map(([id, reason]) => `\`${id}\` ${reason}`),
  );
  if (lines.length === 1) lines.push("", "No changes.");
  return lines;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const download = args.includes("--download");
  const reportIndex = args.indexOf("--report");
  const reportPath = reportIndex >= 0 ? args[reportIndex + 1] : undefined;
  const report: string[] = [];

  for (const service of Object.keys(SERVICES) as Service[]) {
    if (download) {
      const response = await fetch(SERVICES[service]);
      if (!response.ok)
        throw new Error(`Failed to download the ${service} spec: HTTP ${response.status}`);
      const spec = (await response.json()) as Json;
      if (typeof spec.paths !== "object") throw new Error(`The ${service} spec has no paths.`);
      await writeFile(specPath(service), `${JSON.stringify(spec, null, 2)}\n`);
    }
    const spec = JSON.parse(await readFile(specPath(service), "utf8")) as Json;
    const previous = await readPrevious(service);
    const catalog = buildCatalog(spec);
    report.push(...describeChanges(service, previous, catalog), "");
    const body = JSON.stringify(catalog, null, 2);
    await writeFile(
      catalogPath(service),
      `import type { EndpointCatalog } from "./types.ts";\n\nexport const ${service}Catalog: EndpointCatalog = ${body};\n`,
    );
    process.stdout.write(
      `${service}: ${Object.keys(catalog.endpoints).length} read-only endpoints, ${Object.keys(catalog.excluded).length} excluded, spec ${catalog.version}\n`,
    );
  }

  const text = `${report.join("\n").trim()}\n`;
  if (reportPath) await writeFile(reportPath, text);
  else process.stdout.write(`\n${text}`);
}

await main();
