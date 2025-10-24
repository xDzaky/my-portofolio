import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function Prose({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("prose prose-neutral dark:prose-invert", className)}>{children}</div>;
}
