import Link from "next/link";
import { getDictionary, defaultLanguage } from "@/dictionaries";

// ASCII printer with the sheet stuck halfway out. Decorative only.
const printer = String.raw`
        ┌──────────────┐
        │  4  0  4     │
        │  ──────────  │
        │  page not    │
        │  found       │
        └──┬────────┬──┘
   ╭───────┴────────┴───────╮
   │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ●   │
   │  ░░░░░░░░░░░░░░░░      │
   ╰──┬──────────────────┬──╯
      └──────────────────┘`;

export default async function NotFound() {
  const dictionary = await getDictionary(defaultLanguage);
  const { labels } = dictionary;

  return (
    <div className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <p className="font-mono text-[13px] leading-5 text-rose-700 dark:text-rose-400">
        {labels.notFoundError}
      </p>

      <pre
        aria-hidden="true"
        className="mt-6 select-none overflow-x-auto font-mono text-[12px] leading-[1.35] text-zinc-500 transition-transform duration-300 ease-out hover:-rotate-1 motion-reduce:transition-none motion-reduce:hover:rotate-0 dark:text-zinc-500 sm:text-[13px]"
      >
        {printer}
      </pre>

      <h1 className="page-title mt-8 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        {labels.notFoundTitle}
      </h1>
      <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
        {labels.notFoundSubtitle} The address may have moved, or it never existed. The sheet is
        stuck, so nothing was printed.
      </p>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] leading-5">
        {[
          { href: "/", label: labels.notFoundButton },
          { href: "/notes/claude-code-workshop/", label: "Notes" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
