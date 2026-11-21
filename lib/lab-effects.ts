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
    slug: "halftone-dots",
    title: "Halftone dots",
    date: "Nov 2026",
    tags: "Canvas · halftone",
    summary: "A grid of dots whose size follows a moving brightness field. The pointer swells the dots near it.",
    span: "",
    repo: "https://github.com/isjiajia01/personal-website/blob/main/components/lab/halftone-demo.tsx",
  },
  {
    slug: "flow-field",
    title: "Flow field",
    date: "Nov 2026",
    tags: "Canvas · noise",
    summary: "Particles follow a slowly changing noise field and leave fading trails. The pointer pulls them in.",
    span: "row-span-2",
    repo: "https://github.com/isjiajia01/personal-website/blob/main/components/lab/flow-demo.tsx",
  },
  {
    slug: "ascii-waves",
    title: "ASCII waves",
    date: "Nov 2026",
    tags: "Canvas · text",
    summary: "Sine waves turned into characters, from a space to @. The pointer sends out ripples.",
    span: "",
    repo: "https://github.com/isjiajia01/personal-website/blob/main/components/lab/ascii-demo.tsx",
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
    slug: "bookmark-pill",
    title: "Bookmark pill",
    date: "Oct 2026",
    tags: "CSS · micro-interaction",
    summary: "A bookmark flag folds into a box, a sheet drops in, and the count rolls. A hand-timed CSS approximation of an animation I liked.",
    span: "",
    repo: "https://github.com/isjiajia01/ui-playground/tree/main/bookmark-pill",
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
];
