import { AsciiRenderer } from "./renderer";
import { World, type Pond, type Rect, type SharkSpec } from "./world";

const STEP = 1 / 60;
const MAX_STEPS = 4;
/** Below this share of open water on screen the sim sleeps: nothing would show. */
const MIN_VISIBLE_WATER = 0.03;

/**
 * Wires World + AsciiRenderer to a canvas: fixed-timestep loop, resize,
 * pointer input, day/night theme, and prefers-reduced-motion.
 *
 * The canvas sits behind the page. Every frame the engine reads where the
 * paper sheet (`.paper`) is, so creatures swim round it in the water that is
 * actually visible, and sizes them to the widest channel the layout leaves.
 */
export class OceanEngine {
  private world: World;
  private renderer: AsciiRenderer;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private visible = true;
  private reducedMotion: MediaQueryList;
  private darkScheme: MediaQueryList;
  /** Phones and low-core devices render at 30 fps. */
  private minFrameMs: number;
  private maxDpr: number;
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  private paper: Element | null = null;
  private obstacle: Rect = { x0: 0, y0: 0, x1: 0, y1: 0 };
  private disposed = false;

  constructor(private canvas: HTMLCanvasElement, sharks?: SharkSpec[]) {
    this.world = new World(sharks);
    this.renderer = new AsciiRenderer(canvas);
    this.renderer.setFontFamily(getComputedStyle(canvas).fontFamily);
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const small = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const lowEnd = (navigator.hardwareConcurrency || 8) <= 4;
    this.minFrameMs = small || lowEnd ? 1000 / 30 : 0;
    this.maxDpr = small ? 1.5 : 2;
    this.applyTheme();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.schedule();
    });
    this.intersectionObserver.observe(canvas);

    this.reducedMotion.addEventListener("change", this.onMotionPreference);
    this.darkScheme.addEventListener("change", this.onScheme);
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
    window.addEventListener("scroll", this.onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
    window.addEventListener("blur", this.onPointerLeave);

    this.resize();
    // Canvas text can't trigger a webfont load; once the mono face is in, redraw.
    document.fonts?.load(`600 16px ${getComputedStyle(canvas).fontFamily}`).then(() => {
      if (!this.disposed && this.reducedMotion.matches) this.drawStill();
    });
    this.schedule();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.reducedMotion.removeEventListener("change", this.onMotionPreference);
    this.darkScheme.removeEventListener("change", this.onScheme);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("scroll", this.onScroll);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
    window.removeEventListener("blur", this.onPointerLeave);
  }

  /** Day: koi in a pale pond. Night: glowing sharks in the deep. */
  private applyTheme() {
    const dark = this.darkScheme.matches;
    this.renderer.setTheme(dark);
    this.world.setKind(dark ? "classic" : "koi");
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    this.renderer.resize(rect.width, rect.height, dpr);
    this.trackPaper(true);
    this.world.resize(rect.width, rect.height, this.renderer.cellWidth, this.renderer.cellHeight);
    if (this.reducedMotion.matches) this.drawStill();
  }

  /**
   * Read the paper's position (cheap: layout is clean during rAF). When the page or the
   * window changes, re-measure the open water as it is at scroll 0 and resize the pond.
   * Returns the share of the screen that is open water right now.
   */
  private trackPaper(remeasure = false) {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const paper = document.querySelector(".paper");
    if (paper !== this.paper) {
      this.paper = paper;
      remeasure = true;
    }
    if (!paper) {
      this.world.obstacle = null;
      if (remeasure) this.world.setPond(null);
      return 1;
    }
    const r = paper.getBoundingClientRect();
    const o = this.obstacle;
    o.x0 = r.left;
    o.y0 = r.top;
    o.x1 = r.right;
    o.y1 = r.bottom;
    this.world.obstacle = o;

    if (remeasure) {
      const top = r.top + window.scrollY;
      const side = Math.min(r.left, W - r.right);
      const coverW = Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0));
      const coverH = Math.max(0, Math.min(top + r.height, H) - Math.max(top, 0));
      const pond: Pond = {
        lane: Math.max(0, side, top),
        freeArea: Math.max(0, W * H - coverW * coverH),
      };
      this.world.setPond(pond);
    }

    const ix = Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0));
    const iy = Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0));
    return 1 - (ix * iy) / (W * H || 1);
  }

  private schedule() {
    cancelAnimationFrame(this.raf);
    if (this.disposed || !this.visible || this.reducedMotion.matches) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    this.raf = requestAnimationFrame(this.frame);
    if (this.minFrameMs && now - this.last < this.minFrameMs - 2) return;
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    // Paper covers the whole screen (scrolled down on a phone): sleep until it doesn't.
    if (this.trackPaper() < MIN_VISIBLE_WATER) return;
    this.acc += dt;
    let steps = 0;
    while (this.acc >= STEP && steps < MAX_STEPS) {
      this.world.step(STEP);
      this.acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) this.acc = 0;
    this.renderer.render(this.world, dt);
  };

  /** Reduced motion: let the ecosystem settle, then show a single frame. */
  private drawStill() {
    this.trackPaper();
    if (this.world.time < 4) {
      for (let i = 0; i < 240; i++) this.world.step(STEP);
    }
    this.renderer.render(this.world, STEP);
  }

  private onMotionPreference = () => {
    if (this.reducedMotion.matches) {
      cancelAnimationFrame(this.raf);
      this.drawStill();
    } else {
      this.schedule();
    }
  };

  private onScheme = () => {
    this.applyTheme();
    if (this.reducedMotion.matches) this.drawStill();
  };

  /** The still frame has to follow the paper as the page scrolls. */
  private onScroll = () => {
    if (this.reducedMotion.matches && !this.disposed) this.drawStill();
  };

  private toLocal(e: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    // Over the paper the pointer is reading, not playing with the fish.
    return { x, y, inside: inside && (!this.world.obstacle || this.world.isFree(x, y)) };
  }

  private onPointerMove = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    const p = this.world.pointer;
    p.x = x;
    p.y = y;
    p.active = inside && e.pointerType !== "touch";
  };

  private onPointerDown = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    if (inside && !this.reducedMotion.matches) this.world.splash(x, y);
  };

  private onPointerLeave = () => {
    this.world.pointer.active = false;
  };
}
