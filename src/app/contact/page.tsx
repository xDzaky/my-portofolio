import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealSection } from "@/components/shared/reveal-section";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a message about your project or opportunity.",
};

export default function ContactPage() {
  return (
    <RevealSection className="py-16" id="contact">
      <Container>
        <SectionHeading title="Contact" subtitle="Tell me about your project or opportunity." />
        <div className="mt-6 grid gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div className="rounded-xl border border-border/60 p-6 text-sm text-muted-foreground">
            <p>
              Prefer sure-fire response? Email me at{' '}
              <a className="text-primary underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              . I usually respond within 24 hours.
            </p>
            <p className="mt-4">Timezone · {siteConfig.timezone}</p>
            <p className="mt-2">Availability · {siteConfig.availability}</p>
          </div>
          <ContactForm />
        </div>
      </Container>
    </RevealSection>
  );
}
