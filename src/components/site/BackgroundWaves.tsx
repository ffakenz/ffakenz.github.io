"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed full-screen WebGL line-wave field behind all content. Light + slow:
 * faint blue lines on the dark-navy base, gentle mouse-follow. Capability-gated:
 * reduced-motion and low-end/save-data devices keep only the static gradient
 * fallback. OGL loads lazily after first paint.
 */
export function BackgroundWaves() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const lowEnd =
      (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) ||
      (typeof nav.hardwareConcurrency === "number" &&
        nav.hardwareConcurrency < 4) ||
      nav.connection?.saveData === true;
    if (lowEnd) return;

    const opts = {
      color: [0.37, 0.69, 0.91] as [number, number, number], // #5FB0E8 in 0–1 RGB
      strength: 0.16,
      lines: 14,
      mouseInfluence: 1.8,
    };

    let handle: { destroy: () => void } | null = null;
    let cancelled = false;

    import("@/lib/gl/lineWaves")
      .then(({ startLineWaves }) => {
        if (cancelled || !ref.current) return;
        handle = startLineWaves(ref.current, opts);
      })
      .catch(() => {
        /* keep the gradient fallback */
      });

    return () => {
      cancelled = true;
      handle?.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 90% at 50% -10%, var(--color-accent-soft), transparent 60%)",
      }}
    />
  );
}
