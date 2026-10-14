import { ERRORS, type JsonRpcMessage, type Transport } from "./server.ts";

export class StdioTransport implements Transport {
  readonly #input: NodeJS.ReadableStream;
  readonly #output: NodeJS.WritableStream;
  #buffer = "";
  onmessage?(message: unknown): void;
  onclose?(): void;
  onerror?(error: Error): void;

  constructor(
    input: NodeJS.ReadableStream = process.stdin,
    output: NodeJS.WritableStream = process.stdout,
  ) {
    this.#input = input;
    this.#output = output;
  }

  start(): Promise<void> {
    this.#input.setEncoding("utf8");
    this.#input.on("data", (chunk: string) => {
      this.#buffer += chunk;
      let newline = this.#buffer.indexOf("\n");
      while (newline >= 0) {
        const line = this.#buffer.slice(0, newline).trim();
        this.#buffer = this.#buffer.slice(newline + 1);
        if (line !== "") this.#receive(line);
        newline = this.#buffer.indexOf("\n");
      }
    });
    this.#input.on("end", () => this.onclose?.());
    this.#input.on("error", (error: Error) => this.onerror?.(error));
    return Promise.resolve();
  }

  #receive(line: string): void {
    let message: unknown;
    try {
      message = JSON.parse(line);
    } catch {
      void this.send({ jsonrpc: "2.0", id: null, error: ERRORS.parse });
      return;
    }
    this.onmessage?.(message);
  }

  send(message: JsonRpcMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      this.#output.write(`${JSON.stringify(message)}\n`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  close(): Promise<void> {
    this.#input.pause();
    this.onclose?.();
    return Promise.resolve();
  }
}
