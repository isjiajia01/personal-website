// Data for the Lab. Add an effect here, a component in components/lab/, and a line in components/lab/demos.tsx.
export type LabEffect = {
  slug: string;
  title: string;
  date: string;
  tags: string;
  summary: string;
  file: string; // shown on the effect page as the source
  span: string; // bento tile size
  how: string[];
};

export const labEffects: LabEffect[] = [
  {
    slug: "dither-clouds",
    title: "Dither clouds",
    date: "Nov 2026",
    tags: "Canvas · ordered dithering",
    summary: "Procedural clouds reduced to two colours with an 8×8 Bayer matrix. The pointer thins the dots out.",
    file: "components/lab/dither-demo.tsx",
    span: "col-span-2 row-span-2",
    how: [
      "Fractal noise gives a cloud density between 0 and 1 for every pixel.",
      "An 8×8 Bayer matrix gives each pixel a fixed threshold. Density above the threshold means a cloud dot, otherwise sky.",
      "Dense areas turn almost all white, thin areas stay blue, and the regular grid texture comes from the matrix.",
      "Near the pointer the density is lowered, so the dots thin out. Nothing is a particle; it is one threshold per pixel.",
    ],
  },
  {
    slug: "halftone-dots",
    title: "Halftone dots",
    date: "Nov 2026",
    tags: "Canvas · halftone",
    summary: "A grid of dots whose size follows a moving brightness field. The pointer swells the dots near it.",
    file: "components/lab/halftone-demo.tsx",
    span: "",
    how: [
      "Dots sit on a fixed 14px grid; only their radius changes.",
      "The radius comes from a sum of sine waves that drift over time, so bright areas have big dots and dark areas have none.",
      "Close to the pointer the brightness is boosted, which makes the dots grow.",
    ],
  },
  {
    slug: "flow-field",
    title: "Flow field",
    date: "Nov 2026",
    tags: "Canvas · noise",
    summary: "Particles follow a slowly changing noise field and leave fading trails. The pointer pulls them in.",
    file: "components/lab/flow-demo.tsx",
    span: "row-span-2",
    how: [
      "Every particle reads an angle from value noise at its position and moves a small step in that direction.",
      "Each frame is painted with a nearly transparent dark layer instead of being cleared, so old lines fade slowly into trails.",
      "Particles within 120px of the pointer get an extra push toward it. Particles that leave the canvas respawn at random.",
    ],
  },
  {
    slug: "ascii-waves",
    title: "ASCII waves",
    date: "Nov 2026",
    tags: "Canvas · text",
    summary: "Sine waves turned into characters, from a space to @. The pointer sends out ripples.",
    file: "components/lab/ascii-demo.tsx",
    span: "",
    how: [
      "The canvas is a grid of 8×14px cells, one character each.",
      "Three sine waves are added up per cell and scaled to 0–1.",
      "That value picks a character from a ramp ordered by ink density: space . : - = + * # % @.",
      "The pointer adds a ring wave that fades with distance.",
    ],
  },
  {
    slug: "ascii-ocean",
    title: "ASCII ocean",
    date: "Oct 2026",
    tags: "Canvas · ASCII · scenes",
    summary: "A koi pond, manta rays and deep-sea jellyfish drawn with characters. Keys 1/2/3 switch scene, S switches style, click to feed or ripple.",
    file: "public/lab-embed/ascii-ocean.html",
    span: "col-span-2",
    how: [
      "One HTML file, no dependencies. Each scene is a field of animals and ripples sampled per character cell.",
      "Based on the principle of stackedlol/ascii-sharks (MIT); the licence and notice are kept in the source repo.",
      "Source repo: github.com/isjiajia01/ascii-ocean.",
    ],
  },
  {
    slug: "painterly-sky",
    title: "Painterly sky",
    date: "Oct 2026",
    tags: "WebGL2 · painterly",
    summary: "A procedural painted-gradient sky with brush dabs, from-scratch approximation of a meadow hero. Move the mouse.",
    file: "public/lab-embed/painterly-sky-lite.js",
    span: "col-span-2",
    how: [
      "A WebGL2 fragment shader builds sky and light from noise, then a Kuwahara-style filter flattens it into paint-like patches.",
      "Brush dabs are layered on top. The colours follow the visitor's local time of day.",
      "This is the lite version I wrote myself; the full vendored scene is in github.com/isjiajia01/painterly-sky.",
    ],
  },
  {
    slug: "bookmark-pill",
    title: "Bookmark pill",
    date: "Oct 2026",
    tags: "CSS · micro-interaction",
    summary: "A bookmark flag folds into a box, a sheet drops in, and the count rolls. A hand-timed CSS approximation of an animation I liked.",
    file: "public/lab-embed/bookmark-pill/bookmark-pill.css",
    span: "",
    how: [
      "Pure CSS keyframes plus a few lines of JS to toggle the state.",
      "The 3D fold is faked with scale and skew, timed by hand against the reference frames.",
      "Idea after @turaluix's \"bookmarked. variant 2\".",
    ],
  },
  {
    slug: "dot-matrix",
    title: "Dot-matrix film",
    date: "Oct 2026",
    tags: "Canvas · custom format",
    summary: "A 64×36 dot-matrix video decoded from a 6-bit temporal-delta text format and drawn as jittering dots. The scene is my own generated sky.",
    file: "public/lab-embed/canopy/canopy.js",
    span: "col-span-2",
    how: [
      "Each frame stores only the change from the previous one, as 6-bit values in base64 characters, so a whole film is a small JSON string.",
      "The decoder rebuilds the 64×36 brightness field and samples it bilinearly for every dot.",
      "Each dot has its own physics: jitter, size from brightness, and a wake that grows around the pointer.",
      "The renderer follows the technique I studied on davidluft.com. The footage is not used; scene.json is generated by gen-scene.py (sun, drifting noise clouds, skyline).",
    ],
  },
];
