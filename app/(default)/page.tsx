import type { Metadata } from "next";
import { sharePreview } from "@/lib/share-preview";
import Home from "../[lang]/page";
import { defaultLanguage } from "../../dictionaries";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    url: "https://me.isjia.page/",
    title: "Jiajia Zhang",
    description: "Practical tools and thoughtful systems. Copenhagen-based product-minded engineer.",
    ...sharePreview("home"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiajia Zhang",
    description: "Practical tools and thoughtful systems.",
    ...sharePreview("home"),
  },
};

export default function RootPage() {
  return <Home params={Promise.resolve({ lang: defaultLanguage })} />;
}
