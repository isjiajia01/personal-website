"use client";

import { useEffect, useRef, useState } from "react";

interface OrgLinkProps {
  id: string;
  name: string;
  href: string;
  description: string;
  opensInNewTab?: string;
}

export function OrgLink({
  id,
  name,
  href,
  description,
  opensInNewTab = "(opens in a new tab)",
}: OrgLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const tooltipId = `tooltip-${id}`;

  const show = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const hide = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = null;
    }, 100);
  };

  const hideImmediate = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hideImmediate();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  return (
    <span className="relative inline">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={isOpen ? tooltipId : undefined}
        onPointerEnter={show}
        onPointerLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100"
      >
        {name}
        <span aria-hidden="true" className="ml-0.5 inline-block">
          ↗
        </span>
        <span className="sr-only"> {opensInNewTab}</span>
      </a>
      <span
        id={tooltipId}
        role="tooltip"
        onPointerEnter={show}
        onPointerLeave={hide}
        className={`absolute bottom-full left-0 z-20 mb-2 w-64 rounded-md border border-zinc-200 bg-white p-3 text-[13px] leading-5 text-zinc-600 shadow-sm transition-opacity duration-150 motion-reduce:transition-none dark:border-zinc-800 dark:bg-[#18181b] dark:text-zinc-400 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {description}
      </span>
    </span>
  );
}
