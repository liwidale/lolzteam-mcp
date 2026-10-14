export type QueryScalar = string | number | boolean;

export type QueryValue =
  QueryScalar | readonly QueryScalar[] | Readonly<Record<string, QueryScalar>> | undefined;

export type Query = Readonly<Record<string, QueryValue>>;

function encodeScalar(value: QueryScalar): string {
  if (typeof value === "boolean") return value ? "1" : "0";
  return String(value);
}

export function buildQuery(query: Query): URLSearchParams {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value as readonly QueryScalar[]) params.append(name, encodeScalar(item));
    } else if (typeof value === "object") {
      for (const [key, item] of Object.entries(value)) {
        params.append(`${name}[${key}]`, encodeScalar(item));
      }
    } else {
      params.append(name, encodeScalar(value));
    }
  }
  return params;
}
