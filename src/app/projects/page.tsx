import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealSection } from "@/components/shared/reveal-section";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { getProjectFrontmatters } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project catalog with case studies and links.",
};

export default async function ProjectsPage() {
  const projects = await getProjectFrontmatters();
  return (
    <RevealSection className="py-16">
      <Container>
        <SectionHeading title="Projects" subtitle="Selected work across web, web3, and open-source." />
        <ProjectsGrid projects={projects} />
      </Container>
    </RevealSection>
  );
}
