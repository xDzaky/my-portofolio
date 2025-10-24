import type { BlogPostMeta } from "@/types/content";

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "designing-portfolios-for-recruiters",
    title: "Designing Portfolios Recruiters Love",
    description:
      "Research-backed tips on structuring case studies, social proof, and actionable CTAs for developer portfolios.",
    date: "2024-07-18",
    tags: ["portfolio", "career"],
    readingTime: "8 min",
    cover: "/images/blog/portfolio-recruiters.jpg",
  },
  {
    slug: "web3-security-checklist",
    title: "Web3 Security Checklist for Product Teams",
    description:
      "A practical checklist and tooling stack to keep dApps secure from day-one, distilled from auditing dozens of projects.",
    date: "2024-05-30",
    tags: ["web3", "security"],
    readingTime: "12 min",
    cover: "/images/blog/web3-security.jpg",
  },
  {
    slug: "playwright-ci-setup",
    title: "Playwright CI Setup in Under 30 Minutes",
    description:
      "How I roll out Playwright-driven regression suites with trace viewer, GitHub Actions, and Vercel preview environments.",
    date: "2023-12-02",
    tags: ["testing", "playwright"],
    readingTime: "6 min",
    cover: "/images/blog/playwright-ci.jpg",
  },
];
