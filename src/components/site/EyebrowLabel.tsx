import type { ReactNode } from "react";

export function EyebrowLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-eyebrow ${className}`}>{children}</p>;
}
