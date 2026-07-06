"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { countAtElapsed } from "@/lib/anim/count-up";

const DURATION_MS = 1200;

type Props = {
  value: number;
  label?: ReactNode;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  size?: "md" | "lg";
  className?: string;
};

/**
 * Stat that counts up 0->value the first time it scrolls into view. Driven by
 * direct textContent writes (no per-frame re-render); server / no-JS /
 * reduced-motion render the final, formatted value immediately.
 */
export function CountUpStat({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  size = "md",
  className = "",
}: Props) {
  const numRef = useRef<HTMLSpanElement>(null);

  const format = (n: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);

  useEffect(() => {
    const node = numRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.textContent = `${prefix}${format(0)}${suffix}`;

    let raf = 0;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          node.textContent = `${prefix}${format(countAtElapsed(elapsed, DURATION_MS, value))}${suffix}`;
          if (elapsed < DURATION_MS) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, prefix, suffix, decimals]);

  return (
    <div className={className}>
      <span
        ref={numRef}
        className={`font-display nums-tabular text-ink block font-semibold leading-none ${
          size === "lg" ? "text-5xl sm:text-6xl" : "text-[2.6rem] sm:text-5xl"
        }`}
      >
        {prefix}
        {format(value)}
        {suffix}
      </span>
      {label ? <span className="text-meta mt-3 block">{label}</span> : null}
    </div>
  );
}
