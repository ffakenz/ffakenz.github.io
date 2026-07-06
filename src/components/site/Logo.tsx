import { profile } from "@/content/profile";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span className="bg-accent text-accent-ink font-display grid h-7 w-7 place-items-center rounded text-sm font-bold">F</span>
      <span className="font-display text-sm font-semibold tracking-tight">{profile.name}</span>
    </span>
  );
}
