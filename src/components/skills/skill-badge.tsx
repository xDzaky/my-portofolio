"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import type { SkillFrequency, SkillLevel } from "@/types/content";
import { cn } from "@/lib/utils";

const levelDescriptions: Record<SkillLevel, string> = {
  Foundational: "Memahami dasar dan dapat mengikuti dokumentasi dengan bimbingan minimal.",
  Intermediate: "Mandiri membangun fitur umum serta menjaga kualitas implementasi.",
  Advanced: "Merancang arsitektur, mengoptimalkan performa, dan mengantisipasi edge cases.",
  Expert: "Mementor tim, berkontribusi pada komunitas, dan nyaman menghadapi kasus kompleks.",
};

const frequencyColors: Record<SkillFrequency, string> = {
  Daily: "text-emerald-600 bg-emerald-100/70 dark:bg-emerald-500/15",
  Weekly: "text-sky-600 bg-sky-100/70 dark:bg-sky-500/15",
  Occasionally: "text-amber-600 bg-amber-100/70 dark:bg-amber-500/15",
  Learning: "text-purple-600 bg-purple-100/70 dark:bg-purple-500/15",
};

type SkillBadgeProps = {
  name: string;
  level: SkillLevel;
  frequency: SkillFrequency;
  icon?: ReactNode;
  className?: string;
};

export function SkillBadge({ name, level, frequency, icon, className }: SkillBadgeProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <motion.span
        title={levelDescriptions[level]}
        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
        aria-label={`${name} level ${level}`}
      >
        {icon}
        <span>{level}</span>
      </motion.span>
      <span
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]",
          frequencyColors[frequency],
        )}
        aria-label={`${name} usage frequency ${frequency}`}
      >
        {frequency}
      </span>
    </div>
  );
}

export { levelDescriptions };
