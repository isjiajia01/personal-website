"use client";

import { useEffect, useRef, useState } from "react";

// Top ruler measuring the text column in `ch` units (design idea: glenn.me).
// Drag the red index to resize the reading measure; the choice is remembered.
const MIN = 40;
const MAX = 80;
const KEY = "jj-measure-ch";

export function CharRuler() {
  const [ch, setCh] = useState(MAX);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(KEY));
      if (saved >= MIN && saved <= MAX) setCh(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--measure", `${ch}ch`);
    try {
      localStorage.setItem(KEY, String(ch));
    } catch {}
  }, [ch]);

  const onDown = (e: React.PointerEvent) => {
    const el = track.current;
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const unit = el.getBoundingClientRect().width / MAX;
    const left = el.getBoundingClientRect().left;
    const move = (ev: PointerEvent) =>
      setCh(Math.max(MIN, Math.min(MAX, Math.round((ev.clientX - left) / unit))));
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const ticks = Array.from({ length: MAX + 1 }, (_, n) => n);
  return (
    <div className="ch-ruler print:hidden" aria-hidden="true" onPointerDown={onDown}>
      <div className="ch-ruler-scale">
        <div className="ch-ruler-track" ref={track}>
          {ticks.map((n) => (
            <span
              key={n}
              className={n % 10 === 0 ? "ch-ruler-tick ch-ruler-tick-major" : "ch-ruler-tick"}
              style={{ ["--n" as string]: n }}
            >
              {n % 10 === 0 && <span className="ch-ruler-num">{n}</span>}
            </span>
          ))}
          <span className="ch-ruler-index" style={{ ["--at" as string]: `${ch}ch` }} />
        </div>
      </div>
    </div>
  );
}
