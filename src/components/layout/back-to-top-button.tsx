"use client";

import { useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function BackToTopButton() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const handleClick = useCallback(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground shadow-sm transition-all duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <ArrowUp className="h-3.5 w-3.5" />
      </span>
      <span>Back to top</span>
    </motion.button>
  );
}
