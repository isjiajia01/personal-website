import { clamp, current, rand, TAU } from "./math";
import type { Rect } from "./world";

type Ring = { x: number; y: number; r: number; life: number; soft?: boolean };

type Jelly = {
  side: -1 | 1; x: number; y: number; radius: number; phase: number;
  rate: number; hue: number; depth: number; tilt: number; vx: number; vy: number; flash: number; hitBy: Ring | null;
  chains: { points: Float32Array; previous: Float32Array; segment: number; anchor: number; arm: boolean }[];
};

/** Side-view, pulsing bells and trailing Verlet tentacles, adapted from ASCII Ocean. */
export class JellySea {
  private jellies: Jelly[] = [];
  private width = 0;
  private height = 0;
  private time = 0;
  private current = { x: 0, y: 0 };
  private rings: Ring[] = [];

  /** A click sends a ripple through the water; jellies it touches flash and jet away. */
  click(x: number, y: number) {
    this.rings.push({ x, y, r: 4, life: 1 });
    if (this.rings.length > 20) this.rings.shift();
  }

  /** A faint ripple left by the pointer; it shows on the water but never pushes a jelly. */
  ripple(x: number, y: number) {
    this.rings.push({ x, y, r: 2, life: 0.55, soft: true });
    if (this.rings.length > 40) this.rings.shift();
  }

  resize(width: number, height: number) {
    if (this.width === width && this.height === height) return;
    this.width = width;
    this.height = height;
    this.jellies = [];
    this.rings = [];
  }

  private makeJelly(side: -1 | 1, lane: number, index: number): Jelly {
    const radius = clamp(lane * 0.38, 12, 80) * (index ? 0.72 : 1);
    const x = side < 0 ? lane * (0.35 + index * 0.25) : this.width - lane * (0.35 + index * 0.25);
    const y = this.height * (index ? 0.7 : 0.32);
    const jelly: Jelly = { side, x, y, radius, phase: rand(0, TAU), rate: rand(0.8, 1.15), hue: [188, 282, 322, 168][(side < 0 ? 0 : 2) + index], depth: index ? 0.65 : 1, tilt: 0, vx: 0, vy: 0, flash: 0, hitBy: null, chains: [] };
    for (let i = 0; i < 12; i++) {
      const arm = i >= 8;
      const anchor = arm ? [-0.26, -0.09, 0.09, 0.26][i - 8] : -0.92 + 1.84 * i / 7;
      const count = arm ? 10 : 16;
      const segment = radius * (arm ? rand(1.3, 1.8) : rand(2.2, 3.4)) / (count - 1);
      const points = new Float32Array(count * 2);
      for (let j = 0; j < count; j++) { points[j * 2] = x + anchor * radius; points[j * 2 + 1] = y + j * segment; }
      jelly.chains.push({ points, previous: points.slice(), segment, anchor, arm });
    }
    return jelly;
  }

  step(dt: number, paper: Rect | null) {
    this.time += dt;
    for (const ring of this.rings) { ring.r += dt * (ring.soft ? 90 : 260); ring.life -= dt * (ring.soft ? 0.9 : 0.7); }
    this.rings = this.rings.filter((ring) => ring.life > 0);
    if (!paper) return;
    const lanes = [Math.max(0, paper.x0), Math.max(0, this.width - paper.x1)];
    for (const side of [-1, 1] as const) {
      const lane = lanes[side < 0 ? 0 : 1];
      const existing = this.jellies.filter((j) => j.side === side);
      if (lane < 24) { this.jellies = this.jellies.filter((j) => j.side !== side); continue; }
      while (existing.length < 2) { const j = this.makeJelly(side, lane, existing.length); existing.push(j); this.jellies.push(j); }
      for (const j of existing) {
        j.flash = Math.max(0, j.flash - dt * 1.5);
        for (const ring of this.rings) {
          if (ring.soft || j.hitBy === ring) continue;
          const d = Math.hypot(j.x - ring.x, j.y - ring.y);
          if (Math.abs(d - ring.r) >= j.radius) continue;
          j.hitBy = ring; j.flash = 1;
          j.vx += (j.x - ring.x) / (d || 1) * 60 * ring.life;
          j.vy += (j.y - ring.y) / (d || 1) * 60 * ring.life;
          j.phase = Math.floor(j.phase / TAU) * TAU + TAU;
        }
        j.phase += dt * TAU * 0.45 * j.rate;
        const f = (j.phase / TAU) % 1;
        const pulse = f < 0.22 ? f / 0.22 : 1 - (f - 0.22) / 0.78;
        const target = Math.sin(this.time * 0.1 + j.hue) * 0.22;
        j.tilt += (target - j.tilt) * dt * 0.25;
        if (f < 0.22) { j.vx += Math.sin(j.tilt) * j.radius * 3.4 * dt; j.vy -= Math.cos(j.tilt) * j.radius * 3.4 * dt; }
        const drag = Math.exp(-dt * 0.9);
        j.vx *= drag; j.vy = j.vy * drag + 7 * dt;
        current(j.x, j.y, this.time, this.current);
        // Keeping the bell centre outside the paper leaves at least half visible.
        const lo = side < 0 ? 0 : Math.max(0, paper.x1);
        const hi = side < 0 ? Math.min(this.width, paper.x0) : this.width;
        j.x = clamp(j.x + (j.vx + this.current.x * 0.2) * dt, lo, hi);
        j.y += (j.vy + this.current.y * 0.2) * dt;
        if (j.y < -j.radius * 4 || j.y > this.height + j.radius * 4) {
          const shift = j.y < 0 ? this.height + j.radius * 6 : -this.height - j.radius * 6;
          j.y += shift;
          for (const chain of j.chains) for (let n = 1; n < chain.points.length; n += 2) { chain.points[n] += shift; chain.previous[n] += shift; }
        }
        const rx = j.radius * (1 - 0.17 * pulse);
        for (const chain of j.chains) {
          const { points, previous, segment, anchor } = chain;
          points[0] = previous[0] = j.x + anchor * rx * Math.cos(j.tilt);
          points[1] = previous[1] = j.y + anchor * rx * Math.sin(j.tilt);
          for (let n = 2; n < points.length; n += 2) {
            const x = points[n], y = points[n + 1];
            points[n] += (x - previous[n]) * 0.96 + this.current.x * 0.1 * dt;
            points[n + 1] += (y - previous[n + 1]) * 0.96 + 30 * dt * dt;
            previous[n] = x; previous[n + 1] = y;
          }
          for (let pass = 0; pass < 2; pass++) for (let n = 2; n < points.length; n += 2) {
            const dx = points[n] - points[n - 2], dy = points[n + 1] - points[n - 1], d = Math.hypot(dx, dy) || 1;
            points[n] = points[n - 2] + dx / d * segment; points[n + 1] = points[n - 1] + dy / d * segment;
          }
        }
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, dpr: number, cw: number, ch: number, paper: Rect | null) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#010209"; ctx.fillRect(0, 0, this.width, this.height);
    if (!paper) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, Math.max(0, paper.x0), this.height);
    ctx.rect(Math.min(this.width, paper.x1), 0, Math.max(0, this.width - paper.x1), this.height);
    ctx.clip();
    ctx.font = `600 ${Math.round(ch * 0.74)}px ${getComputedStyle(ctx.canvas).fontFamily}`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const ring of this.rings) {
      const steps = Math.ceil(ring.r * TAU / (cw * (ring.soft ? 2 : 1.5)));
      ctx.fillStyle = `rgba(110,200,255,${(ring.soft ? 0.35 : 0.5) * ring.life})`;
      for (let k = 0; k < steps; k++) {
        const a = k / steps * TAU;
        ctx.fillText("·", ring.x + Math.cos(a) * ring.r, ring.y + Math.sin(a) * ring.r);
      }
    }
    ctx.restore();
    ctx.font = `600 ${Math.round(ch * 0.74)}px ${getComputedStyle(ctx.canvas).fontFamily}`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const j of this.jellies) {
      ctx.save();
      // Clip even trailing tentacles to the corresponding side of the sheet.
      ctx.beginPath();
      if (j.side < 0) ctx.rect(0, 0, Math.max(0, paper.x0), this.height);
      else ctx.rect(Math.min(this.width, paper.x1), 0, Math.max(0, this.width - paper.x1), this.height);
      ctx.clip();
      const f = (j.phase / TAU) % 1;
      const pulse = f < 0.22 ? f / 0.22 : 1 - (f - 0.22) / 0.78;
      const rx = j.radius * (1 - 0.17 * pulse), ry = j.radius * (0.72 + 0.16 * pulse);
      const c = Math.cos(j.tilt), s = Math.sin(j.tilt);
      ctx.shadowColor = `hsla(${j.hue},90%,60%,.7)`; ctx.shadowBlur = 8;
      for (const chain of j.chains) {
        const p = chain.points;
        for (let n = 2; n < p.length; n += 2) {
          const dx = p[n] - p[n - 2], dy = p[n + 1] - p[n - 1];
          const glyph = Math.abs(dx) > Math.abs(dy) * 1.5 ? "-" : Math.abs(dy) > Math.abs(dx) * 1.5 ? "|" : dx * dy > 0 ? "\\" : "/";
          ctx.fillStyle = `hsla(${j.hue},75%,65%,${(1 - n / p.length * 0.75) * (chain.arm ? 0.7 : 0.4) * j.depth})`;
          ctx.fillText(glyph, p[n], p[n + 1]);
        }
      }
      for (let y = -ry; y <= 0; y += ch * 0.8) for (let x = -rx; x <= rx; x += cw * 0.8) {
        const e = (x / rx) ** 2 + (y / ry) ** 2;
        if (e > 1) continue;
        const inner = (x / (rx * 0.84)) ** 2 + ((y + ry * 0.04) / (ry * 0.55)) ** 2;
        const angle = Math.atan2(x, -y);
        const band = Math.sin(angle * 3 - this.time * 2.2 + j.hue) * 28;
        const rim = clamp((e - 0.55) / 0.45, 0, 1);
        const glyph = inner < 1 ? ".:" : rim > 0.65 ? "/\\()" : ".:-=+*#%@";
        const key = Math.abs(Math.round(x / cw * 13 + y / ch * 7 + j.hue));
        ctx.fillStyle = `hsla(${j.hue + band},75%,${(inner < 1 ? 35 : 48 + rim * 18) + j.flash * 25}%,${Math.min(1, j.depth * (inner < 1 ? 0.5 : 0.9) + j.flash * 0.4)})`;
        ctx.fillText(glyph[key % glyph.length], j.x + x * c - y * s, j.y + x * s + y * c);
      }
      ctx.restore();
    }
  }
}
