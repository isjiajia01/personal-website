"use client";

import { useEffect, useRef } from "react";

// Adaptive ink pointer (fine pointers only, skipped under prefers-reduced-motion).
// - default: a small dot pinned exactly to the pointer, no trailing. It inverts what is
//   under it (mix-blend difference), so it reads on paper, on night paper and on dark demos.
// - text: over actual glyphs it becomes a caret the height of the line, snapped to the line.
// - link: a soft rose disc behind the pointer, matching the rose link hover.
// - label: an element with data-cursor="Open" gets a small pill beside the pointer.
// - native: form fields and iframes keep the system cursor.
// Work happens in one rAF per pointer move or scroll; nothing runs while the mouse is still.

const INTERACTIVE = "a, button, summary, [role='button'], label, select";
const NATIVE = "input, textarea, [contenteditable='true'], iframe";
const MODES = ["text", "link", "label", "native"] as const;
type Mode = "default" | (typeof MODES)[number];

type CaretDoc = Document & {
  caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
  caretRangeFromPoint?: (x: number, y: number) => Range | null;
};

// The line box of the character under the pointer, or null when the pointer is over
// padding, margins or empty space rather than text.
function textLineAt(x: number, y: number): DOMRect | null {
  const doc = document as CaretDoc;
  let node: Node | null = null;
  let offset = 0;
  if (doc.caretPositionFromPoint) {
    const p = doc.caretPositionFromPoint(x, y);
    if (p) ({ offsetNode: node, offset } = p);
  } else if (doc.caretRangeFromPoint) {
    const r = doc.caretRangeFromPoint(x, y);
    if (r) [node, offset] = [r.startContainer, r.startOffset];
  }
  if (!node || node.nodeType !== Node.TEXT_NODE || !node.parentElement) return null;
  if (getComputedStyle(node.parentElement).userSelect === "none") return null;
  const len = (node as Text).length;
  const range = document.createRange();
  for (const [s, e] of [[offset, offset + 1], [offset - 1, offset]]) {
    if (s < 0 || e > len) continue;
    range.setStart(node, s);
    range.setEnd(node, e);
    for (const rect of Array.from(range.getClientRects())) {
      if (x >= rect.left - 2 && x <= rect.right + 2 && y >= rect.top && y <= rect.bottom) return rect;
    }
  }
  return null;
}

export function CustomCursor() {
  const inkRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ink = inkRef.current;
    const accent = accentRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;
    if (!ink || !accent || !dot || !labelEl) return;
    const root = document.documentElement;

    let active = false;
    let seen = false;
    let raf = 0;
    let tx = 0, ty = 0;
    let mode: Mode = "default";
    let label = "";

    const setMode = (next: Mode) => {
      if (next === mode) return;
      root.classList.remove(`cursor-${mode}`);
      if (next !== "default") root.classList.add(`cursor-${next}`);
      mode = next;
    };

    const update = () => {
      raf = 0;
      let y = ty;
      const el = document.elementFromPoint(tx, ty);
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        const text = labelled.dataset.cursor ?? "";
        if (text !== label) labelEl.textContent = label = text;
        setMode("label");
      } else if (el?.closest(INTERACTIVE)) {
        setMode("link");
      } else if (el?.closest(NATIVE)) {
        setMode("native");
      } else {
        const line = el ? textLineAt(tx, ty) : null;
        if (line) {
          y = line.top + line.height / 2;
          dot.style.setProperty("--caret-h", `${Math.round(line.height * 0.9)}px`);
          setMode("text");
        } else {
          setMode("default");
        }
      }
      ink.style.transform = `translate3d(${tx}px, ${y}px, 0)`;
      accent.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };
    const schedule = () => {
      if (seen && !raf) raf = requestAnimationFrame(update);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        root.classList.add("cursor-ready");
      }
      schedule();
    };
    const onLeave = () => root.classList.remove("cursor-ready");
    const onEnter = () => seen && root.classList.add("cursor-ready");
    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");

    const enable = () => {
      if (active) return;
      active = true;
      root.classList.add("has-custom-cursor");
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("scroll", schedule, { passive: true, capture: true });
      root.addEventListener("pointerleave", onLeave);
      root.addEventListener("pointerenter", onEnter);
    };
    const disable = () => {
      if (!active) return;
      active = false;
      cancelAnimationFrame(raf);
      raf = 0;
      setMode("default");
      root.classList.remove("has-custom-cursor", "cursor-ready", "cursor-down");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", schedule, { capture: true });
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerenter", onEnter);
      seen = false;
    };
    const sync = () => (fine.matches && !reduced.matches ? enable() : disable());

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      disable();
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  // Two layers: the ink layer blends (difference) with the page; the accent layer does not,
  // so the rose disc and the label keep their real colours. Blending must sit on the layer
  // itself, because its transform makes it a stacking context.
  return (
    <>
      <div ref={accentRef} className="cursor-layer" aria-hidden="true">
        <div className="cursor-disc" />
        <span ref={labelRef} className="cursor-pill" />
      </div>
      <div ref={inkRef} className="cursor-layer cursor-ink" aria-hidden="true">
        <div ref={dotRef} className="cursor-dot" />
      </div>
    </>
  );
}
