import type { Language } from "@/dictionaries";

type SharePage = "home" | "works" | "resume" | "about" | "afgang";

// Explicit metadata on each route: Next replaces nested OG metadata rather than merging it.
export function sharePreview(page: SharePage, lang: Language = "en") {
  const image = {
    url: `https://me.isjia.page/og/${page}-${lang}-v1.png`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: `${page === "afgang" ? "Afgang — " : ""}Jiajia Zhang · ${
      lang === "zh" ? "内部工具与流程自动化" : "Practical tools. Thoughtful systems."
    }`,
  };
  return { images: [image] };
}
