import fs from "node:fs/promises";
import path from "node:path";

import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";

import type { ProjectDocument, ProjectFrontmatter } from "@/types/content";
import { Prose } from "@/components/shared/prose";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export async function getProjectFrontmatters(): Promise<ProjectFrontmatter[]> {
  const entries = await fs.readdir(PROJECTS_DIR);
  const items = await Promise.all(
    entries.filter((file) => file.endsWith(".mdx")).map(async (file) => {
      const filepath = path.join(PROJECTS_DIR, file);
      const raw = await fs.readFile(filepath, "utf8");
      const { data } = matter(raw);
      const frontmatter = data as ProjectFrontmatter;
      return frontmatter;
    }),
  );

  return items
    .filter((item) => item.slug && (item.status ?? "published") !== "draft")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjectBySlug(slug: string): Promise<ProjectDocument | null> {
  const filepath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  try {
    const source = await fs.readFile(filepath, "utf8");
    const { content, frontmatter } = await compileMDX<ProjectFrontmatter>({
      source,
      options: { parseFrontmatter: true },
      components: {
        Prose,
      },
    });

    const status = frontmatter.status ?? "published";
    if (status === "draft") {
      return null;
    }

    return {
      ...frontmatter,
      content,
    } satisfies ProjectDocument;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  const frontmatters = await getProjectFrontmatters();
  return frontmatters.map((item) => item.slug);
}
