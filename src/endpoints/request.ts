import { invalidInput } from "../errors.ts";
import type { JsonObject } from "../http/client.ts";
import type { Query, QueryScalar, QueryValue } from "../http/query.ts";
import { forumCatalog } from "./forum.generated.ts";
import { marketCatalog } from "./market.generated.ts";
import type { Endpoint, EndpointCatalog, EndpointParam } from "./types.ts";

export const CATALOGS: Readonly<Record<"forum" | "market", EndpointCatalog>> = {
  forum: forumCatalog,
  market: marketCatalog,
};

export type Service = keyof typeof CATALOGS;

export type ParamValue =
  string | number | boolean | (string | number)[] | Record<string, string | number>;

export interface BuiltRequest {
  path: string;
  query: Query;
  body?: JsonObject;
}

const PATH_SEGMENT = /^[\w.-]{1,100}$/;

export function findEndpoint(service: Service, operation: string): [string, Endpoint] {
  const { endpoints, excluded } = CATALOGS[service];
  const exact = endpoints[operation];
  if (exact) return [operation, exact];
  const match = Object.keys(endpoints).find((id) => id.toLowerCase() === operation.toLowerCase());
  const found = match === undefined ? undefined : endpoints[match];
  if (match !== undefined && found) return [match, found];
  const blocked = Object.keys(excluded).find((id) => id.toLowerCase() === operation.toLowerCase());
  if (blocked !== undefined) {
    throw invalidInput(
      `${blocked} is not available: it is excluded by the read-only policy (${excluded[blocked] ?? ""}).`,
    );
  }
  throw invalidInput(
    `Unknown ${service} operation "${operation}". Call api_list_endpoints to see the available operations.`,
  );
}

export function findParam(endpoint: Endpoint, name: string): EndpointParam | undefined {
  return (
    endpoint.params.find((param) => param.name === name) ??
    endpoint.params.find((param) => param.name === `${name}[]`)
  );
}

function checkScalar(param: EndpointParam, kind: string | undefined, value: unknown): QueryScalar {
  const label = `Parameter "${param.name}"`;
  if (kind === "boolean") {
    if (typeof value !== "boolean") throw invalidInput(`${label} expects true or false.`);
    return value;
  }
  if (kind === "integer" || kind === "number") {
    const numeric = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
    if (typeof numeric !== "number" || !Number.isFinite(numeric)) {
      throw invalidInput(`${label} expects a number.`);
    }
    if (kind === "integer" && !Number.isInteger(numeric)) {
      throw invalidInput(`${label} expects a whole number.`);
    }
    if (param.values && !param.values.map(Number).includes(numeric)) {
      throw invalidInput(`${label} must be one of: ${param.values.join(", ")}.`);
    }
    return numeric;
  }
  if (typeof value !== "string" && typeof value !== "number") {
    throw invalidInput(`${label} expects text.`);
  }
  const text = String(value);
  if (text.length > 500) throw invalidInput(`${label} is too long.`);
  if (param.values && !param.values.map(String).includes(text)) {
    throw invalidInput(`${label} must be one of: ${param.values.join(", ")}.`);
  }
  return text;
}

function toValue(param: EndpointParam, value: ParamValue): QueryValue {
  if (param.type === "array") {
    const list = Array.isArray(value) ? value : [value];
    if (list.length === 0 || list.length > 250) {
      throw invalidInput(`Parameter "${param.name}" expects between 1 and 250 values.`);
    }
    const checked = list.map((item) => checkScalar(param, param.items, item));
    return param.csv ? checked.join(",") : checked;
  }
  if (param.type === "object") {
    if (typeof value !== "object" || Array.isArray(value)) {
      throw invalidInput(`Parameter "${param.name}" expects an object such as {"730": 100}.`);
    }
    const entries = Object.entries(value);
    if (entries.length === 0 || entries.length > 50) {
      throw invalidInput(`Parameter "${param.name}" expects between 1 and 50 keys.`);
    }
    return Object.fromEntries(
      entries.map(([key, item]) => {
        if (!/^[\w .:-]{1,100}$/.test(key)) {
          throw invalidInput(`Parameter "${param.name}" has an invalid key "${key}".`);
        }
        return [key, checkScalar(param, param.items, item)];
      }),
    );
  }
  if (Array.isArray(value) || typeof value === "object") {
    throw invalidInput(`Parameter "${param.name}" expects a single value.`);
  }
  return checkScalar(param, param.type, value);
}

export function buildRequest(
  endpoint: Endpoint,
  values: Readonly<Record<string, ParamValue>>,
  unknownHint = "Call api_describe_endpoint to see the supported parameters.",
): BuiltRequest {
  const query: Record<string, QueryValue> = {};
  const body: JsonObject = {};
  let path = endpoint.path;
  const given = new Set<string>();

  for (const [name, value] of Object.entries(values)) {
    const param = findParam(endpoint, name);
    if (!param) throw invalidInput(`Unknown parameter "${name}". ${unknownHint}`);
    given.add(param.name);
    const checked = toValue(param, value);
    if (param.in === "path") {
      const segment =
        typeof checked === "string" || typeof checked === "number" ? String(checked) : "";
      if (!PATH_SEGMENT.test(segment) || segment.includes("..")) {
        throw invalidInput(`Parameter "${param.name}" must be an ID such as 123 or me.`);
      }
      path = path.replace(`{${param.name}}`, encodeURIComponent(segment));
    } else if (param.in === "body") {
      body[param.name] = checked;
    } else {
      query[param.name] = checked;
    }
  }

  const missing = endpoint.params.filter((param) => param.required && !given.has(param.name));
  if (missing.length > 0) {
    throw invalidInput(
      `Missing required parameters: ${missing.map((param) => param.name).join(", ")}.`,
    );
  }
  return endpoint.method === "POST" ? { path, query, body } : { path, query };
}
