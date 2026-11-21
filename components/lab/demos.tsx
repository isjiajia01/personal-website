import type { ComponentType } from "react";
import { DitherDemo } from "./dither-demo";
import { HalftoneDemo } from "./halftone-demo";
import { FlowDemo } from "./flow-demo";
import { AsciiDemo } from "./ascii-demo";
import { EmbedDemo } from "./embed-demo";

const embed = (src: string, title: string) =>
  function Embedded({ paused }: { paused?: boolean }) {
    return <EmbedDemo src={src} title={title} paused={paused} tile={paused !== undefined} />;
  };

export const labDemos: Record<string, ComponentType<{ paused?: boolean }>> = {
  "dither-clouds": DitherDemo,
  "halftone-dots": HalftoneDemo,
  "flow-field": FlowDemo,
  "ascii-waves": AsciiDemo,
  "ascii-ocean": embed("/lab-embed/ascii-ocean.html", "ASCII ocean"),
  "painterly-sky": embed("/lab-embed/painterly-sky.html", "Painterly sky"),
  "dot-matrix": embed("/lab-embed/canopy/index.html", "Dot-matrix film"),
  "bookmark-pill": embed("/lab-embed/bookmark-pill/index.html", "Bookmark pill"),
};
