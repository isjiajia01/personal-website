/**
 * canopy.js — decoder + renderer for the dot-matrix "Canopy" films on davidluft.com
 *
 * Reconstructed by reading the site's public client bundle
 * (/_next/static/chunks/8503-*.js, webpack modules 50331 / 9499 / 74370 / 88503)
 * and the public payload format of /canopy/*.json. No private data is used.
 *
 * The engine is a 1:1 reimplementation of the observed behaviour:
 *   6-bit temporal delta decode -> 64x36 colour/luma field -> bilinear sample
 *   -> per-dot physics (motion, jitter, cursor trail, exposure) -> canvas.
 *
 * Usage:
 *   import { Canopy, MODE } from "./src/canopy.js";
 *   const engine = new Canopy(canvas, { ...MODE, density: 64, sat: 2 });
 *   engine.load(await fetch("data/wild-sunset.json").then(r => r.json()));
 *   engine.resize(); engine.start();
 *
 * MIT licensed. The payload data and the footage it encodes belong to
 * David Luft; see NOTICE in README.md.
 */
/* ------------------------------------------------------------------ *
 * Canopy decoder — faithful port of webpack module 50331 / 88503
 * (/_next/static/chunks/8503-07314878a4fc64de.js)
 * ------------------------------------------------------------------ */
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const F = new Float32Array(128), U = new Uint8Array(128), Q63 = 1 / 63;
for (let i = 0; i < 64; i++) { F[ALPHA.charCodeAt(i)] = i / 63; U[ALPHA.charCodeAt(i)] = i; }

/** 6-bit values with temporal delta: value = previous-frame value + delta (mod 64). */
function undelta(str, stride) {
  const n = str.length, out = new Uint8Array(n);
  for (let i = 0; i < stride && i < n; i++) out[i] = U[str.charCodeAt(i)];
  for (let i = stride; i < n; i++) out[i] = (out[i - stride] + U[str.charCodeAt(i)]) & 63;
  return out;
}

const smooth = t => t * t * (3 - 2 * t);
const noise = (x, y) => { const i = 43758.5453123 * Math.sin(127.1 * x + 311.7 * y); return i - Math.floor(i); };
function vnoise(x, y) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = smooth(x - x0), fy = smooth(y - y0);
  const a = noise(x0, y0), b = noise(x0 + 1, y0), c = noise(x0, y0 + 1), d = noise(x0 + 1, y0 + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

const MODE = { theme: "light", shape: "dot", density: 64, cropRows: 0, cropY: .5, cropCols: 0, cropX: .5,
  size: 1, sat: 2, motionSize: 1, shake: .15, cursor: 1.25, cursorEffect: "grow", cursorFalloff: "wake",
  subjectFocus: 1.85, speed: .35, fit: "contain", scale: .3645833333, bleed: 0, revealStyle: "focus" };

class Canopy {
  constructor(canvas, cfg = {}, opts = {}) {
    this.cv = canvas;
    this.ctx = canvas.getContext("2d");
    this.cfg = { ...MODE, ...cfg };
    this.fadeIn = opts.fadeIn ?? true;
    this.onFrame = opts.onFrame;
    this.onReady = opts.onReady;
    this.reduceMotion = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    this.MCOLS = 128; this.MROWS = 72; this.LC = 64; this.LR = 36; this.LF = 120; this.playFps = 12;
    this.hasData = false; this.running = false; this.playhead = 0; this.lastT = 0; this.camLevel = 0;
    this.booting = true; this.bootFadeStart = -1; this.lastBlurPx = -1; this.lastEmitFrame = -1;
    this.ptrX = 0; this.ptrY = 0; this.ptrXraw = 0; this.ptrYraw = 0; this.ptrInside = false; this.ptrAmt = 0;
    this.COLOUT = [0, 0, 0];
    this.boundFrame = this.frame.bind(this);
    canvas.addEventListener("pointermove", e => {
      const r = canvas.getBoundingClientRect();
      this.ptrXraw = e.clientX - r.left; this.ptrYraw = e.clientY - r.top; this.ptrInside = true;
    });
    canvas.addEventListener("pointerenter", () => { this.ptrInside = true; });
    canvas.addEventListener("pointerleave", () => { this.ptrInside = false; });
  }

  load(d) {
    this.LF = d.LF; this.playFps = d.playFps; this.LC = d.LC; this.LR = d.LR;
    this.MCOLS = d.MCOLS; this.MROWS = d.MROWS;
    const delta = d.enc === "delta1";
    this.LUMA = delta ? undelta(d.LUMA, this.LR * this.LC) : d.LUMA;
    if (d.colfConst && d.COLF) this.COLF = d.COLF.repeat(d.LF + 1);
    else if (delta && d.COLF) this.COLF = undelta(d.COLF, this.LR * this.LC * 3);
    else this.COLF = d.COLF ?? null;
    this.CITYC = d.CITYC;
    this.hasData = true;
    this.buildGrid();
    this.playhead = 0;
    if (this.booting) { this.booting = false; this.bootFadeStart = this.fadeIn ? (this.lastT || performance.now() / 1e3) : -1; }
    this.onReady?.(this.getGrid());
  }

  setConfig(t) { this.cfg = { ...this.cfg, ...t }; this.buildGrid(); }
  getGrid() { return { cols: this.sCols, rows: this.sRows, aspect: this.sRows ? this.sCols / this.sRows : 0 }; }

  start() { if (!this.running) { this.running = true; this.rafId = (globalThis.requestAnimationFrame ?? (() => 0))(this.boundFrame); } }
  stop() { this.running = false; if (this.rafId) (globalThis.cancelAnimationFrame ?? (() => {}))(this.rafId); this.rafId = 0; }

  resize() {
    const dpr = Math.min(globalThis.devicePixelRatio || 1, 3);
    const w = Math.round(this.cv.clientWidth * dpr), h = Math.round(this.cv.clientHeight * dpr);
    if (this.cv.width !== w || this.cv.height !== h) { this.cv.width = w; this.cv.height = h; }
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  buildGrid() {
    const { MCOLS, MROWS, CITYC } = this;
    const l = Math.max(1, Math.round(MCOLS / Math.max(1, Math.round(this.cfg.density))));
    const cols = Math.floor(MCOLS / l), rows = Math.round(cols * MROWS / MCOLS);
    const cropR = Math.max(0, Math.min(Math.round(this.cfg.cropRows ?? 0), rows - 3)), r = rows - cropR;
    const cropC = Math.max(0, Math.min(Math.round(this.cfg.cropCols ?? 0), cols - 3)), c = cols - cropC;
    const offY = Math.floor((this.cfg.cropY ?? .5) * (rows - r) * l);
    const offX = Math.floor((this.cfg.cropX ?? .5) * (cols - c) * l);
    this.sCols = c; this.sRows = r; this.sBaseRows = rows; this.sBaseCols = cols;
    const CR = new Float32Array(c * r), CG = new Float32Array(c * r), CB = new Float32Array(c * r);
    for (let y = 0; y < r; y++) for (let x = 0; x < c; x++) {
      let n = 0, sr = 0, sg = 0, sb = 0;
      for (let v = 0; v < l; v++) for (let h = 0; h < l; h++) {
        const px = x * l + h + offX, py = y * l + v + offY;
        if (px >= MCOLS || py >= MROWS) continue;
        n++;
        const p = (py * MCOLS + px) * 3;
        if (CITYC) { sr += U[CITYC.charCodeAt(p)] * Q63; sg += U[CITYC.charCodeAt(p + 1)] * Q63; sb += U[CITYC.charCodeAt(p + 2)] * Q63; }
      }
      const i = y * c + x;
      if (n) { CR[i] = sr / n * 255; CG[i] = sg / n * 255; CB[i] = sb / n * 255; }
    }
    this.sCR = CR; this.sCG = CG; this.sCB = CB;
    this.sCurTrail = new Float32Array(c * r);
    const N = c * r;
    this.dX = new Float32Array(N); this.dY = new Float32Array(N); this.dR = new Float32Array(N);
    this.dCR = new Float32Array(N); this.dCG = new Float32Array(N); this.dCB = new Float32Array(N);
    this.dAl = new Float32Array(N); this.dBk = new Int32Array(N); this.dOrder = new Int32Array(N);
    this.dCnt = new Int32Array(64);
  }

  luminance(frame, u, v) {           // bilinear sample of the 6-bit luma field
    const { LC, LR, LUMA } = this;
    const sx = u * (LC - 1), sy = v * (LR - 1);
    const x0 = Math.floor(sx), y0 = Math.floor(sy), x1 = Math.min(LC - 1, x0 + 1), y1 = Math.min(LR - 1, y0 + 1);
    const fx = sx - x0, fy = sy - y0, base = frame * LC * LR;
    const a = LUMA[base + y0 * LC + x0] * Q63, b = LUMA[base + y0 * LC + x1] * Q63;
    const c = LUMA[base + y1 * LC + x0] * Q63, d = LUMA[base + y1 * LC + x1] * Q63;
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  }

  colorAt(frame, u, v) {             // bilinear sample of the per-frame chroma field
    const { LC, LR } = this, f = this.COLF;
    const sx = u * (LC - 1), sy = v * (LR - 1);
    const x0 = Math.floor(sx), y0 = Math.floor(sy), x1 = Math.min(LC - 1, x0 + 1), y1 = Math.min(LR - 1, y0 + 1);
    const fx = sx - x0, fy = sy - y0, base = frame * LC * LR * 3;
    for (let k = 0; k < 3; k++) {
      const a = f[base + (y0 * LC + x0) * 3 + k] * Q63, b = f[base + (y0 * LC + x1) * 3 + k] * Q63;
      const c = f[base + (y1 * LC + x0) * 3 + k] * Q63, d = f[base + (y1 * LC + x1) * 3 + k] * Q63;
      this.COLOUT[k] = (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) * 255;
    }
    return this.COLOUT;
  }

  colorString(r, g, b) {              // saturation push used by vibStr()
    const m = (r + g + b) / 3, s = this.cfg.sat;
    r = m + (r - m) * s; g = m + (g - m) * s; b = m + (b - m) * s;
    return "rgb(" + (Math.max(0, Math.min(255, r | 0))) + "," + (Math.max(0, Math.min(255, g | 0))) + "," + (Math.max(0, Math.min(255, b | 0))) + ")";
  }

  drawShape(x, y, r, shape) {
    const c = this.ctx;
    switch (shape) {
      case "square": c.fillRect(x - r, y - r, 2 * r, 2 * r); break;
      case "diamond": { const n = 1.25 * r; c.beginPath(); c.moveTo(x, y - n); c.lineTo(x + n, y); c.lineTo(x, y + n); c.lineTo(x - n, y); c.closePath(); c.fill(); break; }
      case "ring": { const n = Math.max(.8, .5 * r); c.lineWidth = n; c.strokeStyle = c.fillStyle; c.beginPath(); c.arc(x, y, Math.max(.4, r - n / 2), 0, 6.2832); c.stroke(); break; }
      case "cross": { const n = Math.max(.8, .62 * r); c.fillRect(x - r, y - n / 2, 2 * r, n); c.fillRect(x - n / 2, y - r, n, 2 * r); break; }
      case "line": { const n = 1.35 * r, s = Math.cos(-.7854) * n, l = Math.sin(-.7854) * n; c.lineWidth = Math.max(.8, .34 * r); c.strokeStyle = c.fillStyle; c.beginPath(); c.moveTo(x - s, y - l); c.lineTo(x + s, y + l); c.stroke(); break; }
      case "hex": { const n = 1.25 * r; c.beginPath(); for (let i = 0; i < 6; i++) { const a = 1.0472 * i - .5236, px = x + Math.cos(a) * n, py = y + Math.sin(a) * n; i ? c.lineTo(px, py) : c.moveTo(px, py); } c.closePath(); c.fill(); break; }
      case "star": { const n = 1.5 * r, q = .6 * r; c.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? q : n, a = .6283 * i - 1.5708, px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr; i ? c.lineTo(px, py) : c.moveTo(px, py); } c.closePath(); c.fill(); break; }
      default: c.beginPath(); c.arc(x, y, r, 0, 6.2832); c.fill();
    }
  }

  frame(t) {
    if (!this.running) return;
    const c = this.ctx, cfg = this.cfg, now = t / 1e3;
    const dt = Math.min(.05, now - this.lastT || .016);
    this.lastT = now;
    const w = this.cv.clientWidth, h = this.cv.clientHeight;
    const dpr = Math.min(globalThis.devicePixelRatio || 1, 3);
    if (this.cv.width !== Math.round(w * dpr) || this.cv.height !== Math.round(h * dpr)) this.resize();
    if (this.booting || !this.hasData) { c.clearRect(0, 0, w, h); this.rafId = requestAnimationFrame(this.boundFrame); return; }

    /* --- playhead with seamless loop blend (LF frames, first g frames crossfade) --- */
    const LF = this.LF, g = Math.min(Math.round(.4 * LF), Math.max(12, Math.round(this.playFps))), wl = LF - g;
    this.playhead = (this.playhead + dt * this.playFps * cfg.speed) % wl;
    const C = this.playhead, time = this.playhead / this.playFps;
    const A = Math.floor(C), k = C - A, Ff = A % LF, Rf = (A + 1) % LF;
    let T = 1, S = Ff, L = Rf, j = k;
    if (C < g) {
      T = smooth(C / g);
      const e = C + wl, i = Math.floor(e); S = i % LF; L = (i + 1) % LF; j = e - i;
    }
    let l, cc, hh, P = C - 1;
    if (P < 0) { l = Ff; cc = Rf; hh = k; } else { const x = Math.floor(P); l = x % LF; cc = (x + 1) % LF; hh = P - x; }
    const E = C + wl - 1, I = Math.floor(E), O = I % LF, B = (I + 1) % LF, N = E - I;

    c.clearRect(0, 0, w, h);
    const Y = this.sCols, W = this.sRows;
    const X = this.sBaseRows ? W / this.sBaseRows : 1, q = this.sBaseCols ? Y / this.sBaseCols : 1;
    const z = (cfg.cropY ?? .5) * (1 - X), Uo = (cfg.cropX ?? .5) * (1 - q);
    const contain = cfg.fit === "contain", bleed = contain ? Math.max(0, cfg.bleed ?? 0) : 0;
    const D = contain ? Math.min((w - 2 * bleed) / Y, (h - 2 * bleed) / W) : Math.min(1920 * cfg.scale / Y, 1080 * cfg.scale / W);
    const K = (w - D * Y) / 2, H = (h - D * W) / 2, Q = .5 * D * cfg.size;
    const reveal = this.reduceMotion ? "fade" : (cfg.revealStyle ?? "ripple");
    const boot = this.bootFadeStart >= 0;

    /* reveal parameters */
    let Z = K + D * Y / 2, $ = H + D * W / 2, tt = boot, te = 1, ti = 0, tn = 0, tr = 1;
    const V = ["fade", "bloom", "focus", "luma", "shimmer"].includes(reveal) ? .9 : .6;
    if (boot) {
      const i = Math.min(1, Math.max(0, (now - this.bootFadeStart) / V));
      te = 1 - Math.pow(1 - i, 3);
      if (i >= 1) this.bootFadeStart = -1;
      if (reveal === "ripple" || reveal === "bloom") {
        const rr = Math.hypot(D * Y / 2, D * W / 2);
        ti = Math.max(64, rr * (reveal === "bloom" ? .6 : .22));
        tn = te * (rr + ti);
      } else if (reveal === "grow") tr = .7 + .3 * te;
      else if (reveal === "radial") tn = te * (Math.hypot(D * Y / 2, D * W / 2) + D);
      else if (reveal === "square") tn = te * (Math.max(D * Y / 2, D * W / 2) + D);
    }
    const blur = reveal === "focus" && tt ? 6 * (1 - te) : 0;
    if (blur !== this.lastBlurPx) { this.cv.style.filter = blur > .02 ? `blur(${blur.toFixed(2)}px)` : ""; this.lastBlurPx = blur; }

    const shake = cfg.shake * (this.reduceMotion ? .25 : 1), msize = cfg.motionSize * (this.reduceMotion ? .25 : 1);
    const lerp = Math.min(1, 30 * dt);
    this.ptrX += (this.ptrXraw - this.ptrX) * lerp; this.ptrY += (this.ptrYraw - this.ptrY) * lerp;
    this.ptrAmt += ((this.ptrInside ? 1 : 0) - this.ptrAmt) * Math.min(1, 8 * dt);
    const cur = cfg.cursor > .001 && this.ptrAmt > .001, dist = +D, dist2 = dist * dist;
    const ce = cfg.cursorEffect ?? "tint", grow = ce === "grow" || ce === "both", tint = ce !== "grow";
    const instant = (cfg.cursorFalloff ?? "wake") === "instant";
    const focus = cfg.subjectFocus * this.camLevel;

    let n = 0, sumMotion = 0, minR = Infinity, maxR = -Infinity;
    for (let y = 0; y < W; y++) for (let x = 0; x < Y; x++) {
      const i = y * Y + x, sx = K + (x + .5) * D, sy = H + (y + .5) * D;
      const u = Uo + (x + .5) / Y * q, v = z + (y + .5) / W * X;
      const p = this.luminance(Ff, u, v) + (this.luminance(Rf, u, v) - this.luminance(Ff, u, v)) * k;
      let val = p;
      if (T < 1) {
        const alt = this.luminance(S, u, v) + (this.luminance(L, u, v) - this.luminance(S, u, v)) * j;
        val = alt + (p - alt) * T;
      }
      let motion = Math.abs(p - (this.luminance(l, u, v) + (this.luminance(cc, u, v) - this.luminance(l, u, v)) * hh));
      if (T < 1) motion = motion * T + Math.abs(
        this.luminance(S, u, v) + (this.luminance(L, u, v) - this.luminance(S, u, v)) * j -
        (this.luminance(O, u, v) + (this.luminance(B, u, v) - this.luminance(O, u, v)) * N)) * (1 - T);
      sumMotion += motion;

      const ang = 12.566 * vnoise(.71 * x, .71 * y + 3.1 * time);
      const y2 = focus > 0 ? Math.max(0, motion - focus) : motion;
      const gv = Math.min(1, 14 * (y2 > .008 ? (y2 - .008) / .992 : 0));
      const amp = .45 * gv * D * shake;
      const px = sx + Math.cos(ang) * amp, py = sy + Math.sin(ang) * amp;
      let rad = Q * (1 + .6 * gv * msize);
      this.sCurTrail[i] *= 1 - Math.min(1, 3 * dt);

      let trail = 0;
      if (cur) {
        const dx = sx - this.ptrX, dy = sy - this.ptrY, d2 = dx * dx + dy * dy;
        if (d2 < dist2) { let a = 1 - Math.sqrt(d2) / dist; a = smooth(a) * (this.ptrAmt * cfg.cursor); if (a > this.sCurTrail[i]) this.sCurTrail[i] = a; }
      }
      if (grow) { const a = instant ? trail : this.sCurTrail[i]; if (a > 0) rad *= 1 + .6 * a; }
      if (rad < .3) continue;

      let alpha = 1;
      if (tt) {
        if (reveal === "ripple" || reveal === "bloom") alpha = Math.max(0, Math.min(1, (tn - Math.hypot(sx - Z, sy - $)) / ti));
        else if (reveal === "fade" || reveal === "focus") alpha = te;
        else if (reveal === "luma") { const a = Math.max(0, Math.min(1, (te - .4 * Math.max(0, Math.min(1, 1 - val))) / .6)); alpha = smooth(a); }
        else if (reveal === "grow") { alpha = te; rad *= tr; }
        else if (reveal === "shimmer") { const a = Math.max(0, Math.min(1, (te - .55 * vnoise(.22 * x, .22 * y)) / .45)); alpha = smooth(a); }
        else if (reveal === "radial") alpha = +(Math.hypot(sx - Z, sy - $) < tn);
        else if (reveal === "square") alpha = +(Math.max(Math.abs(sx - Z), Math.abs(sy - $)) < tn);
        else { const i2 = noise(x, y); alpha = +(te > i2); }
      }
      if (rad < Q * .12) continue;

      let r, g2, b;
      if (this.COLF) {
        const col = this.colorAt(Ff, u, v);
        let cr = col[0], cg = col[1], cb = col[2];
        const nx = this.colorAt(Rf, u, v);
        cr += (nx[0] - cr) * k; cg += (nx[1] - cg) * k; cb += (nx[2] - cb) * k;
        if (T < 1) {
          const alt = this.colorAt(S, u, v), al2 = this.colorAt(L, u, v);
          const ar = alt[0] + (al2[0] - alt[0]) * j, ag = alt[1] + (al2[1] - alt[1]) * j, ab = alt[2] + (al2[2] - alt[2]) * j;
          cr = ar + (cr - ar) * T; cg = ag + (cg - ag) * T; cb = ab + (cb - ab) * T;
        }
        r = cr; g2 = cg; b = cb;
      } else {
        const s = .82 + .4 * val;
        r = this.sCR[i] * s; g2 = this.sCG[i] * s; b = this.sCB[i] * s;
      }
      if (tint) {
        const a = this.sCurTrail[i];
        if (a > 0) { r += (240 - r) * a; g2 += (240 - g2) * a; b += (240 - b) * a; }
      }
      this.dX[n] = px; this.dY[n] = py; this.dR[n] = rad;
      this.dCR[n] = r; this.dCG[n] = g2; this.dCB[n] = b; this.dAl[n] = alpha;
      n++; if (rad < minR) minR = rad; if (rad > maxR) maxR = rad;
    }

    /* 64-bucket counting sort by radius, then paint (big dots behind small ones) */
    const range = maxR - minR;
    if (range > 1e-6) {
      this.dCnt.fill(0);
      for (let i = 0; i < n; i++) { const b = (this.dR[i] - minR) / range * 63 | 0; this.dBk[i] = b; this.dCnt[b]++; }
      for (let i = 1; i < 64; i++) this.dCnt[i] += this.dCnt[i - 1];
      for (let i = n - 1; i >= 0; i--) this.dOrder[--this.dCnt[this.dBk[i]]] = i;
    } else for (let i = 0; i < n; i++) this.dOrder[i] = i;

    for (let i = 0; i < n; i++) {
      const e = this.dOrder[i];
      c.globalAlpha = this.dAl[e];
      c.fillStyle = this.colorString(this.dCR[e], this.dCG[e], this.dCB[e]);
      this.drawShape(this.dX[e], this.dY[e], this.dR[e], cfg.shape);
    }
    c.globalAlpha = 1;
    if (n) this.camLevel += (sumMotion / (Y * W) - this.camLevel) * .15;
    const ef = Ff;
    if (this.onFrame && ef !== this.lastEmitFrame) { this.lastEmitFrame = ef; this.onFrame({ frame: ef, progress: LF ? C / LF : 0, time, LF, playFps: this.playFps }); }
    this.rafId = (globalThis.requestAnimationFrame ?? (() => 0))(this.boundFrame);
  }
}

export { Canopy, MODE, undelta };
