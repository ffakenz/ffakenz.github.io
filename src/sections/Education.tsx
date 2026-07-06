import { EyebrowLabel } from "@/components/site/EyebrowLabel";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/content/profile";

export function Education() {
  return (
    <section id="education" className="wrap section-y">
      <Reveal><EyebrowLabel>Education</EyebrowLabel></Reveal>
      <Reveal delayMs={60}><h2 className="text-h1 mt-4 max-w-[20ch]">Foundations</h2></Reveal>
      <div className="mt-10 space-y-4">
        {profile.education.map((e, i) => (
          <Reveal key={e.program} delayMs={i * 70}>
            <div className="border-line flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t pt-4">
              <div>
                <h3 className="text-h3">{e.program}</h3>
                <p className="text-muted text-sm">{e.school}</p>
                {e.note && <p className="text-ink-soft mt-1 text-sm">{e.note}</p>}
              </div>
              <span className="text-muted font-mono text-xs">{e.dates}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
