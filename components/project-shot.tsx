import { ProjectImage } from "@/dictionaries";
import { RiArrowRightUpLine } from "@remixicon/react";

export interface ProjectShotProps {
  image: ProjectImage;
  domain?: string;
  priority?: boolean;
}

export function ProjectShot({
  image,
  domain,
  priority,
}: ProjectShotProps) {
  return (
    <figure className="project-shot w-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-printer-ink/12 dark:border-printer-ink-dark/12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          srcSet={`${image.srcSmall} 600w, ${image.src} 1200w`}
          sizes="(min-width: 768px) 690px, 100vw"
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      {domain && (
        <figcaption className="mt-2 flex items-center justify-between border-t border-dotted border-printer-ink/15 pt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-printer-ink-muted dark:border-printer-ink-dark/15 dark:text-printer-ink-muted-dark">
          <span className="truncate">{domain}</span>
          <RiArrowRightUpLine className="h-3 w-3 shrink-0" aria-hidden="true" />
        </figcaption>
      )}
    </figure>
  );
}

export default ProjectShot;
