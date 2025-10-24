import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and case studies on web and web3.",
};

export default function BlogPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading title="Blog" subtitle="Writing on engineering, security, and product." />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p) => (
            <article key={p.slug} className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold">
                <a className="underline-offset-4 hover:underline" href={`/blog/${p.slug}`}>
                  {p.title}
                </a>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {p.date} · {p.readingTime}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

