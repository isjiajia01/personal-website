import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import HalftoneBackground from "@/components/halftone-background";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

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
    <html lang={lang} className={inter.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="text-[15px] leading-(--leading-body) text-zinc-900 antialiased dark:text-zinc-100">
        <HalftoneBackground />
        {children}
      </body>
    </html>
  );
}
