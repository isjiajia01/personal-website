import type { ComponentType } from "react";
import { DitherDemo } from "./dither-demo";
import { ToastDemo } from "./toast-demo";
import { EmbedDemo } from "./embed-demo";
import { BookshelfDemo } from "./bookshelf-demo";
import { AsciiSkyDemo } from "./ascii-sky-demo";

const embed = (src: string, title: string) =>
  function Embedded({ paused, near }: LabDemoProps) {
    return <EmbedDemo src={src} title={title} tile={paused !== undefined} paused={paused} near={near} />;
  };

// paused is undefined on a detail page (always live, interactive). In a collage tile it is a
// boolean: true while the tile is not in play. near says the tile is close to the screen, so a
// demo that is costly to start can mount then and sit on a still frame until it plays.
export type LabDemoProps = { paused?: boolean; near?: boolean };

export const labDemos: Record<string, ComponentType<LabDemoProps>> = {
  "ascii-sky": AsciiSkyDemo,
  bookshelf: BookshelfDemo,
  "dither-clouds": DitherDemo,
  "ascii-ocean": embed("/lab-embed/ascii-ocean.html", "ASCII ocean"),
  "painterly-sky": embed("/lab-embed/painterly-sky.html", "Painterly sky"),
  "stacked-toasts": ToastDemo,
  "dot-matrix": embed("/lab-embed/canopy/index.html", "Dot-matrix film"),
};
