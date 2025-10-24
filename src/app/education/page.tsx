import type { Metadata } from "next";

import education from "@content/data/education.json";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealSection } from "@/components/shared/reveal-section";
import { EducationVerticalTimeline } from "@/components/sections/education-vertical-timeline";

export const metadata: Metadata = {
  title: "Education",
  description: "Education history and timeline of milestones.",
};

export default function EducationPage() {
  return (
    <RevealSection className="py-16">
      <Container>
        <SectionHeading title="Education" subtitle="Formal education and learning journey." />
        <EducationVerticalTimeline items={education} />
      </Container>
    </RevealSection>
  );
}
