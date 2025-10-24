import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog";
import { getProjectFrontmatters } from "@/lib/content/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://dzaky.codes";
  const staticPages = ["/", "/about", "/education", "/projects", "/skills", "/blog", "/contact", "/resume"].map(
    (p) => ({ url: base + p, priority: p === "/" ? 1 : 0.7 }),
  );
  const projectFrontmatters = await getProjectFrontmatters();
  const projectPages = projectFrontmatters.map((p) => ({ url: `${base}/projects/${p.slug}`, priority: 0.6 }));
  const postPages = blogPosts.map((p) => ({ url: `${base}/blog/${p.slug}`, priority: 0.5 }));
  return [...staticPages, ...projectPages, ...postPages];
}
