/**
 * Pure count-up math for animated stats. Framework-free so it's node-testable;
 * the React island feeds it `elapsed` from requestAnimationFrame. Returns a
 * float (formatting/rounding happens in the component, locale-aware).
 */

/** Ease-out cubic; clamps t to [0,1]. */
export const easeOutCubic = (t: number): number => {
  const clamped = Math.min(Math.max(t, 0), 1);
  return 1 - Math.pow(1 - clamped, 3);
};

/** Value to display at `elapsedMs` of a `durationMs` run toward `target`. */
export function countAtElapsed(
  elapsedMs: number,
  durationMs: number,
  target: number,
): number {
  if (durationMs <= 0) return target;
  return target * easeOutCubic(elapsedMs / durationMs);
}
