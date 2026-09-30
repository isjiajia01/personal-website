import "server-only";

const dictionaries = {
  en: () => import("./en.ts").then((module) => module.default),
  zh: () => import("./zh.ts").then((module) => module.default),
};

export const languageLabels = {
  en: "English",
  zh: "中文",
};
export interface ProjectImage {
  src: string;
  srcSmall: string;
  width: number;
  height: number;
  alt: string;
}

export interface WorkItem {
  name: string;
  summary: string;
  roleFit: string;
  evidence: string[];
  stack: string[];
  link: string;
  color: string;
  primary: boolean;
  homeFeatured: boolean;
  domain?: string;
  image?: ProjectImage;
}


export type Dictionary = Awaited<
  ReturnType<(typeof dictionaries)[keyof typeof dictionaries]>
>;

export type Language = keyof typeof languageLabels;

export const defaultLanguage: Language = "en";
export const dictionaryKeys = Object.keys(dictionaries) as Language[];

export async function getDictionary(locale: string = defaultLanguage) {
  if (!(locale in dictionaries)) {
    throw new Error(`Dictionary for locale '${locale}' not found.`);
  }

  return dictionaries[locale as keyof typeof dictionaries]();
}
