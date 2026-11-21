import type { ComponentType } from "react";
import { DitherDemo } from "./dither-demo";
import { ToastDemo } from "./toast-demo";
import { EmbedDemo } from "./embed-demo";

const embed = (src: string, title: string) =>
  function Embedded({ paused }: { paused?: boolean }) {
    return <EmbedDemo src={src} title={title} tile={paused !== undefined} paused={paused} />;
  };

export const labDemos: Record<string, ComponentType<{ paused?: boolean }>> = {
  "dither-clouds": DitherDemo,
  "ascii-ocean": embed("/lab-embed/ascii-ocean.html", "ASCII ocean"),
  "painterly-sky": embed("/lab-embed/painterly-sky.html", "Painterly sky"),
  "stacked-toasts": ToastDemo,
  "dot-matrix": embed("/lab-embed/canopy/index.html", "Dot-matrix film"),
};
