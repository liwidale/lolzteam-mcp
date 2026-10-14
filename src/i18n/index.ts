import { en, type Messages } from "./en.ts";
import { ru } from "./ru.ts";

export type { Messages, ToolName } from "./en.ts";

const CATALOGS: Readonly<Record<string, Messages>> = { en, ru };

export const LANGUAGES = Object.keys(CATALOGS);

export let messages: Messages = en;

export function setLocale(locale: string | undefined): string {
  const language = locale?.slice(0, 2).toLowerCase() ?? "en";
  const catalog = CATALOGS[language];
  messages = catalog ?? en;
  return catalog ? language : "en";
}
