"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal island — reversible (terax-style): fades + rises in on enter,
 * fades + sinks out on leave, in both scroll directions. The hidden start
 * state is applied only after mount and only when motion is allowed, so no-JS
 * and reduced-motion users always see content.
 */
export function Reveal({
  className = "",
  delayMs = 0,
  variant = "up",
  children,
}: {
  className?: string;
  delayMs?: number;
  variant?: "up" | "left" | "right" | "scale";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (delayMs) node.style.setProperty("--reveal-delay", `${delayMs}ms`);
    if (variant !== "up") node.setAttribute("data-variant", variant);
    node.setAttribute("data-reveal", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
          } else {
            entry.target.removeAttribute("data-revealed");
          }
        }
      },
      { threshold: 0.18, rootMargin: "-8% 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
