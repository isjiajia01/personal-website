"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Stacked toasts. A new toast slides in from the right with a short motion blur;
// older ones step back (smaller, higher, fainter). Swipe left/right/down to dismiss.
// In a bento tile (paused is a boolean) it fires by itself; on the page you fire it.

const MESSAGES = [
  { kind: "ok", title: "Saved", note: "Your changes are live" },
  { kind: "info", title: "New message", note: "Anna sent you a file" },
  { kind: "warn", title: "Low storage", note: "92% of 5 GB used" },
  { kind: "ok", title: "Uploaded", note: "photo-014.jpg" },
  { kind: "info", title: "Reminder", note: "Standup in 10 minutes" },
] as const;

const ICON_BG = { ok: "#22a06b", info: "#3b82f6", warn: "#e5992a" } as const;
const MAX = 3;

type Toast = { id: number; msg: (typeof MESSAGES)[number]; out?: "left" | "right" | "down" };

function Icon({ kind }: { kind: keyof typeof ICON_BG }) {
  const d = kind === "ok" ? "M5 12.5l4.5 4.5L19 7.5" : kind === "info" ? "M12 11v6M12 7.5v.5" : "M12 7v6M12 16.5v.5";
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ background: ICON_BG[kind] }}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    </span>
  );
}

export function ToastDemo({ paused }: { paused?: boolean }) {
  const interactive = paused === undefined;
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const counter = useRef(0);
  const start = useRef<{ x: number; y: number } | null>(null);

  const fire = useCallback(() => {
    const n = counter.current++;
    setToasts((t) => [...t.filter((x) => !x.out).slice(-(MAX - 1)), { id: n, msg: MESSAGES[n % MESSAGES.length] }]);
  }, []);

  const dismiss = (id: number, out: Toast["out"]) => {
    setToasts((t) => t.map((x) => (x.id === id ? { ...x, out } : x)));
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 260);
  };

  // Tile: fire by itself while on screen. Page: one toast at load so it is never empty.
  useEffect(() => {
    if (interactive) {
      fire();
      return;
    }
    if (paused) return;
    fire();
    const id = setInterval(fire, 1700);
    return () => clearInterval(id);
  }, [interactive, paused, fire]);

  const live = toasts.filter((t) => !t.out);
  const frontId = live[live.length - 1]?.id;

  return (
    <div className={`toast-stage relative h-full w-full overflow-hidden bg-[#141416] ${interactive ? "min-h-[320px]" : ""}`}>
      <style>{`
        @keyframes toast-in { from { transform: translateX(110%) scale(1); filter: blur(6px); opacity: 0.4; } to { transform: translateX(0) scale(1); filter: blur(0); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .toast-card { animation: none !important; transition: none !important; } }
      `}</style>
      <div className={`absolute inset-x-0 mx-auto w-[min(78%,300px)] ${interactive ? "bottom-[22%]" : "bottom-[34%]"}`}>
        {toasts.map((t) => {
          const depth = live.length - 1 - live.findIndex((x) => x.id === t.id);
          const isFront = t.id === frontId;
          const dragging = isFront && drag;
          let transform = `translateY(${-depth * 12}px) scale(${1 - depth * 0.055})`;
          let opacity = depth === 0 ? 1 : 1 - depth * 0.3;
          if (t.out) {
            transform = t.out === "down" ? "translateY(90px) scale(1)" : `translateX(${t.out === "left" ? "-" : ""}120%)`;
            opacity = 0;
          } else if (dragging) {
            transform = `translate(${drag.x}px, ${Math.max(0, drag.y)}px)`;
          }
          return (
            <div
              key={t.id}
              data-cursor={interactive && isFront && !t.out ? "Swipe" : undefined}
              className="toast-card absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#222226] px-3.5 py-3 text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
              style={{
                transform,
                opacity,
                zIndex: 10 + (isFront ? 1 : 0) + (MAX - depth),
                touchAction: "none",
                transformOrigin: "50% 100%",
                transition: dragging ? "none" : "transform 380ms cubic-bezier(.23,1,.32,1), opacity 260ms ease",
                animation: depth === 0 && !t.out && !dragging ? "toast-in 420ms cubic-bezier(.23,1,.32,1) backwards" : undefined,
                cursor: interactive && isFront ? "grab" : undefined,
              }}
              onPointerDown={
                interactive && isFront && !t.out
                  ? (e) => {
                      start.current = { x: e.clientX, y: e.clientY };
                      e.currentTarget.setPointerCapture(e.pointerId);
                      setDrag({ x: 0, y: 0 });
                    }
                  : undefined
              }
              onPointerMove={
                interactive && isFront
                  ? (e) => start.current && setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y })
                  : undefined
              }
              onPointerUp={
                interactive && isFront
                  ? () => {
                      const d = drag;
                      start.current = null;
                      setDrag(null);
                      if (!d) return;
                      if (Math.abs(d.x) > 70) dismiss(t.id, d.x < 0 ? "left" : "right");
                      else if (d.y > 45) dismiss(t.id, "down");
                    }
                  : undefined
              }
              onPointerCancel={interactive ? () => { start.current = null; setDrag(null); } : undefined}
            >
              <Icon kind={t.msg.kind} />
              <span className="min-w-0 select-none">
                <span className="block text-[13px] font-medium leading-4">{t.msg.title}</span>
                <span className="block truncate text-[12px] leading-4 text-white/55">{t.msg.note}</span>
              </span>
            </div>
          );
        })}
      </div>
      {interactive && (
        <>
          <button
            onClick={fire}
            className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-[13px] text-white transition-[transform,background-color] duration-150 hover:bg-white/15 active:scale-[0.97]"
          >
            Fire toast
          </button>
          <p className="absolute inset-x-0 bottom-4 text-center text-[12px] text-white/40">Swipe left, right or down to dismiss</p>
        </>
      )}
    </div>
  );
}
