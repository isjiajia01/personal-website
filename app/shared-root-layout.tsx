import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { CustomCursor } from "../components/custom-cursor";
import { ContourBackground } from "../components/contour-background";
import "../styles/globals.css";

const allo = localFont({
  src: [
    { path: "../node_modules/allo-font/fonts/webfonts/AlloVariable.woff2", weight: "100 900", style: "normal" },
    { path: "../node_modules/allo-font/fonts/webfonts/Allo-Oblique.woff2", weight: "400", style: "italic" },
    { path: "../node_modules/allo-font/fonts/webfonts/Allo-MediumOblique.woff2", weight: "500", style: "italic" },
    { path: "../node_modules/allo-font/fonts/webfonts/Allo-SemiBoldOblique.woff2", weight: "600", style: "italic" },
  ],
  display: "swap",
  variable: "--font-allo",
});
const crimson = Crimson_Pro({ subsets: ["latin"], display: "swap", variable: "--font-crimson" });

export const metadata: Metadata = {
  title: "Jiajia Zhang",
  description:
    "Junior product/full-stack candidate for internal tools and workflow systems.",
};

export function SharedRootLayout({
  children,
  lang,
}: {
  children: ReactNode;
  lang: "en" | "zh-Hans";
}) {
  return (
    <html lang={lang} className={`${allo.variable} ${crimson.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- self-hosted CJK font chunks */}
        <link rel="stylesheet" href="/fonts/wenyuan/result.css" />
      </head>
      <body className="text-[15px] leading-(--leading-body) text-zinc-900 antialiased dark:text-zinc-100">
        <ContourBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
