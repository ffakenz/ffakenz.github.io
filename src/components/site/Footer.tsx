import { SocialLinks } from "@/components/site/SocialLinks";
import { Button } from "@/components/site/Button";
import { WORLD_CUP } from "@/lib/world-cup";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer id="contact" className="wrap border-line relative z-10 border-t py-14">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-h2 max-w-[16ch]">Let&apos;s build something reliable.</h2>
          <p className="text-muted mt-2 text-sm">{profile.location}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button href={profile.links.linkedin} arrow target="_blank" rel="noreferrer">Connect on LinkedIn</Button>
            <Button href={profile.links.cv} variant="secondary" download>Download CV</Button>
            <SocialLinks />
          </div>
        </div>
        {WORLD_CUP && (
          <div className="text-muted font-mono text-xs md:text-right">
            <p className="text-[#e0a800]">★★★</p>
            <p className="mt-1">🇦🇷 Come on, Argentina! 🏆</p>
            <p className="mt-1">1978 · 1986 · 2022</p>
          </div>
        )}
      </div>
      <p className="text-muted mt-10 font-mono text-xs">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  );
}
