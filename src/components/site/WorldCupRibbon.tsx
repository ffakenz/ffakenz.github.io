/**
 * Decorative Argentine-flag corner tape (World Cup season): a celeste / white /
 * celeste band crossing the bottom-right corner — clear of the header logo and
 * CTA. Purely cosmetic — `pointer-events-none` + `aria-hidden`. Hidden on mobile,
 * where the sticky CTA bar owns the bottom edge. Gated by WORLD_CUP at the mount
 * site, so it's removable in one line.
 */
export function WorldCupRibbon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 bottom-0 z-30 hidden h-[88px] w-[88px] overflow-hidden motion-safe:animate-[fadeIn_0.6s_ease-out] sm:block"
    >
      <div
        className="absolute right-[-40px] bottom-[14px] h-[14px] w-[150px] -rotate-45 shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #74acdf 0 34%, #ffffff 34% 66%, #74acdf 66% 100%)",
        }}
      />
    </div>
  );
}
