import { profile } from "@/content/profile";

export function personSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://ffakenz.github.io/",
    jobTitle: "Computer Scientist · Software Craftsman",
    address: { "@type": "PostalAddress", addressLocality: "Córdoba", addressCountry: "AR" },
    sameAs: [profile.links.linkedin, profile.links.github],
  };
}
