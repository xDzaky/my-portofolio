import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { blogPosts } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return notFound();
  return (
    <section className="py-16">
      <Container>
        <SectionHeading title={post.title} subtitle={`${post.date} · ${post.readingTime}`} />
        <article className="prose prose-neutral dark:prose-invert max-w-none mt-8">
          <p>{post.description}</p>
          <p>Full article content coming soon.</p>
        </article>
      </Container>
    </section>
  );
}

