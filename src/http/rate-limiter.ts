export interface RateLimit {
  limit: number;
  windowMs: number;
}

export class RateLimiter {
  readonly #limit: number;
  readonly #windowMs: number;
  #timestamps: number[] = [];
  #blockedUntil = 0;

  constructor({ limit, windowMs }: RateLimit) {
    this.#limit = limit;
    this.#windowMs = windowMs;
  }

  waitTime(now: number): number {
    this.#timestamps = this.#timestamps.filter((time) => now - time < this.#windowMs);
    const blockWait = Math.max(0, this.#blockedUntil - now);
    const oldest = this.#timestamps[0];
    const windowWait =
      this.#timestamps.length >= this.#limit && oldest !== undefined
        ? oldest + this.#windowMs - now
        : 0;
    return Math.max(blockWait, windowWait);
  }

  reserve(now: number): void {
    this.#timestamps.push(now);
  }

  blockUntil(time: number): void {
    this.#blockedUntil = Math.max(this.#blockedUntil, time);
  }
}
