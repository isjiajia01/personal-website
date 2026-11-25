"use client";

import { memo, useEffect, useRef, useState } from "react";

// An endless shelf of book spines, after the shelf view on seathru.app. Each book is a thin
// CSS 3D box: a spine face and a cover face at right angles. The book at the focus turns
// -90° so its cover faces you, tips a few degrees and comes forward; its neighbours slide
// apart to make room. Drag, scroll sideways, use ← → or click a spine to browse; the
// open cover leans toward the pointer; clicking it opens a card. Covers are drawn here
// (type on colour), not photos. In a collage tile (paused is a boolean) it steps by itself.

type Book = {
  title: string;
  author: string;
  short: string; // author on the spine
  year: string;
  note: string;
  bg: string;
  fg: string;
  band: string;
  aspect: number; // cover width / height
  motif: 0 | 1 | 2 | 3; // sun, bars, frame, wave
};

const BOOKS: Book[] = [
  { title: "Moby-Dick", author: "Herman Melville", short: "Melville", year: "1851", note: "Ishmael ships out on the Pequod, whose captain wants one white whale and nothing else.", bg: "#1f3a5f", fg: "#f3ead8", band: "#e3b23c", aspect: 0.66, motif: 3 },
  { title: "Walden", author: "Henry David Thoreau", short: "Thoreau", year: "1854", note: "Two years in a cabin by a pond in Massachusetts, and what living simply taught him.", bg: "#e9e4d4", fg: "#2f4a35", band: "#2f4a35", aspect: 0.63, motif: 0 },
  { title: "Pride and Prejudice", author: "Jane Austen", short: "Austen", year: "1813", note: "Elizabeth Bennet and Mr Darcy misjudge each other, then slowly stop.", bg: "#f4d9d0", fg: "#6b1f2a", band: "#6b1f2a", aspect: 0.65, motif: 2 },
  { title: "Meditations", author: "Marcus Aurelius", short: "Aurelius", year: "c. 180", note: "Notes a Roman emperor wrote to himself on duty, change and keeping calm.", bg: "#151515", fg: "#e8e2d0", band: "#c8a24a", aspect: 0.62, motif: 0 },
  { title: "The Odyssey", author: "Homer", short: "Homer", year: "8th c. BC", note: "Odysseus takes ten years to sail home from Troy.", bg: "#b5452b", fg: "#f6ead5", band: "#1d1d1d", aspect: 0.67, motif: 1 },
  { title: "Frankenstein", author: "Mary Shelley", short: "Shelley", year: "1818", note: "A young scientist builds a living creature, then runs from what he made.", bg: "#2e3b2f", fg: "#d9e4c7", band: "#9fbf6a", aspect: 0.64, motif: 3 },
  { title: "Middlemarch", author: "George Eliot", short: "Eliot", year: "1871", note: "A provincial English town and the marriages and ambitions inside it.", bg: "#f7f5ef", fg: "#23324a", band: "#7a8fb3", aspect: 0.66, motif: 1 },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", short: "Dostoevsky", year: "1866", note: "A poor student in St Petersburg commits a murder and cannot live with it.", bg: "#8e1b1b", fg: "#f2e6d8", band: "#141414", aspect: 0.65, motif: 2 },
  { title: "The Art of War", author: "Sun Tzu", short: "Sun Tzu", year: "5th c. BC", note: "Thirteen short chapters on strategy: win before the battle starts.", bg: "#f1e9d6", fg: "#141414", band: "#b3261e", aspect: 0.62, motif: 0 },
  { title: "Leaves of Grass", author: "Walt Whitman", short: "Whitman", year: "1855", note: "Long, open-armed poems Whitman kept revising for the rest of his life.", bg: "#6f8f4e", fg: "#f8f4e3", band: "#2c3a1f", aspect: 0.66, motif: 1 },
  { title: "Dracula", author: "Bram Stoker", short: "Stoker", year: "1897", note: "Told in letters and diaries: a Transylvanian count moves to England.", bg: "#0e0e10", fg: "#d8453f", band: "#d8453f", aspect: 0.64, motif: 3 },
  { title: "The Tale of Genji", author: "Murasaki Shikibu", short: "Murasaki", year: "c. 1010", note: "Court life in Heian Japan, written by a lady-in-waiting a thousand years ago.", bg: "#d8c3e3", fg: "#3c2a4d", band: "#3c2a4d", aspect: 0.67, motif: 0 },
  { title: "Don Quixote", author: "Miguel de Cervantes", short: "Cervantes", year: "1605", note: "A man who has read too many romances of chivalry rides out to become a knight.", bg: "#e2b33c", fg: "#2a1f12", band: "#2a1f12", aspect: 0.65, motif: 2 },
  { title: "Journey to the West", author: "Wu Cheng'en", short: "Wu Cheng'en", year: "1592", note: "The monk Tang Sanzang walks to India for scriptures, guarded by the Monkey King.", bg: "#0f5c5c", fg: "#f5e9cf", band: "#e0a33a", aspect: 0.63, motif: 1 },
  { title: "On the Origin of Species", author: "Charles Darwin", short: "Darwin", year: "1859", note: "Darwin's case for evolution by natural selection.", bg: "#556070", fg: "#f1efe9", band: "#e9e3d3", aspect: 0.66, motif: 3 },
  { title: "Dream of the Red Chamber", author: "Cao Xueqin", short: "Cao Xueqin", year: "1791", note: "The rise and fall of the Jia family, seen through Jia Baoyu and his cousins.", bg: "#a3272f", fg: "#f7e7c6", band: "#f0c75e", aspect: 0.64, motif: 0 },
];

const N = BOOKS.length;
const mod = (a: number, n: number) => ((a % n) + n) % n;
const smoothstep = (x: number) => x * x * (3 - 2 * x);
const rubber = (e: number) => (0.6 * e) / (1 + e);
const ease = (rate: number, dt: number) => 1 - Math.exp(-rate * dt);

type Shelf = {
  H: number; // book height, px
  ws: number; // spine width
  gap: number;
  widths: number[]; // cover widths (= box depth)
  dMax: number;
  viewW: number;
  wrap: boolean; // endless when the books more than fill the view
  s: number; // shown focus (fractional book index, unwrapped)
  T: number; // target focus
  T0: number;
  dS: number; // cover width at the focus
  O: number; // how open the focus book is, 0..1
  OT: number;
  tiltX: number;
  tiltY: number;
  down: boolean;
  dragging: boolean;
  moved: boolean;
  sx: number;
  lift: Map<number, number>; // hovered spines rise a little
};

type Slot = {
  el: HTMLDivElement;
  sp: HTMLElement;
  cv: HTMLElement;
  band: HTMLElement;
  st: HTMLElement;
  au: HTMLElement;
  gen: HTMLElement;
  ga: HTMLElement;
  gt: HTMLElement;
  gy: HTMLElement;
  v: number; // unwrapped index drawn in this slot
  vis: boolean;
  drawn: string;
};

// x of a book c places from the focus: evenly spaced spines, pushed apart by half the
// open cover on each side, eased in over the first neighbour.
function place(c: number, ws: number, gap: number, dS: number, O: number) {
  const push = Math.abs(c) < 1 ? (c + Math.sin(Math.PI * c) / Math.PI) / 2 : 0.5 * Math.sign(c);
  return c * (ws + gap) + (dS - ws + 1.6 * gap) * push * O;
}

function widthAt(s: number, widths: number[], wrap: boolean) {
  const n = widths.length;
  if (!wrap) {
    const x = Math.max(0, Math.min(n - 1, s));
    const i = Math.floor(x);
    const f = x - i;
    return widths[i] * (1 - f) + widths[Math.min(n - 1, i + 1)] * f;
  }
  const i = Math.floor(s);
  const f = s - i;
  return widths[mod(i, n)] * (1 - f) + widths[mod(i + 1, n)] * f;
}

const clampSoft = (t: number) => (t < 0 ? -rubber(-t) : t > N - 1 ? N - 1 + rubber(t - (N - 1)) : t);
const settle = (st: Shelf, t: number) => (st.wrap ? Math.round(t) : Math.max(0, Math.min(N - 1, Math.round(t))));
const bookOf = (st: Shelf, v: number) => (st.wrap ? mod(v, N) : v >= 0 && v < N ? v : -1);

// The DOM pool the loop draws into. Memoised: React renders it once per size and never
// touches it again, so the imperative text and styles survive re-renders.
const TapeSlots = memo(function TapeSlots({ count }: { count: number }) {
  return Array.from({ length: count }, (_, i) => (
    <div key={i} className="bs-tape" data-off="">
      <div className="bs-face bs-sp">
        <i className="bs-band" />
        <span className="bs-st" />
        <span className="bs-au" />
      </div>
      <div className="bs-face bs-cv">
        <div className="bs-gen">
          <span className="bs-ga" />
          <i className="bs-motif" />
          <span className="bs-gt" />
          <span className="bs-gy" />
        </div>
      </div>
    </div>
  ));
});

function CardCover({ book }: { book: Book }) {
  const h = 168;
  return (
    <div
      className="bs-cv-flat relative shrink-0 overflow-hidden"
      style={{ "--hpx": `${h}px`, "--bg": book.bg, "--fg": book.fg, "--band": book.band, width: h * book.aspect, height: h } as React.CSSProperties}
    >
      <div className="bs-gen" data-motif={book.motif}>
        <span className="bs-ga">{book.author}</span>
        <i className="bs-motif" />
        <span className="bs-gt">{book.title}</span>
        <span className="bs-gy">{book.year}</span>
      </div>
    </div>
  );
}

export function BookshelfDemo({ paused }: { paused?: boolean }) {
  const interactive = paused === undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shelfRef = useRef<Shelf | null>(null);
  const pausedRef = useRef(!!paused);
  const openRef = useRef<number | null>(null);
  const [pool, setPool] = useState(41);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    pausedRef.current = !!paused;
  }, [paused]);

  useEffect(() => {
    openRef.current = open;
    if (open !== null) closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const floor = floorRef.current;
    if (!root || !stage || !floor) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const slots: Slot[] = Array.from(stage.querySelectorAll<HTMLDivElement>(".bs-tape"), (el) => {
      const [sp, cv] = el.children as unknown as HTMLElement[];
      const gen = cv.firstElementChild as HTMLElement;
      const [ga, , gt, gy] = gen.children as unknown as HTMLElement[];
      const [band, st, au] = sp.children as unknown as HTMLElement[];
      return { el, sp, cv, band, st, au, gen, ga, gt, gy, v: NaN, vis: false, drawn: "" };
    });

    let st = shelfRef.current;
    let half = 0; // books drawn on each side of the focus
    let reach = 0; // px from centre beyond which nothing is drawn
    const ptr = { x: -1, y: -1, over: false, hover: null as number | null, cover: false };

    const measure = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (!w || !h) return false;
      const H = Math.max(80, interactive ? Math.min(h - 120, w < 640 ? w * 0.75 : w * 0.42) : h * 0.62);
      const ws = 0.15 * H;
      const gap = 0.03 * H;
      const widths = BOOKS.map((b) => H * b.aspect);
      const dMax = Math.max(...widths);
      const wrap = N >= 8 && N * (ws + gap) >= 0.55 * w;
      if (!st) {
        const start = wrap ? 0 : Math.floor((N - 1) / 2);
        const startOpen = reduce || !interactive ? 1 : 0;
        st = shelfRef.current = {
          H, ws, gap, widths, dMax, viewW: w, wrap,
          s: start, T: start, T0: start, dS: widths[start], O: startOpen, OT: startOpen,
          tiltX: 0, tiltY: 0, down: false, dragging: false, moved: false, sx: 0, lift: new Map(),
        };
      } else {
        if (st.wrap && !wrap) st.s = st.T = st.T0 = mod(Math.round(st.s), N);
        Object.assign(st, { H, ws, gap, widths, dMax, viewW: w, wrap });
      }
      reach = w / 2 + 1.5 * dMax;
      half = Math.min(40, Math.ceil(reach / (ws + gap)) + 2);
      if (2 * half + 1 > slots.length) setPool(2 * half + 1);
      half = Math.min(half, (slots.length - 1) >> 1);
      stage.style.setProperty("--hpx", `${H}px`);
      stage.style.setProperty("--ws", `${ws}px`);
      slots.forEach((sl) => {
        sl.v = NaN;
      });
      return true;
    };

    const fill = (sl: Slot, v: number, i: number, shelf: Shelf) => {
      if (sl.v === v) return;
      sl.v = v;
      const b = BOOKS[i];
      const s = sl.el.style;
      sl.el.dataset.v = String(v);
      sl.el.dataset.motif = String(b.motif);
      s.setProperty("--bg", b.bg);
      s.setProperty("--fg", b.fg);
      s.setProperty("--band", b.band);
      s.setProperty("--dd", `${shelf.widths[i]}px`);
      sl.band.textContent = String(i + 1).padStart(2, "0");
      sl.st.textContent = b.title;
      sl.au.textContent = b.short;
      sl.ga.textContent = b.author;
      sl.gt.textContent = b.title;
      sl.gy.textContent = b.year;
    };

    let lastActive = -1;
    const frame = (dt: number) => {
      if (!st) return;
      const shelf = st;
      // Focus eases toward its target; much stiffer while a finger is on it.
      shelf.s = reduce ? shelf.T : shelf.s + (shelf.T - shelf.s) * ease(shelf.dragging ? 18 : 5.2, dt);
      if (Math.abs(shelf.T - shelf.s) < 1e-4) shelf.s = shelf.T;
      if (shelf.wrap && Math.abs(shelf.s) > 12 * N) {
        const k = Math.trunc(shelf.s / N) * N;
        shelf.s -= k;
        shelf.T -= k;
        shelf.T0 -= k;
        shelf.lift.clear();
      }
      shelf.dS = widthAt(shelf.s, shelf.widths, shelf.wrap);
      shelf.O = reduce ? shelf.OT : shelf.O + (shelf.OT - shelf.O) * ease(7, dt);
      if (Math.abs(shelf.OT - shelf.O) < 0.001) shelf.O = shelf.OT;

      // The open cover leans toward the pointer; elsewhere over the shelf, only a little.
      const r = root.getBoundingClientRect();
      const ax = r.left + r.width / 2;
      const ay = r.top + r.height / 2;
      const onCover =
        shelf.O > 0.5 && ptr.over && Math.abs(ptr.x - ax) < 0.55 * shelf.dS && Math.abs(ptr.y - ay) < 0.55 * shelf.H && Math.abs(shelf.T - shelf.s) < 0.3;
      const ty = onCover ? ((ptr.x - ax) / (0.55 * shelf.dS)) * 9 : ptr.over ? ((ptr.x - ax) / r.width) * 5 : 0;
      const tx = onCover ? (-(ptr.y - ay) / (shelf.H / 2)) * 6 : 0;
      const kt = reduce ? 1 : ease(7, dt);
      shelf.tiltY += (ty - shelf.tiltY) * kt;
      shelf.tiltX += (tx - shelf.tiltX) * kt;

      const i0 = Math.floor(shelf.s);
      const kl = reduce ? 1 : ease(12, dt);
      shelf.lift.forEach((_, v) => {
        if (v < i0 - half || v > i0 + half) shelf.lift.delete(v);
      });
      for (let j = -half; j <= half; j++) {
        const v = i0 + j;
        const cur = shelf.lift.get(v) ?? 0;
        const next = cur + (Number(ptr.hover === v && Math.abs(v - shelf.s) > 0.5) - cur) * kl;
        if (next > 1e-4) shelf.lift.set(v, next);
        else shelf.lift.delete(v);
      }

      const used = new Set<number>();
      const H = shelf.H;
      for (let j = -half; j <= half; j++) {
        const v = i0 + j;
        const book = bookOf(shelf, v);
        if (book < 0) continue;
        const c = v - shelf.s;
        const x = place(c, shelf.ws, shelf.gap, shelf.dS, shelf.O);
        if (Math.abs(x) > reach) continue;
        const slotIndex = mod(v, slots.length);
        const sl = slots[slotIndex];
        used.add(slotIndex);
        fill(sl, v, book, shelf);
        // l: how far this book has turned toward you (1 = cover flat to the viewer).
        const l = smoothstep(Math.max(0, 1 - Math.abs(c))) * shelf.O;
        const lift = shelf.lift.get(v) ?? 0;
        const ry = -90 * l + shelf.tiltY * l;
        const transform =
          `perspective(2200px) translate3d(${x.toFixed(2)}px,${(-0.025 * l * H - 0.045 * lift * H).toFixed(2)}px,${(0.2 * l * H).toFixed(2)}px) ` +
          `rotateZ(${(-4.5 * l).toFixed(3)}deg) rotateX(${(shelf.tiltX * l).toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
        const z = Math.round(100 - 4 * Math.abs(c));
        const spineShade = (0.55 * l).toFixed(3);
        const coverShade = ((1 - l) * 0.5).toFixed(3);
        const spineOff = Math.abs(ry) > 88;
        const coverOff = Math.abs(ry + 90) > 88;
        const key = `${transform}|${z}|${spineShade}|${coverShade}|${spineOff}|${coverOff}`;
        if (sl.drawn !== key) {
          sl.drawn = key;
          sl.el.style.transform = transform;
          sl.el.style.zIndex = String(z);
          sl.sp.style.visibility = spineOff ? "hidden" : "";
          sl.cv.style.visibility = coverOff ? "hidden" : "";
          sl.sp.style.setProperty("--shade", spineShade);
          sl.cv.style.setProperty("--shade", coverShade);
        }
        if (!sl.vis) {
          sl.el.removeAttribute("data-off");
          sl.vis = true;
        }
      }
      slots.forEach((sl, i) => {
        if (sl.vis && !used.has(i)) {
          sl.el.setAttribute("data-off", "");
          sl.vis = false;
        }
      });

      // Soft contact shadow under the open cover.
      const front = shelf.O > 0.02 ? slots.find((sl) => sl.vis && sl.v === Math.round(shelf.s)) : undefined;
      if (front) {
        const cr = front.cv.getBoundingClientRect();
        const sr = stage.getBoundingClientRect();
        floor.style.setProperty("--fx", `${Math.round(cr.left + cr.width / 2 - sr.left)}px`);
        floor.style.setProperty("--fw", `${Math.round(cr.width)}px`);
        floor.style.setProperty("--fy", `${Math.round(cr.bottom - sr.top)}px`);
        floor.style.opacity = shelf.O.toFixed(2);
      } else floor.style.opacity = "0";

      root.style.cursor = interactive && (ptr.hover !== null || ptr.cover) ? "pointer" : "";
      const now = bookOf(shelf, Math.round(shelf.s));
      if (interactive && now >= 0 && now !== lastActive) {
        lastActive = now;
        setActive(now);
      }
    };

    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    measure();

    let raf = 0;
    let last = performance.now();
    let ready = false;
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!pausedRef.current) {
        frame(dt);
        if (!ready) {
          stage.setAttribute("data-ready", "");
          ready = true;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame((t) => {
      last = t;
      loop(t);
    });

    const timers: number[] = [];
    // Page: the front book turns open shortly after load. Tile: step along by itself.
    if (interactive && !reduce && st && st.OT === 0) timers.push(window.setTimeout(() => st && (st.OT = 1), 600));
    let step = 0;
    if (!interactive && !reduce)
      step = window.setInterval(() => {
        if (st && !pausedRef.current && !document.hidden) st.T = settle(st, st.T) + 1;
      }, 2400);

    const cleanup = () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      timers.forEach(clearTimeout);
      clearInterval(step);
    };
    if (!interactive) return cleanup;

    // Hit-test by rectangles, front-most first: browsers do not reliably hit-test a face
    // that only faces you after two 90° turns, so the open cover would be unclickable.
    const hit = (x: number, y: number) => {
      if (!st) return null;
      const inside = (r: DOMRect) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      const front = Math.round(st.s);
      const order = slots.filter((sl) => sl.vis).sort((a, b) => Number(b.el.style.zIndex) - Number(a.el.style.zIndex));
      for (const sl of order) {
        if (sl.v === front && st.O > 0.5 && inside(sl.cv.getBoundingClientRect())) return { v: sl.v, cover: true };
        if (sl.sp.style.visibility !== "hidden" && inside(sl.sp.getBoundingClientRect())) return { v: sl.v, cover: false };
      }
      return null;
    };
    const goTo = (v: number) => {
      if (!st) return;
      st.T = st.wrap ? v : Math.max(0, Math.min(N - 1, v));
      st.OT = 1;
    };
    const showCard = () => {
      if (!st) return;
      const b = bookOf(st, Math.round(st.s));
      if (b >= 0) setOpen(b);
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") ptr.over = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ptr.over = false;
      ptr.hover = null;
      ptr.cover = false;
    };
    const onDown = (e: PointerEvent) => {
      if (!st || e.button !== 0 || openRef.current !== null) return;
      st.down = true;
      st.dragging = false;
      st.moved = false;
      st.sx = e.clientX;
      st.T0 = st.T;
      ptr.x = e.clientX;
      ptr.y = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      if (ptr.over) {
        const h = openRef.current === null && !st?.dragging ? hit(e.clientX, e.clientY) : null;
        ptr.hover = h && !h.cover ? h.v : null;
        ptr.cover = !!h?.cover;
      }
      if (!st || !st.down) return;
      const dx = e.clientX - st.sx;
      if (!st.dragging && Math.abs(dx) > 5) {
        st.dragging = true;
        st.moved = true;
      }
      if (st.dragging) {
        const t = st.T0 - dx / (st.ws + st.gap);
        st.T = st.wrap ? t : clampSoft(t);
      }
    };
    const onUp = () => {
      if (!st) return;
      if (st.dragging) st.T = settle(st, st.T);
      st.down = false;
      st.dragging = false;
    };
    const onCancel = () => {
      onUp();
      if (st) st.moved = false;
    };
    const onClick = (e: MouseEvent) => {
      if (!st || openRef.current !== null) return;
      if (st.moved) {
        st.moved = false;
        return;
      }
      const h = hit(e.clientX, e.clientY);
      if (!h) return;
      if (h.cover || (Math.abs(h.v - st.s) < 0.5 && st.O > 0.5)) showCard();
      else goTo(h.v);
    };
    let wheelTimer = 0;
    const onWheel = (e: WheelEvent) => {
      // Sideways only, so the page still scrolls past the shelf.
      if (!st || openRef.current !== null || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const t = st.T + (e.deltaX / (st.ws + st.gap)) * 0.5;
      st.T = st.wrap ? t : clampSoft(t);
      st.OT = 1;
      clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => st && (st.T = settle(st, st.T)), 160);
    };
    const onKey = (e: KeyboardEvent) => {
      if (!st || e.metaKey || e.ctrlKey || e.altKey) return;
      if (openRef.current !== null) {
        if (e.key === "Escape") {
          setOpen(null);
          root.focus({ preventScroll: true });
        }
        return;
      }
      const a = document.activeElement;
      if (a && a !== document.body && !root.contains(a)) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        goTo(settle(st, st.T) + (e.key === "ArrowLeft" ? -1 : 1));
      } else if ((e.key === "Enter" || e.key === " ") && a === root) {
        e.preventDefault();
        showCard();
      }
    };
    const noDrag = (e: Event) => e.preventDefault();

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("click", onClick);
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("dragstart", noDrag);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    addEventListener("pointercancel", onCancel);
    addEventListener("keydown", onKey);
    return () => {
      cleanup();
      clearTimeout(wheelTimer);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("click", onClick);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("dragstart", noDrag);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointercancel", onCancel);
      removeEventListener("keydown", onKey);
    };
  }, [interactive, pool]);

  const closeCard = () => {
    setOpen(null);
    rootRef.current?.focus({ preventScroll: true });
  };
  const card = open === null ? null : BOOKS[open];
  const now = BOOKS[active];

  return (
    <div
      ref={rootRef}
      className={`bs-root relative w-full overflow-hidden outline-none ${interactive ? "h-[clamp(400px,52vw,560px)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-700/30" : "h-full"}`}
      data-peek={card ? "" : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "group" : undefined}
      aria-roledescription={interactive ? "bookshelf" : undefined}
      aria-label={interactive ? "Bookshelf. Use the left and right arrow keys to browse, Enter for details." : undefined}
      aria-hidden={interactive ? undefined : true}
    >
      <style>{CSS}</style>
      <div ref={stageRef} className="bs-stage">
        <div ref={floorRef} className="bs-floor" />
        <TapeSlots count={pool} />
      </div>
      {interactive && (
        <>
          <p className="sr-only" aria-live="polite">
            {now.title} by {now.author}, {active + 1} of {N}
          </p>
          <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-mono text-[11px] uppercase tracking-wider text-stone-400 dark:text-zinc-500">
            <span className="pointer-coarse:hidden">Drag or ← → · click the cover</span>
            <span className="hidden pointer-coarse:inline">Swipe · tap the cover</span>
          </p>
        </>
      )}
      {card && (
        <div className="absolute inset-0 z-[200] grid place-items-center p-4" onClick={closeCard}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={card.title}
            className="bs-card relative flex w-full max-w-[440px] gap-5 rounded-2xl bg-white p-5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <CardCover book={card} />
            <div className="min-w-0 pr-6">
              <h2 className="project-title text-[20px] leading-6 text-stone-900 dark:text-zinc-100">{card.title}</h2>
              <p className="mt-1 text-[13px] text-stone-500 dark:text-zinc-400">
                {card.author} · {card.year}
              </p>
              <p className="mt-3 text-[13px] leading-5 text-stone-600 dark:text-zinc-300">{card.note}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={closeCard}
              aria-label="Close"
              className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-stone-100 text-stone-500 hover:text-(--rose) dark:bg-zinc-800 dark:text-zinc-400"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const CSS = `
.bs-root { touch-action: pan-y; -webkit-user-select: none; user-select: none; }
.bs-stage { position: absolute; left: 50%; top: 50%; width: 0; height: 0; isolation: isolate; opacity: 0; transition: opacity .4s, filter .35s; }
.bs-stage[data-ready] { opacity: 1; }
.bs-root[data-peek] .bs-stage { filter: blur(10px); opacity: .5; }
.bs-tape { position: absolute; left: 0; top: 0; width: 0; height: 0; transform-style: preserve-3d; will-change: transform; }
.bs-tape[data-off] { visibility: hidden; }
.bs-tape[data-off] * { visibility: hidden !important; }
.bs-face { position: absolute; height: var(--hpx); top: calc(var(--hpx) * -.5); border-radius: calc(var(--hpx) * .022); backface-visibility: hidden; overflow: hidden; }
.bs-face::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: #000; opacity: var(--shade, 0); pointer-events: none; }
.bs-sp { width: var(--ws); left: calc(var(--ws) * -.5); transform: translateZ(calc(var(--dd) / 2)); color: var(--fg);
  background: linear-gradient(90deg, #00000038, #0000 16%, #ffffff12 50%, #0000 84%, #00000042), var(--bg);
  display: flex; flex-direction: column; align-items: center; box-shadow: inset 0 1px #ffffff2e, inset 0 -2px 3px #0000002e; }
.bs-band { flex: none; width: 100%; height: 12%; background: var(--band); color: var(--bg); display: flex; align-items: center; justify-content: center;
  font-style: normal; font-weight: 650; font-size: calc(var(--hpx) * .03); letter-spacing: .04em; font-variant-numeric: tabular-nums; line-height: 1; }
.bs-st { flex: 1 1 0; min-height: 0; writing-mode: vertical-rl; display: flex; align-items: center; justify-content: center; text-align: center; padding: 9% 0;
  font-family: var(--font-serif); font-weight: 600; font-size: calc(var(--hpx) * .042); line-height: 1.06; letter-spacing: -.005em; overflow: hidden; }
.bs-au { flex: none; writing-mode: vertical-rl; max-height: 32%; padding-bottom: 9%; font-weight: 600; font-size: calc(var(--hpx) * .021);
  letter-spacing: .12em; text-transform: uppercase; line-height: 1; overflow: hidden; }
.bs-cv { width: var(--dd); left: calc(var(--dd) * -.5); transform: rotateY(90deg) translateZ(calc(var(--ws) / 2)); }
.bs-cv, .bs-cv-flat { color: var(--fg); background: var(--bg); border-radius: calc(var(--hpx) * .022); }
.bs-cv-flat { box-shadow: 0 10px 20px -10px rgb(0 0 0 / .45), 0 1px 2px rgb(0 0 0 / .12); }
.bs-gen { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 11% 10% 9%; background: linear-gradient(90deg, #0000002e, #0000 8%); }
.bs-ga { position: relative; z-index: 1; font-weight: 600; font-size: calc(var(--hpx) * .026); letter-spacing: .14em; text-transform: uppercase; opacity: .85; line-height: 1.2; }
.bs-gt { position: relative; z-index: 1; margin-top: 8%; font-family: var(--font-serif); font-weight: 600; font-size: calc(var(--hpx) * .084); line-height: 1.02; letter-spacing: -.01em; overflow-wrap: anywhere; }
.bs-gy { position: relative; z-index: 1; margin-top: auto; font-size: calc(var(--hpx) * .024); letter-spacing: .1em; opacity: .7; font-variant-numeric: tabular-nums; }
.bs-motif { position: absolute; pointer-events: none; }
[data-motif="0"] .bs-motif { width: 46%; aspect-ratio: 1; right: 10%; bottom: 16%; border-radius: 50%; background: var(--band); }
[data-motif="1"] .bs-motif { left: 10%; right: 10%; bottom: 18%; height: 18%; background: repeating-linear-gradient(180deg, var(--band) 0 14%, #0000 14% 32%); }
[data-motif="2"] .bs-motif { inset: 5%; border: max(1px, calc(var(--hpx) * .005)) solid var(--band); border-radius: calc(var(--hpx) * .01); }
[data-motif="3"] .bs-motif { left: -10%; right: -10%; bottom: 10%; height: 22%;
  background: radial-gradient(circle at 50% 0, #0000 58%, var(--band) 60% 72%, #0000 74%) 0 0 / 25% 100% repeat-x; opacity: .9; }
.bs-floor { position: absolute; z-index: 0; pointer-events: none; opacity: 0;
  width: calc(var(--fw, 0px) * 1.1); height: calc(var(--hpx) * .09);
  left: calc(var(--fx, 0px) - var(--fw, 0px) * .55); top: calc(var(--fy, 0px) - var(--hpx) * .055);
  background: radial-gradient(closest-side, #14100a61, #14100a1f 60%, #0000); }
@media (prefers-color-scheme: dark) { .bs-floor { background: radial-gradient(closest-side, #000000a0, #00000040 60%, #0000); } }
.bs-card { animation: bs-card-in .28s cubic-bezier(.23, 1, .32, 1); }
@keyframes bs-card-in { from { opacity: 0; transform: translateY(8px) scale(.97); } }
@media (prefers-reduced-motion: reduce) { .bs-stage, .bs-card { transition: none; animation: none; } }
`;
