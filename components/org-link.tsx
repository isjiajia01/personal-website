"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const [source, setSource] = useState<"pointer" | "focus">("pointer");
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const intentRef = useRef<number | null>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const tooltipId = `tooltip-${id}`;

  const clearTimers = () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    if (intentRef.current !== null) window.clearTimeout(intentRef.current);
    timeoutRef.current = null;
    intentRef.current = null;
  };

  const show = (nextSource: "pointer" | "focus") => {
    clearTimers();
    setSource(nextSource);
    setIsOpen(true);
  };

  const schedulePointerShow = () => {
    clearTimers();
    intentRef.current = window.setTimeout(() => show("pointer"), 120);
  };

  const cancelPointerIntent = () => {
    if (intentRef.current !== null) window.clearTimeout(intentRef.current);
    intentRef.current = null;
  };


  const hide = () => {
    cancelPointerIntent();
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = null;
    }, 100);
  };


  const hideImmediate = useCallback(() => {
    clearTimers();
    setIsOpen(false);
  }, []);


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
      clearTimers();
    };
  }, [isOpen, hideImmediate]);

  useLayoutEffect(() => {
    if (!anchorRef.current || !tooltipRef.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const tooltipWidth = tooltipRef.current.getBoundingClientRect().width;
    const maxLeft = window.innerWidth - 16 - tooltipWidth - anchorRect.left;
    setTooltipLeft(Math.min(0, maxLeft));
  }, [isOpen]);

  return (
    <span className="relative inline">
      <a
        ref={anchorRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={isOpen ? tooltipId : undefined}
        onPointerEnter={schedulePointerShow}
        onPointerLeave={cancelPointerIntent}
        onFocus={() => show("focus")}
        onBlur={hide}
        className="group underline decoration-zinc-400 underline-offset-[3px] hover:text-zinc-900 hover:decoration-zinc-900 dark:decoration-zinc-500 dark:hover:text-zinc-100 dark:hover:decoration-zinc-100"
      >
        {name}
        <span aria-hidden="true" className="ml-0.5 inline-block motion-safe:transition-transform motion-safe:duration-(--motion-link) motion-safe:ease-snap motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5">
          ↗
        </span>
        <span className="sr-only"> {opensInNewTab}</span>
      </a>
      <span
        ref={tooltipRef}
        style={{ left: `${tooltipLeft}px`, maxWidth: "calc(100vw - 2rem)" }}
        id={tooltipId}
        role="tooltip"
        onPointerEnter={() => show("pointer")}
        onPointerLeave={hide}
        className="org-tooltip absolute bottom-full z-20 mb-2 w-64 rounded-md border border-zinc-200 bg-white p-3 text-[13px] leading-5 text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-[#18181b] dark:text-zinc-400"
        data-state={isOpen ? "open" : "closed"}
        data-source={source}
      >
        {description}
      </span>
    </span>
  );
}
