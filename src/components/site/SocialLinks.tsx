import { Linkedin, Github } from "lucide-react";
import { profile } from "@/content/profile";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
         className="text-muted hover:text-accent transition-colors">
        <Linkedin className="h-5 w-5" />
      </a>
      <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"
         className="text-muted hover:text-accent transition-colors">
        <Github className="h-5 w-5" />
      </a>
    </div>
  );
}
