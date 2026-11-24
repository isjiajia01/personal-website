/**
 * Topographic contour lines behind the paper (components/contour-background.tsx).
 *
 * A slowly drifting 3D gradient-noise field is sampled on a coarse grid and
 * traced with marching squares into isolines. Every fifth level is an index
 * contour, drawn a little darker, as on a survey map. The pointer raises a
 * gentle, eased hill so the lines bend round it.
 *
 * Two looks, both set in CSS so they live with the other theme tokens:
 * day is warm ink on paper (`--contour`, `--contour-index`); night is cool,
 * fainter lines whose index contours carry a soft halo (`--contour-halo`).
 */

const CELL = 12; // CSS px per marching-squares cell
const SCALE = 1 / 460; // field features roughly 460 px across
const DRIFT = 0.018; // field time units per second: visible only over tens of seconds
const LEVEL_STEP = 0.11;
const INDEX_EVERY = 5;
const FRAME_MS = 1000 / 30;
const HILL_RADIUS = 220;
const HILL_HEIGHT = 0.32;

// --- 3D gradient noise (Perlin, improved) ---------------------------------

const PERM = new Uint8Array(512);
{
  const p = Array.from({ length: 256 }, (_, i) => i);
  let seed = 0x9e3779b9;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
}

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function grad(hash: number, x: number, y: number, z: number) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function noise3(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
  const u = fade(x), v = fade(y), w = fade(z);
  const A = PERM[X] + Y, AA = PERM[A] + Z, AB = PERM[A + 1] + Z;
  const B = PERM[X + 1] + Y, BA = PERM[B] + Z, BB = PERM[B + 1] + Z;
  return lerp(
    lerp(lerp(grad(PERM[AA], x, y, z), grad(PERM[BA], x - 1, y, z), u),
      lerp(grad(PERM[AB], x, y - 1, z), grad(PERM[BB], x - 1, y - 1, z), u), v),
    lerp(lerp(grad(PERM[AA + 1], x, y, z - 1), grad(PERM[BA + 1], x - 1, y, z - 1), u),
      lerp(grad(PERM[AB + 1], x, y - 1, z - 1), grad(PERM[BB + 1], x - 1, y - 1, z - 1), u), v),
    w,
  );
}

// --- Renderer ---------------------------------------------------------------

export class ContourField {
  private ctx: CanvasRenderingContext2D;
  private cols = 0;
  private rows = 0;
  private values = new Float32Array(0);
  private width = 0;
  private height = 0;
  private dpr = 1;
  private time = Math.random() * 100;
  private raf = 0;
  private last = 0;
  private sinceFrame = 0;
  private stroke = "rgb(120 113 108 / 0.2)";
  private strokeIndex = "rgb(120 113 108 / 0.34)";
  private halo = "";
  private pointer = { x: 0, y: 0, active: false };
  private hill = { x: 0, y: 0, h: 0 };
  private reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private darkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  /** Phones and touch screens: one still frame, no loop, no battery cost. */
  private still = window.matchMedia("(max-width: 767px), (pointer: coarse)");
  private resizeObserver: ResizeObserver;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas unavailable");
    this.ctx = ctx;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.reducedMotion.addEventListener("change", this.onMotionChange);
    this.still.addEventListener("change", this.onMotionChange);
    this.darkScheme.addEventListener("change", this.onThemeChange);
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.readColours();
    this.resize();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.reducedMotion.removeEventListener("change", this.onMotionChange);
    this.still.removeEventListener("change", this.onMotionChange);
    this.darkScheme.removeEventListener("change", this.onThemeChange);
    window.removeEventListener("pointermove", this.onPointerMove);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
    document.removeEventListener("visibilitychange", this.onVisibility);
  }

  private onMotionChange = () => this.schedule();
  private onThemeChange = () => { this.readColours(); this.draw(); };
  private onVisibility = () => this.schedule();
  private onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    this.pointer = { x: e.clientX, y: e.clientY, active: true };
    this.schedule();
  };
  private onPointerLeave = () => { this.pointer.active = false; };

  private readColours() {
    const style = getComputedStyle(this.canvas);
    this.stroke = style.getPropertyValue("--contour").trim() || this.stroke;
    this.strokeIndex = style.getPropertyValue("--contour-index").trim() || this.strokeIndex;
    this.halo = style.getPropertyValue("--contour-halo").trim();
  }

  private resize() {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    this.width = w;
    if (!w || !h) return; // hidden (print), so stay asleep
    this.height = h;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.cols = Math.ceil(w / CELL) + 1;
    this.rows = Math.ceil(h / CELL) + 1;
    this.values = new Float32Array((this.cols + 1) * (this.rows + 1));
    this.draw();
    this.schedule();
  }

  private get animating() {
    return this.width > 0 && !this.reducedMotion.matches && !this.still.matches && document.visibilityState === "visible";
  }

  private schedule() {
    if (this.raf || !this.animating) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    this.raf = 0;
    if (!this.animating) return;
    const dt = Math.min((now - this.last) / 1000, 0.1);
    this.last = now;
    this.time += dt * DRIFT;
    this.sinceFrame += dt * 1000;

    // Ease the hill towards the pointer; it sinks back when the pointer leaves.
    const k = 1 - Math.exp(-dt * 2.5);
    const target = this.pointer.active ? HILL_HEIGHT : 0;
    this.hill.x += (this.pointer.x - this.hill.x) * k;
    this.hill.y += (this.pointer.y - this.hill.y) * k;
    this.hill.h += (target - this.hill.h) * (1 - Math.exp(-dt * 1.5));

    if (this.sinceFrame >= FRAME_MS) {
      this.sinceFrame = 0;
      this.draw();
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  private sample() {
    const { cols, rows, values, time, hill } = this;
    const stride = cols + 1;
    const r2 = HILL_RADIUS * HILL_RADIUS;
    for (let j = 0; j <= rows; j++) {
      const py = j * CELL;
      const y = py * SCALE;
      for (let i = 0; i <= cols; i++) {
        const px = i * CELL;
        const x = px * SCALE;
        let v = noise3(x, y, time) + 0.42 * noise3(x * 2.1 + 17, y * 2.1 - 9, time * 1.6);
        if (hill.h > 0.001) {
          const dx = px - hill.x, dy = py - hill.y;
          v += hill.h * Math.exp(-(dx * dx + dy * dy) / r2);
        }
        values[j * stride + i] = v;
      }
    }
  }

  private draw() {
    if (!this.width) return;
    const { ctx, cols, rows, values, dpr } = this;
    this.sample();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.lineWidth = 1;
    ctx.lineCap = "round";

    const stride = cols + 1;
    const minLevel = Math.floor(-1.4 / LEVEL_STEP);
    const maxLevel = Math.ceil(1.6 / LEVEL_STEP);
    const plain = new Path2D();
    const index = new Path2D();

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = values[j * stride + i]; // top-left
        const b = values[j * stride + i + 1]; // top-right
        const c = values[(j + 1) * stride + i + 1]; // bottom-right
        const d = values[(j + 1) * stride + i]; // bottom-left
        const lo = Math.min(a, b, c, d), hi = Math.max(a, b, c, d);
        const first = Math.max(minLevel, Math.ceil(lo / LEVEL_STEP));
        const last = Math.min(maxLevel, Math.floor(hi / LEVEL_STEP));
        if (first > last) continue;
        const x0 = i * CELL, y0 = j * CELL;

        for (let n = first; n <= last; n++) {
          const t = n * LEVEL_STEP;
          const code = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0);
          if (code === 0 || code === 15) continue;
          const path = n % INDEX_EVERY === 0 ? index : plain;
          // Edge crossings, linearly interpolated.
          const top = () => [x0 + CELL * ((t - a) / (b - a)), y0] as const;
          const right = () => [x0 + CELL, y0 + CELL * ((t - b) / (c - b))] as const;
          const bottom = () => [x0 + CELL * ((t - d) / (c - d)), y0 + CELL] as const;
          const left = () => [x0, y0 + CELL * ((t - a) / (d - a))] as const;
          const seg = (p: readonly [number, number], q: readonly [number, number]) => {
            path.moveTo(p[0], p[1]);
            path.lineTo(q[0], q[1]);
          };
          switch (code) {
            case 1: case 14: seg(left(), bottom()); break;
            case 2: case 13: seg(bottom(), right()); break;
            case 3: case 12: seg(left(), right()); break;
            case 4: case 11: seg(top(), right()); break;
            case 6: case 9: seg(top(), bottom()); break;
            case 7: case 8: seg(left(), top()); break;
            case 5: { // saddle: resolve with the cell centre
              const centre = (a + b + c + d) / 4 > t;
              if (centre) { seg(left(), top()); seg(bottom(), right()); }
              else { seg(left(), bottom()); seg(top(), right()); }
              break;
            }
            case 10: {
              const centre = (a + b + c + d) / 4 > t;
              if (centre) { seg(left(), bottom()); seg(top(), right()); }
              else { seg(left(), top()); seg(bottom(), right()); }
              break;
            }
          }
        }
      }
    }

    ctx.strokeStyle = this.stroke;
    ctx.stroke(plain);
    if (this.halo && this.halo !== "none") {
      ctx.lineWidth = 4;
      ctx.strokeStyle = this.halo;
      ctx.stroke(index);
      ctx.lineWidth = 1;
    }
    ctx.strokeStyle = this.strokeIndex;
    ctx.stroke(index);
  }
}
