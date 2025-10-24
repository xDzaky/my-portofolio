import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Clapperboard, Youtube } from "lucide-react";

import { socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";

const iconMap = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  tiktok: Clapperboard,
  youtube: Youtube,
  email: Mail,
} as const;

export function SocialLinks({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.platform as keyof typeof iconMap];
        if (!Icon) return null;
        return (
          <Link
            key={link.href}
            href={link.href}
            target={link.platform === "email" ? undefined : "_blank"}
            rel="noreferrer noopener"
            aria-label={link.label}
            className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background/80 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
            <span className="pointer-events-none absolute inset-0 rounded-full shadow-[0_12px_32px_-22px_theme(colors.primary/70)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
            <Icon className="relative h-4 w-4" />
          </Link>
        );
      })}
    </div>
  );
}
