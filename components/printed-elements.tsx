import { ElementType, ReactNode } from "react";
import classNames from "classnames";

interface PrintedSectionProps {
  title?: string;
  label?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function PrintedSection({
  title,
  label,
  className,
  children,
}: PrintedSectionProps) {
  return (
    <section className={classNames("mb-10", className)}>
      {label && (
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 leading-none align-middle font-mono text-[11px] tracking-[0.12em] uppercase text-printer-ink-muted dark:text-printer-ink-muted-dark bg-printer-ink/5 dark:bg-printer-ink-dark/5 px-2 py-[3px] rounded-sm [&_svg]:shrink-0 [&_svg]:align-middle [&_.label-text]:inline-flex [&_.label-text]:items-center [&_.label-text]:leading-none [&_.label-text]:translate-y-[0.5px]">
            {label}
          </div>
          <div className="flex-1 h-px bg-printer-ink/5 dark:bg-printer-ink-dark/5" />
        </div>
      )}
      {title && (
        <h2 className="font-mono text-lg font-semibold tracking-tight text-printer-ink dark:text-printer-ink-dark mb-4">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

interface PrintedLabelProps {
  children: ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function PrintedLabel({
  children,
  variant = "default",
  className,
}: PrintedLabelProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center leading-none font-mono text-[11px] tracking-[0.1em] uppercase px-2 py-[3px] rounded-sm border [&_svg]:shrink-0 [&_svg]:align-middle [&_.label-text]:inline-flex [&_.label-text]:items-center [&_.label-text]:leading-none [&_.label-text]:translate-y-[0.5px]",
        {
          "border-printer-ink/10 dark:border-printer-ink-dark/10 text-printer-ink/75 dark:text-printer-ink-dark/75":
            variant === "default",
          "border-printer-accent/30 dark:border-printer-accent-dark/30 text-printer-accent-text dark:text-printer-accent-text-dark bg-printer-accent/5":
            variant === "accent",
          "border-printer-ink/5 dark:border-printer-ink-dark/5 text-printer-ink-muted dark:text-printer-ink-muted-dark":
            variant === "muted",
        },
        className,
      )}
    >
      {children}
    </span>
  );
}

interface PrintedDividerProps {
  className?: string;
  style?: "solid" | "dashed" | "dotted";
}

export function PrintedDivider({
  className,
  style = "dashed",
}: PrintedDividerProps) {
  return (
    <div
      className={classNames(
        "my-6",
        {
          "border-t border-printer-ink/10 dark:border-printer-ink-dark/10":
            style === "solid",
          "border-t border-dashed border-printer-ink/10 dark:border-printer-ink-dark/10":
            style === "dashed",
          "border-t border-dotted border-printer-ink/10 dark:border-printer-ink-dark/10":
            style === "dotted",
        },
        className,
      )}
    />
  );
}

interface PrintedPageTitleProps {
  icon: ElementType<{ className?: string }>;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
}

export function PrintedPageTitle({
  icon: Icon,
  children,
  className,
  titleClassName,
  iconClassName,
}: PrintedPageTitleProps) {
  return (
    <div className={classNames("mb-1", className)}>
      <h1
        className={classNames(
          "inline-flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-printer-ink dark:text-printer-ink-dark uppercase",
          titleClassName,
        )}
      >
        <Icon
          aria-hidden="true"
          className={classNames(
            "h-4 w-4 shrink-0 text-printer-ink-muted dark:text-printer-ink-muted-dark",
            iconClassName,
          )}
        />
        <span>{children}</span>
      </h1>
    </div>
  );
}
