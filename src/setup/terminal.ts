import { createInterface } from "node:readline/promises";

export interface Terminal {
  interactive: boolean;
  write(line: string): void;
  ask(question: string): Promise<string>;
  askSecret(question: string): Promise<string>;
}

export class SetupCancelled extends Error {
  constructor() {
    super("Setup cancelled");
    this.name = "SetupCancelled";
  }
}

const ENTER = new Set(["\r", "\n"]);
const CTRL_C = String.fromCharCode(3);
const CTRL_D = String.fromCharCode(4);
const BACKSPACE = new Set([String.fromCharCode(8), String.fromCharCode(127)]);

function readHidden(input: NodeJS.ReadStream, output: NodeJS.WriteStream): Promise<string> {
  return new Promise((resolve, reject) => {
    let value = "";
    const finish = () => {
      input.off("data", onData);
      input.setRawMode(false);
      input.pause();
      output.write("\n");
    };
    const onData = (chunk: string) => {
      for (const char of chunk) {
        if (ENTER.has(char)) {
          finish();
          resolve(value);
          return;
        }
        if (char === CTRL_C || char === CTRL_D) {
          finish();
          reject(new SetupCancelled());
          return;
        }
        if (BACKSPACE.has(char)) value = value.slice(0, -1);
        else if (char >= " ") value += char;
      }
    };
    input.setRawMode(true);
    input.setEncoding("utf8");
    input.resume();
    input.on("data", onData);
  });
}

export function createTerminal(
  input: NodeJS.ReadStream = process.stdin,
  output: NodeJS.WriteStream = process.stdout,
): Terminal {
  const ask = async (question: string) => {
    const reader = createInterface({ input, output });
    try {
      return (await reader.question(question)).trim();
    } catch {
      throw new SetupCancelled();
    } finally {
      reader.close();
    }
  };
  return {
    interactive: input.isTTY,
    write: (line) => output.write(`${line}\n`),
    ask,
    askSecret: async (question) => {
      if (!input.isTTY) return ask(question);
      output.write(question);
      return (await readHidden(input, output)).trim();
    },
  };
}
