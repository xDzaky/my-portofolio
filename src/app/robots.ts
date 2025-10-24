import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://dzaky.codes";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

