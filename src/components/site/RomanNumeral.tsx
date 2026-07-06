import type { ReactNode } from "react";

export function RomanNumeral({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-accent font-mono text-sm tracking-widest ${className}`}
    >
      {children}
    </span>
  );
}
