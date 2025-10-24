import type { Metadata } from "next";

import skillsData from "@content/data/skills.json";

import type { SkillsCollection } from "@/types/content";

import { Container } from "@/components/shared/container";
import { RevealSection } from "@/components/shared/reveal-section";
import { SkillsGrid } from "@/components/sections/skills-grid";

export const metadata: Metadata = {
  title: "Skills",
  description: "Skills and tools I use to ship.",
};

const categoryOrder = ["Languages", "Frameworks", "Backend", "Tools", "Web3"];

export default function SkillsPage() {
  const collection = skillsData as SkillsCollection;
  const skills = collection.skills ?? [];

  return (
    <RevealSection className="py-16">
      <Container>
        <div className="space-y-3">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Skills
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Tools &amp; Technologies</h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            My professional skillset — frameworks, languages, and platforms that I rely on to design,
            build, and ship polished experiences.
          </p>
        </div>
        <SkillsGrid skills={skills} categoryOrder={categoryOrder} />
      </Container>
    </RevealSection>
  );
}
