// Lets the Lab collage freeze this page while its tile is not being looked at. Load it with a
// classic <script> before the page's own scripts. The parent posts { lab: "hold" } or
// { lab: "play" }. While held, requestAnimationFrame callbacks are parked instead of run, so the
// last frame stays on the canvas and nothing is drawn or composited. A hold only lands once the
// page has had a moment to draw itself, so a frame that loads held still shows a picture.
(() => {
  const WARM_MS = 1500;
  const nativeRaf = globalThis.requestAnimationFrame.bind(globalThis);
  const nativeCancel = globalThis.cancelAnimationFrame.bind(globalThis);
  const parked = new Map();
  let nextId = -1;
  let held = false;
  let wanted = false;
  let warmTimer = 0;
  const started = performance.now();

  globalThis.requestAnimationFrame = (callback) => {
    if (!held) return nativeRaf(callback);
    const id = nextId--;
    parked.set(id, callback);
    return id;
  };
  globalThis.cancelAnimationFrame = (id) => {
    if (id < 0) parked.delete(id);
    else nativeCancel(id);
  };

  const apply = () => {
    clearTimeout(warmTimer);
    const wait = WARM_MS - (performance.now() - started);
    if (wanted && wait > 0) {
      warmTimer = setTimeout(apply, wait);
      return;
    }
    held = wanted;
    if (held) return;
    const callbacks = [...parked.values()];
    parked.clear();
    callbacks.forEach((callback) => nativeRaf(callback));
  };

  addEventListener("message", (e) => {
    if (e.origin !== location.origin || !e.data || typeof e.data.lab !== "string") return;
    wanted = e.data.lab === "hold";
    apply();
  });
})();
