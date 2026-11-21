import type { MetadataRoute } from "next";
import { dictionaryKeys } from "../dictionaries";

export const dynamic = "force-static";

const base = "https://me.isjia.page";

// Localised pages exist for every language key; English-only pages are listed once.
const localised = ["", "/projects/afgang", "/projects/opsdesk", "/projects/denmark-flex-planner", "/about"];
const englishOnly = ["/notes", "/notes/claude-code-workshop", "/notes/opsdesk-where-automation-stops", "/notes/afgang-data-lifecycle", "/wayfinder", "/lab", "/lab/dither-clouds"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...dictionaryKeys.flatMap((lang) => localised.map((p) => `/${lang}${p}`)),
    ...englishOnly,
  ];
  return paths.map((p) => ({ url: `${base}${p}${p.endsWith("/") ? "" : "/"}` }));
}
