"use client";

import { useState } from "react";

export function DemoTabs({ demo, code, filename }: { demo: React.ReactNode; code: string; filename: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const tabClass = (active: boolean) =>
    `px-3 py-2 text-[13px] border-b-2 -mb-px transition-colors duration-150 ${
      active
        ? "border-rose-700 text-stone-900 dark:border-rose-400 dark:text-zinc-100"
        : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400 dark:hover:text-zinc-100"
    }`;

  return (
    <div>
      <div role="tablist" className="flex items-center border-b border-stone-200 dark:border-zinc-700">
        <button role="tab" aria-selected={tab === "preview"} className={tabClass(tab === "preview")} onClick={() => setTab("preview")}>
          Preview
        </button>
        <button role="tab" aria-selected={tab === "code"} className={tabClass(tab === "code")} onClick={() => setTab("code")}>
          Code
        </button>
        {tab === "code" && (
          <button
            className="ml-auto px-2 py-2 text-[12px] text-stone-500 hover:text-rose-700 dark:text-zinc-400 dark:hover:text-rose-400"
            onClick={async () => {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      <div className="mt-4">
        {tab === "preview" ? (
          demo
        ) : (
          <div>
            <p className="mb-2 font-mono text-[12px] text-stone-500 dark:text-zinc-400">{filename}</p>
            <pre className="max-h-[480px] overflow-auto rounded-md bg-stone-50 p-4 text-[12px] leading-5 text-stone-700 dark:bg-zinc-900 dark:text-zinc-300">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
