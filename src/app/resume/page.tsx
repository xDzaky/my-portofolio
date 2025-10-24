import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download my resume as PDF.",
};

export default function ResumePage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading title="Resume" subtitle="Download a PDF of my resume." />
        <div className="mt-6 rounded-lg border p-6 text-sm text-muted-foreground">
          <p>Attach your PDF resume at public/resume.pdf and link will appear here.</p>
          <a className="mt-3 inline-flex text-primary underline-offset-4 hover:underline" href="/resume.pdf" target="_blank" rel="noreferrer noopener">
            Open resume.pdf
          </a>
        </div>
      </Container>
    </section>
  );
}

