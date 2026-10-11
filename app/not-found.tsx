import Link from "next/link";
import { getDictionary, defaultLanguage } from "@/dictionaries";

export default async function NotFound() {
  const dictionary = await getDictionary(defaultLanguage);

  return (
    <div className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <p className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-400">
        {dictionary.labels.notFoundError}
      </p>
      <h1 className="mt-2 text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
        {dictionary.labels.notFoundTitle}
      </h1>
      <p className="mt-2 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
        {dictionary.labels.notFoundSubtitle}
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="text-[13px] leading-5 underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
        >
          {dictionary.labels.notFoundButton}
        </Link>
      </div>
    </div>
  );
}
