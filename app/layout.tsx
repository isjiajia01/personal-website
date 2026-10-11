import type { Metadata } from "next";
import "../styles/globals.css";
import HalftoneBackground from "@/components/halftone-background";

export const metadata: Metadata = {
  title: "Jiajia Zhang",
  description:
    "Junior product/full-stack candidate for internal tools and workflow systems.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-[15px] leading-7 text-zinc-900 antialiased dark:text-zinc-100">
        <HalftoneBackground />
        {children}
      </body>
    </html>
  );
}
