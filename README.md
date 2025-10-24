Modern portfolio for Dzaky, built per tech_doc.md.

Tech stack
- Next.js 15 (App Router), TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion (animations)
- next-themes (dark/light)
- Route Handlers (contact email via Resend)
- Vercel Analytics

Getting started
- Install: `npm i`
- Dev server: `npm run dev`
- Build: `npm run build`
- Start: `npm start`

Environment
- `RESEND_API_KEY` (optional): enables email sending for `/api/contact`.

Project structure (key files)
- `src/app/page.tsx`: Home (Hero, Projects, Skills previews)
- `src/app/{about,education,projects,skills,blog,contact}/page.tsx`: Core pages
- `src/app/projects/[slug]/page.tsx`: Project case study route
- `src/app/blog/[slug]/page.tsx`: Blog post route (placeholder)
- `src/app/api/contact/route.ts`: Sends email w/ simple rate limit + honeypot
- `src/app/{sitemap.ts,robots.ts,opengraph-image.tsx}`: SEO basics
- `src/components/layout/*`: Header/Footer
- `src/components/sections/*`: Hero, previews, contact form
- `src/config/*`: Site and navigation config
- `src/data/*`: Sample content (projects, skills, blog, education)

Notes and roadmap
- MDX/Contentlayer: deferred (Next 15 peer-compat issues). Current site uses static data. If you want MDX, we can pin Next to 13/14 or use a compatible content loader.
- Social integrations (GitHub/YouTube), testimonials page, i18n, and Playwright tests are planned for V2.
- Add your resume file to `public/resume.pdf` to enable `/resume` link.

Deploy (Vercel)
- Import the `web` directory as a project in Vercel.
- Set `RESEND_API_KEY` in Project Settings (Environment Variables).
- Push any changes to get Preview deployments per PR.
# my-portofolio
