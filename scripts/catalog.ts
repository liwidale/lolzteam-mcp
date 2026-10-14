import { fileURLToPath } from "node:url";
import { decide } from "../src/endpoints/policy.ts";
import type {
  Endpoint,
  EndpointCatalog,
  EndpointParam,
  ParamType,
} from "../src/endpoints/types.ts";

export type Json = Record<string, unknown>;

export const SERVICES = {
  forum:
    "https://raw.githubusercontent.com/AS7RIDENIED/LOLZTEAM/main/Official%20Documentation/forum.json",
  market:
    "https://raw.githubusercontent.com/AS7RIDENIED/LOLZTEAM/main/Official%20Documentation/market.json",
} as const;

export type Service = keyof typeof SERVICES;

const METHODS = ["get", "post", "put", "patch", "delete"];
const SCALARS = new Set(["integer", "number", "string", "boolean"]);
const MAX_VALUES = 60;

const root = (path: string) => fileURLToPath(new URL(`../${path}`, import.meta.url));
export const specPath = (service: Service) => root(`openapi/${service}.json`);
export const catalogPath = (service: Service) => root(`src/endpoints/${service}.generated.ts`);

function resolve(spec: Json, node: unknown): Json {
  let current = (node ?? {}) as Json;
  for (let depth = 0; typeof current.$ref === "string" && depth < 20; depth++) {
    current = current.$ref
      .replace(/^#\//, "")
      .split("/")
      .reduce<Json>((parent, key) => (parent[key] ?? {}) as Json, spec);
  }
  return current;
}

function clean(text: unknown, max: number): string {
  if (typeof text !== "string") return "";
  const plain = text
    .replace(/\p{Extended_Pictographic}|\u{FE0F}/gu, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*>`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? `${plain.slice(0, max - 1).trimEnd()}…` : plain;
}

function typesOf(spec: Json, schema: Json): string[] {
  const resolved = resolve(spec, schema);
  const variants = (resolved.anyOf ?? resolved.oneOf) as Json[] | undefined;
  if (variants) return variants.flatMap((variant) => typesOf(spec, variant));
  const type = resolved.type;
  if (Array.isArray(type)) return type.filter((item): item is string => typeof item === "string");
  return typeof type === "string" ? [type] : [];
}

function pickType(types: string[]): ParamType {
  for (const type of ["array", "object", "string", "number", "integer", "boolean"] as const) {
    if (types.includes(type)) return type;
  }
  return "string";
}

function toParam(
  spec: Json,
  name: string,
  location: EndpointParam["in"],
  rawSchema: unknown,
  meta: { description?: unknown; required?: boolean; explode?: unknown },
): EndpointParam {
  const schema = resolve(spec, rawSchema);
  const variants = ((schema.anyOf ?? schema.oneOf) as Json[] | undefined)?.map((item) =>
    resolve(spec, item),
  );
  const arraySchema = [schema, ...(variants ?? [])].find((item) => item.type === "array");
  const itemSchema = arraySchema ? resolve(spec, arraySchema.items) : undefined;
  let type = pickType(typesOf(spec, schema));
  let items = itemSchema ? pickType(typesOf(spec, itemSchema)) : undefined;
  let values = (schema.enum ?? itemSchema?.enum) as (string | number)[] | undefined;
  if (name.endsWith("[]") && type !== "array") {
    items = type;
    type = "array";
  }
  if (type === "object") {
    const additional = resolve(spec, schema.additionalProperties);
    items = pickType(typesOf(spec, additional));
    values = undefined;
  }
  const param: EndpointParam = {
    name,
    in: location,
    type,
    description: clean(meta.description ?? schema.description, 240),
  };
  if ((type === "array" || type === "object") && items && SCALARS.has(items)) {
    param.items = items as NonNullable<EndpointParam["items"]>;
  } else if (type === "array" || type === "object") {
    param.items = "string";
  }
  const scalarValues = values?.filter(
    (value) => typeof value === "string" || typeof value === "number",
  );
  if (scalarValues && scalarValues.length > 0 && scalarValues.length <= MAX_VALUES) {
    param.values = scalarValues;
  } else if (scalarValues && scalarValues.length > MAX_VALUES) {
    param.valueCount = scalarValues.length;
  }
  if (location === "path" || meta.required === true) param.required = true;
  if (type === "array" && meta.explode === false) param.csv = true;
  return param;
}

function bodyProperties(
  spec: Json,
  rawSchema: unknown,
): { properties: Map<string, Json>; required: Set<string> } {
  const schema = resolve(spec, rawSchema);
  const properties = new Map<string, Json>();
  const required = new Set<string>((schema.required as string[] | undefined) ?? []);
  for (const [name, property] of Object.entries((schema.properties ?? {}) as Json)) {
    properties.set(name, property as Json);
  }
  for (const branch of [
    ...((schema.allOf ?? []) as Json[]),
    ...((schema.oneOf ?? schema.anyOf ?? []) as Json[]),
  ]) {
    const nested = bodyProperties(spec, branch);
    for (const [name, property] of nested.properties) {
      if (!properties.has(name)) properties.set(name, property);
    }
  }
  return { properties, required };
}

function buildParams(spec: Json, pathItem: Json, operation: Json, method: string): EndpointParam[] {
  const merged = new Map<string, Json>();
  for (const raw of [
    ...((pathItem.parameters ?? []) as unknown[]),
    ...((operation.parameters ?? []) as unknown[]),
  ]) {
    const parameter = resolve(spec, raw);
    if (
      (parameter.in === "path" || parameter.in === "query") &&
      typeof parameter.name === "string"
    ) {
      merged.set(`${parameter.in}:${parameter.name}`, parameter);
    }
  }
  const params = [...merged.values()].map((parameter) =>
    toParam(spec, parameter.name as string, parameter.in as "path" | "query", parameter.schema, {
      description: parameter.description,
      required: parameter.required === true,
      explode: parameter.explode,
    }),
  );
  const body = resolve(spec, operation.requestBody);
  const content = (body.content ?? {}) as Record<string, Json>;
  const media =
    content["application/json"] ??
    content["application/x-www-form-urlencoded"] ??
    Object.values(content)[0];
  if (media) {
    const { properties, required } = bodyProperties(spec, media.schema);
    const location = method === "get" ? "query" : "body";
    for (const [name, property] of properties) {
      if (params.some((param) => param.name === name)) continue;
      params.push(toParam(spec, name, location, property, { required: required.has(name) }));
    }
  }
  return params;
}

export function buildCatalog(spec: Json): EndpointCatalog {
  const endpoints: Record<string, Endpoint> = {};
  const excluded: Record<string, string> = {};
  for (const [path, rawItem] of Object.entries(spec.paths as Json)) {
    const pathItem = rawItem as Json;
    for (const method of METHODS) {
      const operation = pathItem[method] as Json | undefined;
      if (!operation) continue;
      const operationId =
        typeof operation.operationId === "string"
          ? operation.operationId
          : `${method.toUpperCase()} ${path}`;
      const scopes = ((operation.security ?? []) as Json[]).flatMap((entry) =>
        Object.values(entry).flatMap((value) => (Array.isArray(value) ? (value as string[]) : [])),
      );
      const description = typeof operation.description === "string" ? operation.description : "";
      const decision = decide({ operationId, method, path, description, scopes });
      if (!decision.allowed) {
        excluded[operationId] = `${method.toUpperCase()} ${path}: ${decision.reason}`;
        continue;
      }
      const endpoint: Endpoint = {
        method: method === "get" ? "GET" : "POST",
        path,
        summary: clean(operation.summary, 120) || operationId,
        scopes: [...new Set(scopes)],
        params: buildParams(spec, pathItem, operation, method),
      };
      const details = clean(description.replace(/Required scopes:.*/is, ""), 400);
      if (details && details !== endpoint.summary) endpoint.description = details;
      endpoints[operationId] = endpoint;
    }
  }
  const info = (spec.info ?? {}) as Json;
  const version = typeof info.version === "string" ? info.version : "unknown";
  return { version, endpoints, excluded };
}
