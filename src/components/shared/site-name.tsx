import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteName({ className }: { className?: string }) {
  return <span className={cn(className)}>{siteConfig.name}</span>;
}
