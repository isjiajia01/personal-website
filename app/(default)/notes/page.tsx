import type { Metadata } from "next";
import Link from "next/link";

const url = "https://me.isjia.page/notes/";
const description = "Short notes on things I tried and what I took from them.";

export const metadata: Metadata = {
  title: "Notes",
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", url, title: "Notes", description },
  twitter: { card: "summary", title: "Notes", description },
};

const notes = [
  {
    href: "/notes/claude-code-workshop/",
    date: "18 November 2026",
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
      <ul className="mt-10 space-y-8">
        {notes.map((n) => (
          <li key={n.href}>
            <p className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">{n.date}</p>
            <h2 className="mt-1 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
              <Link
                href={n.href}
                className="underline decoration-zinc-400 underline-offset-[3px] hover:text-(--rose) dark:decoration-zinc-500"
              >
                {n.title}
              </Link>
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
              {n.summary}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
