import "server-only";
import { notFound } from "next/navigation";
const dictionaries = {
  en: () => import("./en.ts").then((module) => module.default),
  zh: () => import("./zh.ts").then((module) => module.default),
};

export const languageLabels = {
  en: "English",
  zh: "中文",
};

export type Dictionary = Awaited<
  ReturnType<(typeof dictionaries)[keyof typeof dictionaries]>
>;

export type Language = keyof typeof languageLabels;

export const defaultLanguage: Language = "en";
export const dictionaryKeys = Object.keys(dictionaries) as Language[];

export async function getDictionary(locale: string = defaultLanguage) {
  if (!(locale in dictionaries)) {
    notFound();
  }

  return dictionaries[locale as keyof typeof dictionaries]();
}
