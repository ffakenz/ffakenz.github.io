import Image from "next/image";
import { EyebrowLabel } from "@/components/site/EyebrowLabel";
import { Reveal } from "@/components/site/Reveal";
import { CountUpStat } from "@/components/site/CountUpStat";
import { Button } from "@/components/site/Button";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section id="top" className="wrap relative flex min-h-[88svh] flex-col justify-center pt-28 pb-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <Reveal><EyebrowLabel>{profile.location}</EyebrowLabel></Reveal>
          <h1 className="text-display mt-5 max-w-[16ch]">{profile.name}</h1>
          <Reveal delayMs={120}>
            <p className="text-accent mt-4 font-mono text-sm sm:text-base">{profile.tagline}</p>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="text-ink-soft mt-6 max-w-[54ch] text-lg">{profile.summary}</p>
          </Reveal>
          <Reveal delayMs={280}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={profile.links.linkedin} arrow target="_blank" rel="noreferrer">Connect on LinkedIn</Button>
              <Button href={profile.links.cv} variant="secondary" download>Download CV</Button>
            </div>
          </Reveal>
        </div>
        <Reveal variant="scale" delayMs={160}>
          <div className="border-line-strong relative aspect-square w-56 overflow-hidden rounded-[var(--radius)] border md:w-64">
            <Image src="/me-gpt.webp" alt={profile.name} fill sizes="256px" priority className="object-cover" />
          </div>
        </Reveal>
      </div>
      <Reveal delayMs={340}>
        <div className="border-line mt-14 grid max-w-lg grid-cols-3 gap-6 border-t pt-8">
          {profile.stats.map((s) => (
            <CountUpStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
