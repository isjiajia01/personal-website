// Data for the Lab. Add an effect here, a component in components/lab/, and a line in components/lab/demos.tsx.
// Order is newest first; it sets the collage order and the prev/next links on detail pages.
//
// `layout` places the piece on the collage (a 12-column grid from 640px, one column below):
// - cols:   column span (and optional start / top offset) from sm up. Keep each row at 12 columns.
// - aspect: the print's shape; pick what suits the demo (tall for a phone-like UI, wide for scenes).
// - tilt:   how crooked the print is pinned, in degrees. Keep it within about ±2 and alternate the sign.
export type LabEffect = {
  slug: string;
  title: string;
  date: string;
  tags: string;
  summary: string;
  layout: { cols: string; aspect: string; tilt: number };
  repo: string; // source on GitHub
};

export const labEffects: LabEffect[] = [
  {
    slug: "bookshelf",
    title: "Bookshelf",
    date: "Nov 2026",
    tags: "React · CSS 3D · gestures",
    summary: "An endless shelf of spines, after SeaThru's shelf view. The front book turns to show its cover and leans toward the pointer. Drag, scroll sideways or use ← →; click the cover.",
    layout: { cols: "sm:col-span-10 sm:col-start-2", aspect: "aspect-[2/1]", tilt: 0.8 },
    repo: "https://github.com/isjiajia01/personal-website/blob/main/components/lab/bookshelf-demo.tsx",
  },
  {
    slug: "dither-clouds",
    title: "Dither clouds",
    date: "Nov 2026",
    tags: "Canvas · ordered dithering",
    summary: "Procedural clouds reduced to two colours with an 8×8 Bayer matrix. The pointer thins the dots out.",
    layout: { cols: "sm:col-span-7", aspect: "aspect-[4/3]", tilt: -1.2 },
    repo: "https://github.com/isjiajia01/personal-website/blob/main/components/lab/dither-demo.tsx",
  },
  {
    slug: "stacked-toasts",
    title: "Stacked toasts",
    date: "Nov 2026",
    tags: "React · CSS · gestures",
    summary: "Notifications slide in with a touch of motion blur and stack behind each other. Swipe to dismiss.",
    layout: { cols: "sm:col-span-5 sm:mt-12", aspect: "aspect-square", tilt: 1.6 },
    repo: "https://github.com/isjiajia01/personal-website/blob/main/components/lab/toast-demo.tsx",
  },
  {
    slug: "painterly-sky",
    title: "Painterly sky",
    date: "Oct 2026",
    tags: "WebGL2 · painterly",
    summary: "A procedural painted-gradient sky with brush dabs, from-scratch approximation of a meadow hero. Move the mouse.",
    layout: { cols: "sm:col-span-4 sm:mt-6", aspect: "aspect-[3/4]", tilt: 1 },
    repo: "https://github.com/isjiajia01/painterly-sky",
  },
  {
    slug: "ascii-ocean",
    title: "ASCII ocean",
    date: "Oct 2026",
    tags: "Canvas · ASCII · scenes",
    summary: "A koi pond, manta rays and deep-sea jellyfish drawn with characters. Keys 1/2/3 switch scene, S switches style, click to feed or ripple.",
    layout: { cols: "sm:col-span-8 sm:mt-2", aspect: "aspect-[16/10]", tilt: -0.8 },
    repo: "https://github.com/isjiajia01/ascii-ocean",
  },
  {
    slug: "dot-matrix",
    title: "Dot-matrix film",
    date: "Oct 2026",
    tags: "Canvas · custom format",
    summary: "A 64×36 dot-matrix video decoded from a 6-bit temporal-delta text format and drawn as jittering dots. The scene is my own generated sky.",
    layout: { cols: "sm:col-span-9 sm:col-start-3", aspect: "aspect-video", tilt: 0.6 },
    repo: "https://github.com/isjiajia01/canopy-dotmatrix",
  },
];

// "03": the specimen number shown on tiles and detail pages.
export const labNumber = (slug: string) => String(labEffects.findIndex((e) => e.slug === slug) + 1).padStart(2, "0");
