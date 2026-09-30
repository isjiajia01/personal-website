"use client";

import classNames from "classnames";
import React, { useCallback } from "react";

interface RotaryDialOption<T extends string> {
  value: T;
  /** Displayed outside the knob (deprecated) */
  label?: React.ReactNode;
}

interface RotaryDialProps<T extends string> {
  /** Ordered options. Distributed on an upper arc centered at 12 o'clock. */
  options: RotaryDialOption<T>[];
  /** Currently active value */
  value: T;
  /** Callback when user clicks to advance to next option */
  onChange: (value: T) => void;
  /** Optional title for accessibility */
  title?: string;
  /** Extra class names on the outer wrapper */
  className?: string;
  /** Label arrangement around the knob (kept for backwards compatibility) */
  labelLayout?: "arc" | "inline";
  /** Current value inline label displayed beside the knob */
  currentLabel?: React.ReactNode;
  /** Accessible label for the interactive button */
  ariaLabel?: string;
  /** Place the current-value label beside the knob (default) or underneath it */
  labelPlacement?: "inline" | "below";
}

/**
 * Compute the angle (in degrees, 0 = 12-o'clock, CW positive) for the i-th
 * option out of `count` options.  Options are spread across an upper arc so
 * that two options sit at ±45° and three options sit at -45°, 0°, +45°.
 */
function optionAngle(i: number, count: number): number {
  if (count === 2) {
    // left-upper, right-upper
    return i === 0 ? -45 : 45;
  }
  if (count === 3) {
    // Keep left/right positions aligned with the 2-option dial
    return (i - 1) * 45;
  }
  // For 3+, spread symmetrically: center index at 0°
  const spread = 60; // degrees between adjacent options
  const mid = (count - 1) / 2;
  return (i - mid) * spread;
}

export default function RotaryDial<T extends string>({
  options,
  value,
  onChange,
  title,
  className,
  labelLayout = "arc",
  currentLabel,
  ariaLabel,
  labelPlacement = "inline",
}: RotaryDialProps<T>) {
  const currentIndex = options.findIndex((o) => o.value === value);
  const rotation = currentIndex >= 0 ? optionAngle(currentIndex, options.length) : 0;

  const cycle = useCallback(() => {
    const nextIndex = (currentIndex + 1) % options.length;
    onChange(options[nextIndex].value);
  }, [currentIndex, options, onChange]);

  return (
    <div
      className={classNames(
        "inline-flex",
        labelPlacement === "below" ? "flex-col items-center gap-0.5" : "items-center gap-1.5",
        className,
      )}
    >
      <button
        type="button"
        onClick={cycle}
        title={title}
        aria-label={ariaLabel}
        className="relative flex items-center justify-center w-11 h-11 p-1 bg-transparent cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-printer-ink dark:focus-visible:outline-printer-ink-dark shrink-0"
      >
        <div className="rotary-dial-knob relative w-9 h-9 rounded-full pointer-events-none">
          {/* Active indicator line (inside knob only) */}
          <div
            className="absolute inset-0 flex justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="w-[1.5px] h-[40%] bg-printer-accent dark:bg-printer-accent-dark rounded-full" />
          </div>
        </div>
      </button>
      {currentLabel && (
        <span
          onClick={cycle}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-printer-ink-muted dark:text-printer-ink-muted-dark select-none cursor-pointer leading-none"
        >
          {currentLabel}
        </span>
      )}
    </div>
  );
}
