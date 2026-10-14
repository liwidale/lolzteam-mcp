export type ParamType = "integer" | "number" | "string" | "boolean" | "array" | "object";

export interface EndpointParam {
  name: string;
  in: "path" | "query" | "body";
  type: ParamType;
  items?: "integer" | "number" | "string" | "boolean";
  values?: (string | number)[];
  valueCount?: number;
  required?: boolean;
  csv?: boolean;
  description: string;
}

export interface Endpoint {
  method: "GET" | "POST";
  path: string;
  summary: string;
  description?: string;
  scopes: string[];
  params: EndpointParam[];
}

export interface EndpointCatalog {
  version: string;
  endpoints: Record<string, Endpoint>;
  excluded: Record<string, string>;
}
