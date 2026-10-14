import { messages } from "./i18n/index.ts";

type Kind = "string" | "number" | "boolean" | "enum" | "union" | "array" | "record";
type Scalar = string | number;

export type JsonSchema = Record<string, unknown>;

export interface Issue {
  path: string;
  message: string;
}

interface Spec {
  kind: Kind;
  trim?: boolean;
  integer?: boolean;
  positive?: boolean;
  min?: number;
  max?: number;
  values?: readonly Scalar[];
  options?: readonly Schema<unknown>[];
  item?: Schema<unknown>;
  key?: Schema<unknown>;
  value?: Schema<unknown>;
  optional?: boolean;
  fallback?: { value: unknown };
  description?: string;
}

const INVALID = Symbol("invalid");

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function compactJson(schema: JsonSchema): JsonSchema {
  return Object.fromEntries(Object.entries(schema).filter(([, value]) => value !== undefined));
}

export class Schema<T> {
  declare readonly output: T;
  readonly spec: Readonly<Spec>;

  constructor(spec: Spec) {
    this.spec = spec;
  }

  #with<U = T>(patch: Partial<Spec>): Schema<U> {
    return new Schema<U>({ ...this.spec, ...patch });
  }

  trim(): Schema<T> {
    return this.#with({ trim: true });
  }

  int(): Schema<T> {
    return this.#with({ integer: true });
  }

  positive(): Schema<T> {
    return this.#with({ positive: true });
  }

  min(min: number): Schema<T> {
    return this.#with({ min });
  }

  max(max: number): Schema<T> {
    return this.#with({ max });
  }

  optional(): Schema<T | undefined> {
    return this.#with<T | undefined>({ optional: true });
  }

  default(value: T): Schema<T> {
    return this.#with({ fallback: { value } });
  }

  describe(description: string): Schema<T> {
    return this.#with({ description });
  }

  get required(): boolean {
    return !this.spec.optional && this.spec.fallback === undefined;
  }

  check(value: unknown, path: string, issues: Issue[]): unknown {
    const { spec } = this;
    const text = messages.schema;
    const fail = (message: string) => {
      issues.push({ path, message });
      return INVALID;
    };
    if (value === undefined) {
      if (spec.fallback) return structuredClone(spec.fallback.value);
      if (spec.optional) return undefined;
      return fail(text.required);
    }
    switch (spec.kind) {
      case "string": {
        if (typeof value !== "string") return fail(text.expectedString);
        const result = spec.trim ? value.trim() : value;
        if (spec.min !== undefined && result.length < spec.min)
          return fail(text.minLength(spec.min));
        if (spec.max !== undefined && result.length > spec.max)
          return fail(text.maxLength(spec.max));
        return result;
      }
      case "number": {
        if (typeof value !== "number" || !Number.isFinite(value)) return fail(text.expectedNumber);
        if (spec.integer && !Number.isSafeInteger(value)) return fail(text.expectedInteger);
        if (spec.positive && value <= 0) return fail(text.positive);
        if (spec.min !== undefined && value < spec.min) return fail(text.minimum(spec.min));
        if (spec.max !== undefined && value > spec.max) return fail(text.maximum(spec.max));
        return value;
      }
      case "boolean":
        return typeof value === "boolean" ? value : fail(text.expectedBoolean);
      case "enum":
        return (spec.values ?? []).includes(value as Scalar)
          ? value
          : fail(text.oneOf((spec.values ?? []).join(", ")));
      case "union": {
        for (const option of spec.options ?? []) {
          const result = option.check(value, path, []);
          if (result !== INVALID) return result;
        }
        return fail(text.unsupported);
      }
      case "array": {
        if (!Array.isArray(value)) return fail(text.expectedArray);
        if (spec.min !== undefined && value.length < spec.min) return fail(text.minItems(spec.min));
        if (spec.max !== undefined && value.length > spec.max) return fail(text.maxItems(spec.max));
        const items = value.map((item, index) =>
          spec.item?.check(item, `${path}[${index}]`, issues),
        );
        return items.includes(INVALID) ? INVALID : items;
      }
      case "record": {
        if (!isPlainObject(value)) return fail(text.expectedObject);
        const result: Record<string, unknown> = {};
        let valid = true;
        for (const [key, item] of Object.entries(value)) {
          const itemPath = path ? `${path}.${key}` : key;
          const checkedKey = spec.key?.check(key, itemPath, issues);
          const checked = spec.value?.check(item, itemPath, issues);
          if (checkedKey === INVALID || checked === INVALID) valid = false;
          else result[key] = checked;
        }
        return valid ? result : INVALID;
      }
    }
  }

  toJson(): JsonSchema {
    const { spec } = this;
    const common = {
      description: spec.description,
      default: spec.fallback?.value,
    };
    switch (spec.kind) {
      case "string":
        return compactJson({
          type: "string",
          minLength: spec.min,
          maxLength: spec.max,
          ...common,
        });
      case "number":
        return compactJson({
          type: spec.integer ? "integer" : "number",
          exclusiveMinimum: spec.positive ? 0 : undefined,
          minimum:
            spec.min ?? (spec.integer && !spec.positive ? Number.MIN_SAFE_INTEGER : undefined),
          maximum: spec.max ?? (spec.integer ? Number.MAX_SAFE_INTEGER : undefined),
          ...common,
        });
      case "boolean":
        return compactJson({ type: "boolean", ...common });
      case "enum": {
        const values = spec.values ?? [];
        return compactJson({
          type: typeof values[0] === "number" ? "number" : "string",
          ...(values.length === 1 ? { const: values[0] } : { enum: values }),
          ...common,
        });
      }
      case "union":
        return compactJson({
          anyOf: (spec.options ?? []).map((option) => option.toJson()),
          ...common,
        });
      case "array":
        return compactJson({
          type: "array",
          items: spec.item?.toJson(),
          minItems: spec.min,
          maxItems: spec.max,
          ...common,
        });
      case "record":
        return compactJson({
          type: "object",
          propertyNames: spec.key?.toJson(),
          additionalProperties: spec.value?.toJson(),
          ...common,
        });
    }
  }
}

export type Infer<S> = S extends Schema<infer T> ? T : never;
export type Shape = Readonly<Record<string, Schema<unknown>>>;
export type InferShape<S extends Shape> = { [K in keyof S]: Infer<S[K]> };

export type ParseResult<T> = { ok: true; value: T } | { ok: false; issues: Issue[] };

export function parseShape<S extends Shape>(shape: S, input: unknown): ParseResult<InferShape<S>> {
  const issues: Issue[] = [];
  if (input !== undefined && !isPlainObject(input)) {
    return { ok: false, issues: [{ path: "", message: messages.schema.expectedObject }] };
  }
  const source = input ?? {};
  const value: Record<string, unknown> = {};
  for (const [key, schema] of Object.entries(shape)) {
    const checked = schema.check(source[key], key, issues);
    if (checked !== INVALID && checked !== undefined) value[key] = checked;
  }
  return issues.length > 0 ? { ok: false, issues } : { ok: true, value: value as InferShape<S> };
}

export function shapeToJson(shape: Shape): JsonSchema {
  const required = Object.entries(shape)
    .filter(([, schema]) => schema.required)
    .map(([key]) => key);
  return compactJson({
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: Object.fromEntries(
      Object.entries(shape).map(([key, schema]) => [key, schema.toJson()]),
    ),
    required: required.length > 0 ? required : undefined,
  });
}

export const s = {
  string: () => new Schema<string>({ kind: "string" }),
  number: () => new Schema<number>({ kind: "number" }),
  boolean: () => new Schema<boolean>({ kind: "boolean" }),
  enum: <const V extends readonly Scalar[]>(values: V) =>
    new Schema<V[number]>({ kind: "enum", values }),
  literal: <const V extends Scalar | readonly Scalar[]>(value: V) =>
    new Schema<V extends readonly Scalar[] ? V[number] : V>({
      kind: "enum",
      values: Array.isArray(value) ? value : [value as Scalar],
    }),
  union: <const O extends readonly Schema<unknown>[]>(options: O) =>
    new Schema<Infer<O[number]>>({ kind: "union", options }),
  array: <T>(item: Schema<T>) => new Schema<T[]>({ kind: "array", item }),
  record: <V>(key: Schema<string>, value: Schema<V>) =>
    new Schema<Record<string, V>>({ kind: "record", key, value }),
};
