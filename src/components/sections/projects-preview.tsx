import Link from "next/link";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealSection } from "@/components/shared/reveal-section";
import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { getProjectFrontmatters } from "@/lib/content/projects";

export async function ProjectsPreview() {
  const projects = await getProjectFrontmatters();
  return (
    <RevealSection className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects"
          subtitle="A few things I've shipped recently."
        />
        <ProjectsGrid projects={projects} limit={6} />
        <div className="mt-8 flex justify-end">
          <Button asChild variant="outline">
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>
      </Container>
    </RevealSection>
  );
}
