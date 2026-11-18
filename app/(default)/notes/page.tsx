import type { Metadata } from "next";
import Link from "next/link";

const url = "https://me.isjia.page/notes/";
const description = "Short notes on things I tried and what I took from them.";

const ogImage = { url: "https://me.isjia.page/og/home-en-v1.png", width: 1200, height: 630, alt: "Notes" };

export const metadata: Metadata = {
  title: "Notes",
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", url, title: "Notes", description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Notes", description, images: [ogImage] },
};

const notes = [
  {
    href: "/notes/opsdesk-where-automation-stops/",
    date: "Nov 2026",
    title: "OpsDesk: where automation should stop",
    summary:
      "A support case can end with no draft at all. Why OpsDesk treats that as a safe outcome, and what the run trace and gates show.",
  },
  {
    href: "/notes/claude-code-workshop/",
    date: "Nov 2026",
    title: "Claude Code workshop notes",
    summary:
      "A one-day workshop building an X clone from written stories: a board that moves by itself, QA videos as evidence, and a person who accepts the work.",
  },
];

export default function NotesIndex() {
  return (
    <div>
      <h1 className="page-title text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        Notes
      </h1>
      <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <ul className="rise-own mt-10 -mx-3 space-y-1">
        {notes.map((n, index) => (
          <li
            key={n.href}
            className="rise"
            style={{ "--i": 2 + index } as React.CSSProperties}
          >
            <Link
              href={n.href}
              className="work-row group block rounded-md px-3 py-3 hover:bg-stone-50 dark:hover:bg-zinc-800/60"
            >
              <span className="flex items-baseline gap-3">
                <span className="work-title project-title text-stone-800 dark:text-zinc-100">
                  {n.title}
                  <span
                    aria-hidden="true"
                    className="link-arrow ml-1 text-[0.7em] text-stone-400 dark:text-zinc-500"
                  >
                    →
                  </span>
                </span>
                <span className="leader" aria-hidden="true" />
                <span className="shrink-0 whitespace-nowrap text-[14px] tabular-nums text-stone-500 dark:text-zinc-400">
                  {n.date}
                </span>
              </span>
              <span className="mt-1 block text-[14px] leading-6 text-stone-500 dark:text-zinc-400">
                {n.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
