import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wayfinder",
  description: "Save, find and resume your tabs. A command palette, sessions and a calm new tab for Safari and Chrome.",
  alternates: {
    canonical: "https://me.zhangjiajia.me/wayfinder/",
  },
};

export default function WayfinderPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] px-5 py-12 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-400/80">
          Wayfinder
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Save, find and resume your tabs
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-white/70">
          Wayfinder turns your browser into a place you can pick up where you left off: a command palette for open tabs, saved pages and sessions, windows saved as tasks you can restore in order, and an optional calm new tab. Private by default, no account, no tracking.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link className="text-emerald-300 underline underline-offset-4" href="/wayfinder/support/">
            Support
          </Link>
          <Link className="text-emerald-300 underline underline-offset-4" href="/wayfinder/privacy/">
            Privacy Policy
          </Link>
          <Link className="text-white/65 underline underline-offset-4" href="/">
            Jiajia Zhang
          </Link>
        </div>
      </article>
    </main>
  );
}
