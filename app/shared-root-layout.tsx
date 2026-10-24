import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
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
    <html lang={lang} className={`${inter.variable} ${crimson.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="text-[15px] leading-(--leading-body) text-zinc-900 antialiased dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
