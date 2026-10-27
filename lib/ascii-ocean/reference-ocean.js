// Creature rendering and simulation adapted from ascii-ocean.html.
// The original rasterizer, koi anatomy and jellyfish anatomy are kept together
// so their color, body-anchored patterns and edge glyphs match the reference.
export function createReferenceOcean(cv) {
const ctx = cv.getContext('2d');
const G = { W: 0, H: 0, dpr: 1, cw: 10, ch: 15, cols: 0, rows: 0, n: 0, t: 0 };
const pointer = { active: false };
let paper = null;
const TAU = Math.PI * 2;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
function angDiff(a, b) { let d = (b - a) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d; }
function hash(x, y, z) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function noise(x, y, seed) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return lerp(lerp(hash(xi, yi, seed), hash(xi + 1, yi, seed), u),
              lerp(hash(xi, yi + 1, seed), hash(xi + 1, yi + 1, seed), u), v);
}
// 无散度洋流（原仓库同款：流函数 ψ 的旋度）
function current(x, y, t, o) {
  const K1 = 1 / 260, K2 = 1 / 310, K3 = 1 / 190, S = 3400;
  const a = x * K1 + t * 0.07, b = y * K2 - t * 0.05, c = (x + y) * K3 + t * 0.11;
  o.x = (-K2 * Math.sin(a) * Math.sin(b) + 0.5 * K3 * Math.cos(c)) * S;
  o.y = (-K1 * Math.cos(a) * Math.cos(b) - 0.5 * K3 * Math.cos(c)) * S;
  return o;
}
function hsl(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  const f = (n) => { const k = (n + h * 12) % 12; return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}
const CUR = { x: 0, y: 0 };

// ════════════════════════════════════════════════════════════════
//  colour: 12-bit quantised, so cells can be bucket-sorted by style
// ════════════════════════════════════════════════════════════════
const HEX = '0123456789abcdef';
const STY = Array.from({ length: 4096 }, (_, i) => '#' + HEX[i >> 8] + HEX[(i >> 4) & 15] + HEX[i & 15]);
const q4 = (v) => (v <= 0 ? 0 : v >= 255 ? 15 : (v * 0.0588 + 0.5) | 0);
const Q = (r, g, b) => (q4(r) << 8) | (q4(g) << 4) | q4(b);
const NONE = 0xffff;
const GC = [];
const glyph = (code) => GC[code] || (GC[code] = String.fromCharCode(code));
const C = (s) => s.charCodeAt(0);

function alloc() {
  const n = G.n;
  G.chr = new Uint16Array(n); G.fg = new Uint16Array(n); G.bg = new Uint16Array(n);
  G.z = new Float32Array(n); G.shadow = new Uint8Array(n);
  G.h = new Float32Array(n); G.hp = new Float32Array(n);          // wave equation
  G.gr = new Float32Array(n); G.gg = new Float32Array(n); G.gb = new Float32Array(n); // glow rgb
  G.tr = new Float32Array(n); G.tg = new Float32Array(n); G.tb = new Float32Array(n);
  G.order = new Int32Array(n);
}
const cellAt = (x, y) => {
  const c = Math.floor(x / G.cw), r = Math.floor(y / G.ch);
  return c < 0 || r < 0 || c >= G.cols || r >= G.rows ? -1 : r * G.cols + c;
};
function put(i, z, code, fg, bg = NONE) {
  if (i < 0 || G.z[i] >= z) return false;
  G.z[i] = z; G.chr[i] = code; G.fg[i] = fg; G.bg[i] = bg;
  return true;
}

// 波动方程：经典 Hugo Elias 涟漪
function waveStep() {
  const { h, hp, cols, rows } = G;
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      const i = r * cols + c;
      hp[i] = ((h[i - 1] + h[i + 1] + h[i - cols] + h[i + cols]) * 0.5 - hp[i]) * 0.972;
    }
  }
  G.h = hp; G.hp = h;
}
function drop(x, y, rad, amt) {
  const c0 = Math.floor(x / G.cw), r0 = Math.floor(y / G.ch);
  for (let r = r0 - rad; r <= r0 + rad; r++) for (let c = c0 - rad; c <= c0 + rad; c++) {
    if (c < 1 || r < 1 || c >= G.cols - 1 || r >= G.rows - 1) continue;
    const d = Math.hypot(c - c0, (r - r0) * 1.5);
    if (d <= rad) G.h[r * G.cols + c] += amt * Math.cos((d / rad) * Math.PI * 0.5);
  }
}
// 三通道辉光：模糊 + 衰减
function glowStep(dt) {
  const { cols, rows } = G, k = Math.exp(-dt * 1.7) * 0.125;
  const blur = (src, dst) => {
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c, v = src[i];
      dst[i] = (v * 4 + (c > 0 ? src[i - 1] : v) + (c < cols - 1 ? src[i + 1] : v) +
        (r > 0 ? src[i - cols] : v) + (r < rows - 1 ? src[i + cols] : v)) * k;
    }
  };
  blur(G.gr, G.tr); blur(G.gg, G.tg); blur(G.gb, G.tb);
  [G.gr, G.tr] = [G.tr, G.gr]; [G.gg, G.tg] = [G.tg, G.gg]; [G.gb, G.tb] = [G.tb, G.gb];
}
function glow(x, y, rad, r, g, b) {
  const c0 = Math.floor(x / G.cw), r0 = Math.floor(y / G.ch);
  for (let rr = r0 - rad; rr <= r0 + rad; rr++) for (let c = c0 - rad; c <= c0 + rad; c++) {
    if (c < 0 || rr < 0 || c >= G.cols || rr >= G.rows) continue;
    const d = Math.hypot(c - c0, (rr - r0) * 1.5);
    if (d > rad + 0.5) continue;
    const f = 1 - d / (rad + 1), i = rr * G.cols + c;
    G.gr[i] = Math.min(2, G.gr[i] + r * f); G.gg[i] = Math.min(2, G.gg[i] + g * f); G.gb[i] = Math.min(2, G.gb[i] + b * f);
  }
}

const O = { r: 0, g: 0, b: 0, sh: 0, s: 0, v: 0, set: null };
const RAMP_BLOCK = ':;t%SX8#@';   // 亮处稀疏，暗处密（原仓库思路）
const RAMP_INK = '.:-=+*#%@';     // 线墨模式：亮处密
// 设计点 A：按覆盖梯度（指向形体内部的方向）选择轮廓字符
//   扇区：右 下右 下 下左 左 上左 上 上右
const EDGE = ['(', '/', '_', '\\', ')', '/', '¯', '\\'].map(C);
const LINE = ['-', '\\', '|', '/'].map(C);

let STYLE = 'block';

function raster(cr, z) {
  const { cw, ch, cols, rows } = G, b = cr.bounds, t = G.t;
  const c0 = Math.max(0, Math.floor(b.x0 / cw)), c1 = Math.min(cols - 1, Math.floor(b.x1 / cw));
  const r0 = Math.max(0, Math.floor(b.y0 / ch)), r1 = Math.min(rows - 1, Math.floor(b.y1 / ch));
  const dim = cr.dim ?? 1, glint = cr.glint ?? 0.04;
  for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
    const i = r * cols + c;
    if (G.z[i] >= z) continue;
    const x = c * cw, y = r * ch;
    let hits = 0, gx = 0, gy = 0, center = false, got = false;
    let R = 0, Gc = 0, B = 0, sh = 0, s = 0, v = 0, set = null;
    for (let k = 0; k < 9; k++) {
      const ix = k % 3, iy = (k / 3) | 0;
      if (!cr.sample(x + (ix + 0.5) * cw / 3, y + (iy + 0.5) * ch / 3)) continue;
      hits++; gx += ix - 1; gy += iy - 1;
      if (k === 4 || !got) { R = O.r; Gc = O.g; B = O.b; sh = O.sh; s = O.s; v = O.v; set = O.set; got = true; if (k === 4) center = true; }
    }
    if (!hits) continue;
    const cov = hits / 9;
    const solid = center && cov >= 0.67;
    if (!solid && G.z[i] > -1e8 && cov < 0.45) continue;   // 不让细边缘吃掉下层身体
    const key = (hash(Math.round(s / (cw * 0.9)), Math.round(v / (ch * 0.75)), cr.id) * 4294967295) >>> 0;
    R *= dim; Gc *= dim; B *= dim;
    G.z[i] = z;
    if (solid) {
      if (cr.shadow) { const si = i + cr.shadow[1] * cols + cr.shadow[0]; if (si < G.n) G.shadow[si] = 1; }
      const jit = ((key >>> 4) % 3) - 1;
      const roll = hash(key, Math.floor(t * 2.4 + (key % 997) / 97), 7);
      if (STYLE === 'block') {
        const L = 0.2 + 0.85 * sh;
        G.bg[i] = Q(R * L, Gc * L, B * L);
        G.chr[i] = set ? C(set[(key >>> 8) % set.length]) : C(RAMP_BLOCK[clamp(Math.floor((1 - sh) * 8.99) + jit, 0, 8)]);
        G.fg[i] = roll < glint ? Q(255, 252, 240) : Q(R * L * 0.3, Gc * L * 0.3, B * L * 0.3);
      } else {
        const L = 0.28 + 0.85 * sh;
        G.bg[i] = NONE;
        G.chr[i] = set ? C(set[(key >>> 8) % set.length]) : C(RAMP_INK[clamp(Math.floor(sh * 8.99) + jit, 0, 8)]);
        G.fg[i] = roll < glint * 0.6 ? Q(255, 252, 240) : Q(R * L, Gc * L, B * L);
      }
    } else {
      let code;
      if (gx === 0 && gy === 0) code = cov > 0.4 ? C(':') : C('.');
      else {
        const a = Math.atan2(gy * ch, gx * cw);
        code = EDGE[((Math.round(a / (Math.PI / 4)) % 8) + 8) % 8];
        if (cov < 0.3) code = gy > 0 ? C('.') : gy < 0 ? C("'") : code;
      }
      const L = (0.35 + 0.65 * cov) * (0.55 + 0.45 * sh);
      G.chr[i] = code; G.bg[i] = NONE; G.fg[i] = Q(R * L, Gc * L, B * L);
    }
  }
}

// 设计点 D：按线段角度选字符画线（触手、尾鞭、胡须）
function plotLine(x0, y0, x1, y1, z, fg, curve = 0) {
  const dx = x1 - x0, dy = y1 - y0;
  const steps = Math.max(1, Math.ceil(Math.max(Math.abs(dx) / G.cw, Math.abs(dy) / G.ch)) + 1);
  const a = Math.atan2(dy, dx);
  let code = LINE[((Math.round(a / (Math.PI / 4)) % 4) + 4) % 4];
  if (code === LINE[2] && curve) code = curve > 0 ? C(')') : C('(');
  for (let k = 0; k <= steps; k++) {
    const t = k / steps;
    put(cellAt(x0 + dx * t, y0 + dy * t), z, code, fg);
  }
}
function plotChain(pts, M, z, colorAt, wobble = 0, phase = 0) {
  let px = pts[0], py = pts[1];
  for (let j = 1; j < M; j++) {
    let x = pts[j * 2], y = pts[j * 2 + 1];
    if (wobble) { x += Math.sin(j * 0.9 - phase) * wobble * (j / M); }
    const nx = j < M - 1 ? pts[j * 2 + 2] : x, ny = j < M - 1 ? pts[j * 2 + 3] : y;
    const curve = (x - px) * (ny - y) - (y - py) * (nx - x);
    plotLine(px, py, x, y, z, colorAt(j / M), Math.abs(curve) > 6 ? Math.sign(curve) : 0);
    px = x; py = y;
  }
}

// ════════════════════════════════════════════════════════════════
//  draw: bucket by colour so each fillStyle is set once
// ════════════════════════════════════════════════════════════════
const CNT = new Int32Array(4097);
function drawBuckets(arr, glyphs) {
  const { n, cols, cw, ch, order, chr } = G;
  CNT.fill(0);
  for (let i = 0; i < n; i++) { const q = arr[i]; if (q !== NONE && (!glyphs || chr[i])) CNT[q + 1]++; }
  for (let b = 1; b <= 4096; b++) CNT[b] += CNT[b - 1];
  const start = CNT.slice(0, 4096), cur = start.slice();
  for (let i = 0; i < n; i++) { const q = arr[i]; if (q !== NONE && (!glyphs || chr[i])) order[cur[q]++] = i; }
  for (let q = 0; q < 4096; q++) {
    const s0 = start[q], s1 = cur[q];
    if (s0 === s1) continue;
    ctx.fillStyle = STY[q];
    for (let k = s0; k < s1; k++) {
      const i = order[k], x = (i % cols) * cw, y = ((i / cols) | 0) * ch;
      if (glyphs) ctx.fillText(glyph(chr[i]), x + cw / 2, y + ch / 2 + 1);
      else ctx.fillRect(x + 1, y + 1, cw - 1, ch - 1);
    }
  }
}

let NEXT_ID = 1;
const KOI_VARIETIES = ['kohaku', 'sanke', 'showa', 'ogon', 'tancho', 'asagi', 'kigoi'];
const FIN_SET = '~-=';
class Koi {
  constructor(x, y, L, variety) {
    this.id = NEXT_ID++; this.L = L; this.variety = variety; this.seed = (Math.random() * 1000) | 0;
    this.N = 24; this.seg = L / (this.N - 1);
    this.nodes = new Float32Array(this.N * 2); this.sp = new Float32Array(this.N * 2); this.arc = new Float32Array(this.N);
    this.heading = rand(0, TAU); this.speed = rand(28, 40); this.phase = rand(0, TAU);
    this.wander = 0; this.turn = 0; this.shadow = [2, 1]; this.glint = variety === 'ogon' ? 0.1 : 0.035;
    for (let k = 0; k < this.N; k++) {
      this.nodes[k * 2] = x - Math.cos(this.heading) * this.seg * k;
      this.nodes[k * 2 + 1] = y - Math.sin(this.heading) * this.seg * k;
    }
    this.bounds = { x0: 0, y0: 0, x1: 0, y1: 0 };
  }
  get hx() { return this.nodes[0]; }
  get hy() { return this.nodes[1]; }
  update(dt, scene) {
    const { W, H } = G, n = this.nodes, hx = n[0], hy = n[1];
    let vx = Math.cos(this.heading), vy = Math.sin(this.heading), target = 34;
    this.wander = clamp(this.wander + (Math.random() - 0.5) * dt * 3, -1, 1);
    const wa = this.heading + this.wander * 0.9;
    vx += Math.cos(wa) * 0.6; vy += Math.sin(wa) * 0.6;
    // 食物：最近的一颗
    let best = null, bd = 420;
    for (const f of scene.food) { const d = Math.hypot(f.x - hx, f.y - hy); if (d < bd) { bd = d; best = f; } }
    if (best) {
      vx += (best.x - hx) / bd * 2.4; vy += (best.y - hy) / bd * 2.4; target = 70;
      if (bd < this.L * 0.09) {
        best.eaten = true; drop(best.x, best.y, 2, 2.2); glow(best.x, best.y, 2, 0.5, 0.35, 0.15);
      }
    } else if (pointer.active) {
      const d = Math.hypot(pointer.x - hx, pointer.y - hy);
      if (d < 260 && d > 30) { vx += (pointer.x - hx) / d * 0.5; vy += (pointer.y - hy) / d * 0.5; }
    }
    // 墙
    const m = this.L * 0.5;
    if (hx < m) vx += (m - hx) / m * 2; if (hx > W - m) vx -= (hx - W + m) / m * 2;
    if (hy < m) vy += (m - hy) / m * 2; if (hy > H - m) vy -= (hy - H + m) / m * 2;
    // 分离
    for (const o of scene.koi) {
      if (o === this) continue;
      const dx = hx - o.hx, dy = hy - o.hy, d = Math.hypot(dx, dy);
      if (d < this.L * 0.55 && d > 0) { vx += dx / d * 1.2; vy += dy / d * 1.2; }
    }
    const want = Math.atan2(vy, vx);
    const maxTurn = 1.5 + (target > 40 ? 1.2 : 0);
    const dh = clamp(angDiff(this.heading, want), -maxTurn * dt, maxTurn * dt);
    this.heading += dh; this.turn = lerp(this.turn, dh / dt, 0.1);
    this.speed = lerp(this.speed, target, dt * 1.2);
    n[0] += Math.cos(this.heading) * this.speed * dt;
    n[1] += Math.sin(this.heading) * this.speed * dt;
    for (let k = 1; k < this.N; k++) {
      const px = n[(k - 1) * 2], py = n[(k - 1) * 2 + 1];
      const a = Math.atan2(n[k * 2 + 1] - py, n[k * 2] - px);
      n[k * 2] = px + Math.cos(a) * this.seg; n[k * 2 + 1] = py + Math.sin(a) * this.seg;
    }
    this.phase += dt * (2 + this.speed * 0.07);
    // 尾巴扫水 → 波动场
    const ti = cellAt(n[(this.N - 5) * 2], n[(this.N - 5) * 2 + 1]);
    if (ti >= 0) G.h[ti] += dt * this.speed * 0.012 * Math.sin(this.phase);
  }
  prepare() {
    // 原仓库同款：沿脊柱传播的波，越靠尾越大
    const { N, nodes: n, sp, arc, L } = this, swim = clamp(this.speed / 40, 0.5, 1.6);
    for (let k = 0; k < N; k++) {
      const s = k / (N - 1), a = Math.max(0, k - 1), b = Math.min(N - 1, k + 1);
      let tx = n[a * 2] - n[b * 2], ty = n[a * 2 + 1] - n[b * 2 + 1]; const tl = Math.hypot(tx, ty) || 1;
      tx /= tl; ty /= tl;
      const off = L * 0.05 * (0.12 + 0.88 * Math.pow(s, 1.7)) * swim * Math.sin(this.phase - s * 5.4);
      sp[k * 2] = n[k * 2] - ty * off; sp[k * 2 + 1] = n[k * 2 + 1] + tx * off;
    }
    arc[0] = 0;
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (let k = 0; k < N; k++) {
      if (k) arc[k] = arc[k - 1] + Math.hypot(sp[k * 2] - sp[k * 2 - 2], sp[k * 2 + 1] - sp[k * 2 - 1]);
      x0 = Math.min(x0, sp[k * 2]); x1 = Math.max(x1, sp[k * 2]); y0 = Math.min(y0, sp[k * 2 + 1]); y1 = Math.max(y1, sp[k * 2 + 1]);
    }
    this.arcT = arc[N - 1] || 1;
    const m = L * 0.24;
    Object.assign(this.bounds, { x0: x0 - m, y0: y0 - m, x1: x1 + m, y1: y1 + m });
  }
  hw(s) {
    if (s < 0.1) return 0.11 * Math.pow(Math.sin((s / 0.1) * Math.PI / 2), 0.5);
    if (s < 0.33) return 0.11 + 0.03 * smooth(0.1, 0.33, s);
    if (s < 0.8) return 0.03 + 0.11 * Math.pow(1 - (s - 0.33) / 0.47, 1.25);
    return 0.03;
  }
  paint(u, v, across) {
    const L = this.L, sc = L * 0.17, x = u / sc, y = v / sc, sd = this.seed;
    let r = 244, g = 240, b = 230;
    const n = noise(x + sd, y * 1.2 + sd, 1) * 0.7 + noise(x * 2.1 + sd, y * 2.1, 2) * 0.3;
    switch (this.variety) {
      case 'kohaku': if (n > 0.5) { r = 226; g = 62; b = 34; } break;
      case 'sanke':
        if (n > 0.54) { r = 226; g = 62; b = 34; }
        if (u > L * 0.12 && noise(x * 2.6, y * 2.6 + sd, 5) > 0.74) { r = 24; g = 24; b = 28; } break;
      case 'showa':
        r = 34; g = 32; b = 38;
        if (n > 0.52) { r = 228; g = 70; b = 36; } else if (noise(x * 1.7 + 9, y * 1.7, 6) > 0.58) { r = 240; g = 236; b = 226; } break;
      case 'ogon': { const k = 0.82 + 0.3 * noise(x * 3, y * 3, 7); r = 248 * k; g = 186 * k; b = 70 * k; } break;
      case 'tancho': if (Math.hypot(u - L * 0.09, v * 1.1) < L * 0.055) { r = 222; g = 40; b = 30; } break;
      case 'asagi':
        if (across > 0.72 && u < L * 0.76) { r = 224; g = 110; b = 52; }
        else { r = 98; g = 128; b = 160; if (hash(Math.round(u / (L * 0.04)), Math.round(v / (L * 0.035)), sd) > 0.6) { r *= 0.78; g *= 0.8; b *= 0.85; } }
        if (u < L * 0.08) { r = 204; g = 212; b = 218; } break;
      case 'kigoi': r = 246; g = 212; b = 78; break;
    }
    O.r = r; O.g = g; O.b = b;
  }
  sample(px, py) {
    const { sp, N, arc, L } = this;
    let best = 1e18, bs = 0, sign = 1, nx = 0, ny = 0;
    for (let k = 0; k < N - 1; k++) {
      const ax = sp[k * 2], ay = sp[k * 2 + 1], sx = sp[k * 2 + 2] - ax, sy = sp[k * 2 + 3] - ay;
      const l2 = sx * sx + sy * sy || 1;
      const u = clamp(((px - ax) * sx + (py - ay) * sy) / l2, 0, 1);
      const qx = ax + sx * u - px, qy = ay + sy * u - py, d2 = qx * qx + qy * qy;
      if (d2 < best) {
        best = d2; const l = Math.sqrt(l2);
        bs = (arc[k] + u * l) / this.arcT;
        sign = sx * (py - ay) - sy * (px - ax) >= 0 ? 1 : -1;
        nx = (-sy / l) * sign; ny = (sx / l) * sign;
      }
    }
    const a = Math.sqrt(best), s = bs, u = s * L, w = this.hw(s) * L;
    O.s = u; O.v = a * sign; O.set = null;
    if (s < 0.8 && a <= w) {
      const ac = a / (w || 1), facing = (nx * -0.6 + ny * -0.8) * ac;
      let sh = 0.64 - ac * ac * 0.38 + facing * 0.28;
      this.paint(u, a * sign, ac);
      if (s > 0.05 && s < 0.095 && ac > 0.5 && ac < 0.92) { O.r = O.g = O.b = 30; sh = 0.15; O.set = 'o'; }
      else if (s > 0.3 && s < 0.6 && ac < 0.16) sh = Math.min(1, sh + 0.22);   // 背鳍脊
      O.sh = clamp(sh, 0, 1); return true;
    }
    const finColor = (at) => { this.paint(at * L, 0, 0); O.r = lerp(O.r, 250, 0.35); O.g = lerp(O.g, 246, 0.35); O.b = lerp(O.b, 240, 0.35); O.set = FIN_SET; };
    // 尾鳍：飘逸的扇形 + V 形分叉
    if (s >= 0.78) {
      const k = (s - 0.78) / 0.22;
      const half = L * (0.03 + 0.115 * Math.pow(k, 0.85)) * (1 + 0.08 * Math.sin(s * 40 - this.phase * 3));
      if (a <= half && !(k > 0.55 && a < L * 0.1 * smooth(0.55, 1, k))) { finColor(0.8); O.sh = 0.5 + 0.3 * (1 - a / half); return true; }
    }
    // 胸鳍：椭圆，随相位扇动
    const fs = 0.22, uc = fs * L, wf = this.hw(fs) * L;
    const flap = 0.7 + 0.3 * Math.sin(this.phase * 0.9 + (sign > 0 ? 0 : Math.PI));
    const ru = L * 0.055, rv = L * 0.06 * flap;
    const du = (u - uc - (a - wf) * 0.55) / ru, dv = (a - wf - rv * 0.8) / rv;
    if (du * du + dv * dv <= 1) { finColor(0.2); O.sh = 0.45 + 0.3 * (1 - dv * dv); return true; }
    // 腹鳍
    const pu = (u - 0.52 * L - (a - this.hw(0.52) * L) * 0.6) / (L * 0.035), pv = (a - this.hw(0.52) * L - L * 0.02) / (L * 0.025);
    if (pu * pu + pv * pv <= 1) { finColor(0.5); O.sh = 0.5; return true; }
    return false;
  }
  whiskers(z) {
    const sp = this.sp, hx = sp[0], hy = sp[1], dx = sp[0] - sp[4], dy = sp[1] - sp[5], l = Math.hypot(dx, dy) || 1;
    const fx = dx / l, fy = dy / l, len = this.L * 0.07, col = Q(200, 190, 170);
    for (const side of [-1, 1]) {
      const wob = Math.sin(this.phase * 1.3 + side) * 0.25;
      const ex = hx + (fx * 0.5 - fy * side * (0.85 + wob)) * len, ey = hy + (fy * 0.5 + fx * side * (0.85 + wob)) * len;
      plotLine(hx + fx * 3, hy + fy * 3, ex, ey, 2.5, col);
    }
  }
}

const RADIAL = ['-', '\\', '|', '/'];
class Jelly {
  constructor(x, y, R, hue, depth) {
    this.id = NEXT_ID++; this.x = x; this.y = y; this.R = R; this.hue = hue; this.depth = depth;
    this.vx = 0; this.vy = 0; this.phase = rand(0, TAU); this.rate = rand(0.8, 1.15);
    this.tilt = rand(-0.3, 0.3); this.c = 0; this.flash = 0; this.dim = 0.55 + 0.6 * depth; this.glint = 0;
    this.chains = [];
    const nt = 8;
    for (let i = 0; i < nt; i++) this.chains.push(this.makeChain(-0.92 + (1.84 * i) / (nt - 1), 0.1, R * rand(2.2, 3.4), 16, false));
    for (const ax of [-0.26, -0.09, 0.09, 0.26]) this.chains.push(this.makeChain(ax, 0.02, R * rand(1.3, 1.8), 10, true));
    this.bounds = {};
  }
  makeChain(ax, ay, len, M, arm) {
    const pts = new Float32Array(M * 2), prev = new Float32Array(M * 2), seg = len / (M - 1);
    for (let j = 0; j < M; j++) { pts[j * 2] = prev[j * 2] = this.x + ax * this.R; pts[j * 2 + 1] = prev[j * 2 + 1] = this.y + j * seg; }
    return { ax, ay, M, seg, pts, prev, arm };
  }
  local(lx, ly) { const c = Math.cos(this.tilt), s = Math.sin(this.tilt); return [this.x + lx * c - ly * s, this.y + lx * s + ly * c]; }
  update(dt) {
    const { W, H } = G, R = this.R;
    this.phase += dt * TAU * 0.45 * this.rate;
    const f = (this.phase / TAU) % 1;
    this.c = f < 0.22 ? smooth(0, 0.22, f) : 1 - smooth(0.22, 1, f);
    const dirx = Math.sin(this.tilt), diry = -Math.cos(this.tilt);
    if (f < 0.22) { this.vx += dirx * R * 3.4 * dt; this.vy += diry * R * 3.4 * dt; }
    const drag = Math.exp(-dt * 0.9);
    this.vx *= drag; this.vy = this.vy * drag + 7 * dt;
    current(this.x, this.y, G.t, CUR);
    const target = clamp((W / 2 - this.x) / W * 0.8 + Math.sin(G.t * 0.1 + this.id) * 0.25, -0.5, 0.5);
    this.tilt += (target - this.tilt) * dt * 0.25;
    let mx = (this.vx + CUR.x * 0.2) * dt, my = (this.vy + CUR.y * 0.2) * dt;
    // 环绕：整组触手一起平移
    if (this.y < -R * 4) my += H + R * 6; else if (this.y > H + R * 4) my -= H + R * 6;
    mx = clamp(this.x + mx, this.side < 0 ? 0 : paper.x1, this.side < 0 ? paper.x0 : W) - this.x;
    this.x += mx; this.y += my;
    const wrapped = Math.abs(mx) > R || Math.abs(my) > R;
    this.flash *= Math.exp(-dt * 2);
    const rx = R * (1 - 0.17 * this.c);
    for (const ch of this.chains) {
      const { pts, prev, M, seg } = ch;
      if (wrapped) for (let j = 0; j < M; j++) { pts[j * 2] += mx; pts[j * 2 + 1] += my; prev[j * 2] += mx; prev[j * 2 + 1] += my; }
      const [axw, ayw] = this.local(ch.ax * rx, ch.ay * R);
      pts[0] = prev[0] = axw; pts[1] = prev[1] = ayw;
      for (let j = 1; j < M; j++) {
        const x = pts[j * 2], y = pts[j * 2 + 1];
        const vx = (x - prev[j * 2]) * 0.96, vy = (y - prev[j * 2 + 1]) * 0.96;
        prev[j * 2] = x; prev[j * 2 + 1] = y;
        pts[j * 2] = x + vx + CUR.x * 0.1 * dt; pts[j * 2 + 1] = y + vy + 30 * dt * dt;
      }
      for (let it = 0; it < 2; it++) for (let j = 1; j < M; j++) {
        const dx = pts[j * 2] - pts[j * 2 - 2], dy = pts[j * 2 + 1] - pts[j * 2 - 1], d = Math.hypot(dx, dy) || 1;
        pts[j * 2] = pts[j * 2 - 2] + (dx / d) * seg; pts[j * 2 + 1] = pts[j * 2 - 1] + (dy / d) * seg;
      }
    }
    const [r, g, b] = hsl(this.hue, 0.8, 0.5);
    const k = (0.012 + 0.03 * this.c + 0.06 * this.flash) * this.dim;
    glow(this.x, this.y - R * 0.3, Math.max(2, Math.round(R / G.ch)), r / 255 * k, g / 255 * k, b / 255 * k);
    const m = R * 1.3; Object.assign(this.bounds, { x0: this.x - m, y0: this.y - m, x1: this.x + m, y1: this.y + m });
  }
  sample(px, py) {
    const R = this.R, c = Math.cos(-this.tilt), s = Math.sin(-this.tilt);
    const dx = px - this.x, dy = py - this.y, x = dx * c - dy * s, y = dx * s + dy * c;
    const rx = R * (1 - 0.17 * this.c), ry = R * (0.72 + 0.16 * this.c);
    const ang = Math.atan2(x, -y);
    O.s = ang * R; O.v = y; O.set = null;
    const band = Math.sin(ang * 3 - G.t * 2.2 + this.id) * 28;
    const color = (l) => { const [r, g, b] = hsl(this.hue + band + this.flash * 40, 0.75, clamp(l + this.flash * 0.25, 0, 0.9)); O.r = r; O.g = g; O.b = b; };
    if (y <= 0) {
      const e = (x / rx) ** 2 + (y / ry) ** 2;
      if (e > 1) return false;
      const ei = (x / (rx * 0.84)) ** 2 + ((y + ry * 0.04) / (ry * 0.55)) ** 2;
      // 生殖腺（月水母的四叶）
      const gd = Math.min(Math.hypot(x - rx * 0.26, (y + ry * 0.42) * 1.3), Math.hypot(x + rx * 0.26, (y + ry * 0.42) * 1.3));
      if (gd > R * 0.08 && gd < R * 0.16) { color(0.62); O.sh = 0.75; O.set = 'oO'; return true; }
      if (ei < 1) { color(0.3); O.sh = 0.1 + 0.15 * ei; O.set = '.:'; return true; }   // 半透明的伞下腔
      const rim = smooth(0.55, 1, e);
      const canal = Math.abs(((ang * 8) / TAU + 0.5) % 1 - 0.5) < 0.07;
      color(0.45 + 0.15 * rim);
      O.sh = 0.25 + 0.55 * rim + (canal ? 0.2 : 0);
      if (canal) O.set = RADIAL[((Math.round((ang + Math.PI / 2) / (Math.PI / 4)) % 4) + 4) % 4];
      return true;
    }
    // 伞缘（扇贝形的垂片）
    const ax = Math.abs(x) / rx;
    if (ax > 1 || ax < 0.7) return false;
    const lim = R * 0.14 * (0.55 + 0.45 * Math.cos(x / rx * Math.PI * 7 + this.phase * 0.5)) * (0.6 + 0.4 * this.c);
    if (y > lim) return false;
    color(0.55); O.sh = 0.6; O.set = '\'`';
    return true;
  }
  render(z) {
    const [r, g, b] = hsl(this.hue, 0.7, 0.55), d = this.dim, t = G.t;
    for (const ch of this.chains) {
      const base = ch.arm ? 0.7 : 0.38;
      plotChain(ch.pts, ch.M, z - 0.001, (f) => { const k = (1 - f * 0.75) * base * d; return Q(r * k, g * k, b * k); }, ch.arm ? this.R * 0.12 : this.R * 0.05, t * 2 + ch.ax * 5);
    }
    raster(this, z);
  }
}


let jellies = [], koi = new Map(), rings = [];
function resize(W, H, dpr, cw, ch) {
  if (G.W === W && G.H === H && G.cw === cw && G.ch === ch && G.dpr === dpr) return;
  Object.assign(G, { W, H, dpr, cw, ch, cols: Math.ceil(W / cw), rows: Math.ceil(H / ch) });
  G.n = G.cols * G.rows; alloc(); jellies = []; koi.clear(); rings = [];
}
function update(dt, obstacle) {
  paper = obstacle; G.t += dt;
  if (!paper) { jellies = []; return; }
  for (const side of [-1, 1]) {
    const lane = Math.max(0, side < 0 ? paper.x0 : G.W - paper.x1);
    if (lane < 24) { jellies = jellies.filter(j => j.side !== side); continue; }
    const existing = jellies.filter(j => j.side === side);
    while (existing.length < 2) {
      const i = existing.length, R = clamp(lane * 0.45, 14, 90) * (i ? 0.75 : 1);
      const x = side < 0 ? lane * (0.42 + i * 0.2) : G.W - lane * (0.42 + i * 0.2);
      const j = new Jelly(x, G.H * (i ? 0.7 : 0.32), R, [188, 282, 322, 168][(side < 0 ? 0 : 2) + i], i ? 0.65 : 1);
      j.side = side; existing.push(j); jellies.push(j);
    }
    for (const j of existing) j.update(dt);
  }
  for (const ring of rings) {
    ring.r += dt * 260; ring.life -= dt * 0.7;
    const steps = Math.ceil(ring.r * TAU / G.cw);
    for (let k = 0; k < steps; k += 2) {
      const a = k / steps * TAU;
      const i = cellAt(ring.x + Math.cos(a) * ring.r, ring.y + Math.sin(a) * ring.r);
      if (i >= 0) { G.gr[i] += 0.03 * ring.life; G.gg[i] += 0.08 * ring.life; G.gb[i] += 0.12 * ring.life; }
    }
    for (const j of jellies) {
      if (j.hitBy === ring) continue;
      const d = Math.hypot(j.x - ring.x, j.y - ring.y);
      if (Math.abs(d - ring.r) < j.R) {
        j.hitBy = ring; j.flash = 1;
        const safe = d || 1;
        j.vx += (j.x - ring.x) / safe * 60 * ring.life;
        j.vy += (j.y - ring.y) / safe * 60 * ring.life;
        j.phase = Math.floor(j.phase / TAU) * TAU + TAU;
      }
    }
  }
  rings = rings.filter(ring => ring.life > 0);
  glowStep(dt);
}
function click(x, y) {
  rings.push({ x, y, r: 4, life: 1 });
  if (rings.length > 20) rings.shift();
  glow(x, y, 2, 0.2, 0.5, 0.7);
}
function begin(style) { STYLE = style; G.z.fill(-1e9); G.chr.fill(0); G.bg.fill(NONE); G.fg.fill(NONE); G.shadow.fill(0); }
function finish() {
  ctx.setTransform(G.dpr, 0, 0, G.dpr, 0, 0);
  drawBuckets(G.bg, false);
  ctx.font = `600 ${Math.round(G.ch * 0.74)}px ${getComputedStyle(cv).fontFamily}`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; drawBuckets(G.fg, true);
}
function renderKoi(world) {
  G.t = world.time; begin('block');
  for (const sh of world.sharks) {
    let k = koi.get(sh.id);
    if (!k || k.L !== sh.length) { k = new Koi(sh.nodes[0], sh.nodes[1], sh.length, KOI_VARIETIES[(sh.id - 1) % KOI_VARIETIES.length]); koi.set(sh.id, k); }
    k.N = sh.nodes.length / 2; k.nodes = sh.nodes; k.sp = new Float32Array(sh.nodes.length); k.arc = new Float32Array(k.N);
    k.speed = sh.speed; k.phase = sh.phase; k.prepare(); raster(k, 2 + sh.depth); k.whiskers(2 + sh.depth);
  }
  for (const food of world.food) put(cellAt(food.x, food.y), 9, C('o'), Q(180, 105, 55));
  ctx.save(); ctx.setTransform(G.dpr, 0, 0, G.dpr, 0, 0);
  if (world.obstacle) {
    ctx.beginPath(); ctx.rect(0, 0, G.W, G.H);
    ctx.rect(world.obstacle.x0, world.obstacle.y0, world.obstacle.x1 - world.obstacle.x0, world.obstacle.y1 - world.obstacle.y0);
    ctx.clip('evenodd');
  }
  finish(); ctx.restore();
}
function renderJelly(obstacle) {
  paper = obstacle; begin('ink');
  ctx.setTransform(G.dpr, 0, 0, G.dpr, 0, 0); ctx.fillStyle = 'rgb(1,2,9)'; ctx.fillRect(0, 0, G.W, G.H);
  if (!paper) return;
  for (const j of jellies) j.render(2 + j.depth);
  for (let i = 0; i < G.n; i++) {
    const gl = G.gr[i] + G.gg[i] + G.gb[i];
    if (gl < 0.05) continue;
    G.bg[i] = Q(1 + G.gr[i] * 60, 2 + G.gg[i] * 60, 9 + G.gb[i] * 60);
    if (G.z[i] < -1e8 && gl > 0.12) {
      G.z[i] = -20; G.chr[i] = C('·'); G.fg[i] = Q(G.gr[i] * 380, G.gg[i] * 380, G.gb[i] * 380);
    }
  }
  ctx.save(); ctx.beginPath();
  ctx.rect(0, 0, Math.max(0, paper.x0), G.H);
  ctx.rect(Math.min(G.W, paper.x1), 0, Math.max(0, G.W - paper.x1), G.H);
  ctx.clip(); finish(); ctx.restore();
}
return { resize, update, click, renderKoi, renderJelly };
}
