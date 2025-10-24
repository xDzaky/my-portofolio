import Link from "next/link";

import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/container";
import { SocialLinks } from "@/components/shared/social-links";
import { SiteName } from "@/components/shared/site-name";
import { BackToTopButton } from "@/components/layout/back-to-top-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background/80">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                <SiteName />
              </h3>
              <p className="text-sm text-muted-foreground">
                {siteConfig.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <SocialLinks />
              <BackToTopButton />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {footerNavigation.quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Resources
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {footerNavigation.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border/50 pt-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Crafted in {siteConfig.location}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
