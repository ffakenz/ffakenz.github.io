import { EyebrowLabel } from "@/components/site/EyebrowLabel";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="wrap section-y">
      <Reveal><EyebrowLabel>About</EyebrowLabel></Reveal>
      <Reveal delayMs={60}><h2 className="text-h1 mt-4 max-w-[20ch]">Get to know me</h2></Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Reveal delayMs={120}>
          <p className="text-ink-soft text-lg leading-relaxed">{profile.summary}</p>
        </Reveal>
        <Reveal delayMs={200}>
          <ul className="text-muted space-y-3 text-sm">
            <li><span className="text-ink">Origin.</span> {profile.origin}.</li>
            <li><span className="text-ink">Based in.</span> {profile.location}.</li>
            <li><span className="text-ink">Off the clock.</span> {profile.interests.join(" · ")}.</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
