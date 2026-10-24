import type { Metadata } from "next";
import { sharePreview } from "@/lib/share-preview";
import Home from "../[lang]/page";
import { defaultLanguage } from "../../dictionaries";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    url: "https://me.isjia.page/",
    title: "Jiajia Zhang",
    description:
      "Junior product/full-stack candidate for internal tools and workflow systems. Five Apple apps shipped to the App Store.",
    ...sharePreview("home"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiajia Zhang",
    description:
      "Junior product/full-stack candidate for internal tools and workflow systems.",
    site: "@jjmakesapps",
    ...sharePreview("home"),
  },
};

export default function RootPage() {
  return <Home params={Promise.resolve({ lang: defaultLanguage })} />;
}
