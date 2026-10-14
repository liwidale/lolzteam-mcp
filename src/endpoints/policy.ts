export interface OperationFacts {
  operationId: string;
  method: string;
  path: string;
  description: string;
  scopes: string[];
}

export type Decision = { allowed: true } | { allowed: false; reason: string };

const READ_ONLY_NON_GET = new Set([
  "Search.All",
  "Search.Threads",
  "Search.Posts",
  "Search.Users",
  "Search.ProfilePosts",
  "Search.Tagged",
  "Managing.BulkGet",
]);

const PRIVATE_SCOPES = new Set(["conversate", "payment", "invoice"]);

const PRIVATE_OPERATIONS = new Set([
  "App.Get",
  "Users.Current",
  "Profile.Get",
  "Proxy.Get",
  "List.User",
  "List.Orders",
  "List.Download",
  "Managing.Image",
]);

const SECRET_PATH =
  /mafile|password|letters|email-code|guard-code|login-code|download|proxy|imap|oauth/i;
const SIDE_EFFECT_NOTE = /cancel|\u{2757}/iu;

export function decide(operation: OperationFacts): Decision {
  const method = operation.method.toUpperCase();
  if (method !== "GET" && !READ_ONLY_NON_GET.has(operation.operationId)) {
    return { allowed: false, reason: `${method} requests can change data` };
  }
  if (PRIVATE_OPERATIONS.has(operation.operationId)) {
    return { allowed: false, reason: "returns private account data or binary content" };
  }
  const scope = operation.scopes.find((name) => PRIVATE_SCOPES.has(name));
  if (scope !== undefined) {
    return { allowed: false, reason: `requires the private ${scope} scope` };
  }
  if (SECRET_PATH.test(operation.path)) {
    return { allowed: false, reason: "path points to credentials or account secrets" };
  }
  if (SIDE_EFFECT_NOTE.test(operation.description)) {
    return { allowed: false, reason: "documentation warns about side effects" };
  }
  return { allowed: true };
}
