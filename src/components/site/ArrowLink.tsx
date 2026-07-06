import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group text-ink hover:text-accent inline-flex items-center gap-1.5 transition-colors ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
