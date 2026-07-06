"use client";

import { useEffect } from "react";

/**
 * Lenis smooth-scroll inertia — desktop/pointer-fine only, and disabled under
 * reduced-motion (native scroll stays untouched on touch + a11y).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let cancelled = false;
    let instance: { raf: (t: number) => void; destroy: () => void } | null =
      null;

    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        instance = new Lenis({ duration: 1.1, smoothWheel: true });
        const loop = (time: number) => {
          instance?.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      })
      .catch(() => {
        /* native scroll fallback */
      });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      instance?.destroy();
    };
  }, []);

  return null;
}
