// Data for the Lab. Add an effect here, a component in components/lab/, and a line in components/lab/demos.tsx.
export type LabEffect = {
  slug: string;
  title: string;
  date: string;
  tags: string;
  summary: string;
  span: string; // bento tile size
  repo: string; // source on GitHub
};

export const labEffects: LabEffect[] = [
  {
    slug: "dither-clouds",
    title: "Dither clouds",
    date: "Nov 2026",
    tags: "Canvas · ordered dithering",
    summary: "Procedural clouds reduced to two colours with an 8×8 Bayer matrix. The pointer thins the dots out.",
    span: "col-span-2 row-span-2",
    repo: "https://github.com/isjiajia01/personal-website/blob/main/components/lab/dither-demo.tsx",
  },
  {
    slug: "ascii-ocean",
    title: "ASCII ocean",
    date: "Oct 2026",
    tags: "Canvas · ASCII · scenes",
    summary: "A koi pond, manta rays and deep-sea jellyfish drawn with characters. Keys 1/2/3 switch scene, S switches style, click to feed or ripple.",
    span: "col-span-2",
    repo: "https://github.com/isjiajia01/ascii-ocean",
  },
  {
    slug: "painterly-sky",
    title: "Painterly sky",
    date: "Oct 2026",
    tags: "WebGL2 · painterly",
    summary: "A procedural painted-gradient sky with brush dabs, from-scratch approximation of a meadow hero. Move the mouse.",
    span: "col-span-2",
    repo: "https://github.com/isjiajia01/painterly-sky",
  },
  {
    slug: "dot-matrix",
    title: "Dot-matrix film",
    date: "Oct 2026",
    tags: "Canvas · custom format",
    summary: "A 64×36 dot-matrix video decoded from a 6-bit temporal-delta text format and drawn as jittering dots. The scene is my own generated sky.",
    span: "col-span-2",
    repo: "https://github.com/isjiajia01/canopy-dotmatrix",
  },
  {
    slug: "stacked-toasts",
    title: "Stacked toasts",
    date: "Nov 2026",
    tags: "React · CSS · gestures",
    summary: "Notifications slide in with a touch of motion blur and stack behind each other. Swipe to dismiss.",
    span: "col-span-2",
    repo: "https://github.com/isjiajia01/personal-website/blob/main/components/lab/toast-demo.tsx",
  },
];
