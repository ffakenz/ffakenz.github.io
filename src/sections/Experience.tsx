import { EyebrowLabel } from "@/components/site/EyebrowLabel";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/content/profile";

export function Experience() {
  return (
    <section id="experience" className="wrap section-y">
      <Reveal><EyebrowLabel>Experience</EyebrowLabel></Reveal>
      <Reveal delayMs={60}><h2 className="text-h1 mt-4 max-w-[20ch]">Where I&apos;ve built</h2></Reveal>
      <div className="mt-10 space-y-4">
        {profile.experience.map((role, i) => (
          <Reveal key={role.company} delayMs={i * 70}>
            <article className="card p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-h2">{role.company}</h3>
                <span className="text-muted font-mono text-xs">{role.dates} · {role.location}</span>
              </div>
              <p className="text-accent mt-1 text-sm font-medium">{role.title}</p>
              {role.context && <p className="text-ink-soft mt-3 text-sm">{role.context}</p>}
              <ul className="text-ink-soft mt-4 space-y-2 text-sm">
                {role.bullets.map((b) => (
                  <li key={b} className="before:border-accent relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:border">{b}</li>
                ))}
              </ul>
              {role.stack.length > 0 && (
                <p className="text-muted mt-4 font-mono text-xs">{role.stack.join(" · ")}</p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
