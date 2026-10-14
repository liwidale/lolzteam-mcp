export type ErrorCode =
  | "invalid_input"
  | "not_configured"
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limited"
  | "upstream_unavailable"
  | "timeout"
  | "network_error"
  | "invalid_response"
  | "cancelled"
  | "internal_error";

export interface ErrorDetails {
  status?: number;
  endpoint?: string;
  retryAfterSeconds?: number;
  apiMessages?: string[];
}

export class LolzteamError extends Error {
  readonly code: ErrorCode;
  readonly details: ErrorDetails;

  constructor(code: ErrorCode, message: string, details: ErrorDetails = {}) {
    super(message);
    this.name = "LolzteamError";
    this.code = code;
    this.details = details;
  }
}

export function invalidInput(message: string): LolzteamError {
  return new LolzteamError("invalid_input", message);
}
