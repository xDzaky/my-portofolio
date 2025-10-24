import skillsData from "@content/data/skills.json";

import type { SkillsCollection } from "@/types/content";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealSection } from "@/components/shared/reveal-section";
import { SkillsGrid } from "@/components/sections/skills-grid";

const previewCategories = ["Languages", "Frameworks", "Tools"];

export function SkillsPreview() {
  const collection = skillsData as SkillsCollection;
  const skills = collection.skills ?? [];

  return (
    <RevealSection className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Tools & Technologies"
          subtitle="Quick snapshot of the stack I use most often."
        />
        <SkillsGrid skills={skills} categoryOrder={previewCategories} limit={8} />
      </Container>
    </RevealSection>
  );
}
