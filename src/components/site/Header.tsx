import { Logo } from "@/components/site/Logo";
import { SocialLinks } from "@/components/site/SocialLinks";
import { Button } from "@/components/site/Button";
import { profile } from "@/content/profile";

export function Header() {
  return (
    <header className="bg-paper/70 border-line fixed inset-x-0 top-0 z-40 border-b backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" aria-label={profile.name}><Logo /></a>
        <div className="flex items-center gap-4">
          <SocialLinks className="hidden sm:flex" />
          <Button href={profile.links.cv} size="sm" variant="secondary">CV</Button>
        </div>
      </div>
    </header>
  );
}
