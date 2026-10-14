import { invalidInput } from "../errors.ts";
import type { JsonObject } from "../http/client.ts";
import type { Query, QueryScalar, QueryValue } from "../http/query.ts";
import { messages } from "../i18n/index.ts";
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
    throw invalidInput(messages.validation.excludedOperation(blocked, excluded[blocked] ?? ""));
  }
  throw invalidInput(messages.validation.unknownOperation(service, operation));
}

export function findParam(endpoint: Endpoint, name: string): EndpointParam | undefined {
  return (
    endpoint.params.find((param) => param.name === name) ??
    endpoint.params.find((param) => param.name === `${name}[]`)
  );
}

function checkScalar(param: EndpointParam, kind: string | undefined, value: unknown): QueryScalar {
  if (kind === "boolean") {
    if (typeof value !== "boolean")
      throw invalidInput(messages.validation.expectsBoolean(param.name));
    return value;
  }
  if (kind === "integer" || kind === "number") {
    const numeric = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
    if (typeof numeric !== "number" || !Number.isFinite(numeric)) {
      throw invalidInput(messages.validation.expectsNumber(param.name));
    }
    if (kind === "integer" && !Number.isInteger(numeric)) {
      throw invalidInput(messages.validation.expectsInteger(param.name));
    }
    if (param.values && !param.values.map(Number).includes(numeric)) {
      throw invalidInput(messages.validation.oneOf(param.name, param.values.join(", ")));
    }
    return numeric;
  }
  if (typeof value !== "string" && typeof value !== "number") {
    throw invalidInput(messages.validation.expectsText(param.name));
  }
  const text = String(value);
  if (text.length > 500) throw invalidInput(messages.validation.tooLong(param.name));
  if (param.values && !param.values.map(String).includes(text)) {
    throw invalidInput(messages.validation.oneOf(param.name, param.values.join(", ")));
  }
  return text;
}

function toValue(param: EndpointParam, value: ParamValue): QueryValue {
  if (param.type === "array") {
    const list = Array.isArray(value) ? value : [value];
    if (list.length === 0 || list.length > 250) {
      throw invalidInput(messages.validation.listSize(param.name, 250));
    }
    const checked = list.map((item) => checkScalar(param, param.items, item));
    return param.csv ? checked.join(",") : checked;
  }
  if (param.type === "object") {
    if (typeof value !== "object" || Array.isArray(value)) {
      throw invalidInput(messages.validation.expectsObject(param.name));
    }
    const entries = Object.entries(value);
    if (entries.length === 0 || entries.length > 50) {
      throw invalidInput(messages.validation.objectSize(param.name, 50));
    }
    return Object.fromEntries(
      entries.map(([key, item]) => {
        if (!/^[\w .:-]{1,100}$/.test(key)) {
          throw invalidInput(messages.validation.invalidKey(param.name, key));
        }
        return [key, checkScalar(param, param.items, item)];
      }),
    );
  }
  if (Array.isArray(value) || typeof value === "object") {
    throw invalidInput(messages.validation.singleValue(param.name));
  }
  return checkScalar(param, param.type, value);
}

export function buildRequest(
  endpoint: Endpoint,
  values: Readonly<Record<string, ParamValue>>,
  unknownHint = messages.validation.describeHint,
): BuiltRequest {
  const query: Record<string, QueryValue> = {};
  const body: JsonObject = {};
  let path = endpoint.path;
  const given = new Set<string>();

  for (const [name, value] of Object.entries(values)) {
    const param = findParam(endpoint, name);
    if (!param) throw invalidInput(messages.validation.unknownParameter(name, unknownHint));
    given.add(param.name);
    const checked = toValue(param, value);
    if (param.in === "path") {
      const segment =
        typeof checked === "string" || typeof checked === "number" ? String(checked) : "";
      if (!PATH_SEGMENT.test(segment) || segment.includes("..")) {
        throw invalidInput(messages.validation.pathId(param.name));
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
      messages.validation.missingRequired(missing.map((param) => param.name).join(", ")),
    );
  }
  return endpoint.method === "POST" ? { path, query, body } : { path, query };
}
