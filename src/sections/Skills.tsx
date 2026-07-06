import { EyebrowLabel } from "@/components/site/EyebrowLabel";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/content/profile";

export function Skills() {
  return (
    <section id="skills" className="wrap section-y">
      <Reveal><EyebrowLabel>Skills</EyebrowLabel></Reveal>
      <Reveal delayMs={60}><h2 className="text-h1 mt-4 max-w-[20ch]">Tools of the trade</h2></Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((g, i) => (
          <Reveal key={g.group} delayMs={i * 60}>
            <div>
              <h3 className="text-muted font-mono text-xs uppercase tracking-wider">{g.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li key={it} className="border-line-strong text-ink-soft rounded-full border px-3 py-1 font-mono text-xs">{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
