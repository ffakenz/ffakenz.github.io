import { Button } from "@/components/site/Button";
import { profile } from "@/content/profile";

export function StickyCtaBar() {
  return (
    <div className="bg-paper/90 border-line fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur sm:hidden">
      <div className="wrap flex items-center gap-3 py-3">
        <Button href={profile.links.linkedin} size="sm" className="flex-1 justify-center">LinkedIn</Button>
        <Button href={profile.links.cv} size="sm" variant="secondary" className="flex-1 justify-center">CV</Button>
      </div>
    </div>
  );
}
