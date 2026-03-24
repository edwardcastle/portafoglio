import "server-only";

import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () =>
    import("@/dictionaries/en.json").then((m) => m.default as Dictionary),
  it: () =>
    import("@/dictionaries/it.json").then((m) => m.default as Dictionary),
  es: () =>
    import("@/dictionaries/es.json").then((m) => m.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
