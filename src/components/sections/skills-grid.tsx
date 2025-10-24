"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import type { SkillItem } from "@/types/content";
import { ShinyText } from "@/components/ui/shiny-text";

type SkillsGridProps = {
  skills: SkillItem[];
  categoryOrder?: string[];
  limit?: number;
};

export function SkillsGrid({ skills, categoryOrder, limit }: SkillsGridProps) {
  const prefersReducedMotion = useReducedMotion();

  const orderedSkills = useMemo(() => {
    const categoryIndex = new Map<string, number>();
    categoryOrder?.forEach((category, index) => categoryIndex.set(category, index));

    const sorted = [...skills].sort((a, b) => {
      const catA = categoryIndex.get(a.category) ?? Number.MAX_SAFE_INTEGER;
      const catB = categoryIndex.get(b.category) ?? Number.MAX_SAFE_INTEGER;
      if (catA !== catB) return catA - catB;
      return a.name.localeCompare(b.name);
    });

    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  }, [skills, categoryOrder, limit]);

  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orderedSkills.map((skill, index) => (
        <SkillTile key={`${skill.name}-${index}`} skill={skill} prefersReducedMotion={prefersReducedMotion} index={index} />
      ))}
    </div>
  );
}

type SkillTileProps = {
  skill: SkillItem;
  prefersReducedMotion: boolean;
  index: number;
};

function SkillTile({ skill, prefersReducedMotion, index }: SkillTileProps) {
  const metaLine = skill.description?.length ? skill.description : skill.category;
  const categoryLine = `${skill.category} · ${skill.level}`;
  const iconSrc = skill.icon;

  return (
    <motion.article
      className="group relative flex items-center gap-4 rounded-2xl border border-border/50 bg-background/80 p-4 shadow-[0_18px_45px_-30px_theme(colors.primary/40)] backdrop-blur transition-all duration-600 ease-out hover:border-primary/50 hover:bg-background/90"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(index, 8) * 0.04 }}
    >
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-900/70 shadow-inner shadow-black/30 transition-colors duration-800 ease-out group-hover:bg-zinc-900/90">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt={skill.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-lg font-semibold text-muted-foreground">{getInitials(skill.name)}</span>
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="truncate">
          <ShinyText text={skill.name} className="text-lg font-semibold" disabled={prefersReducedMotion} speed={3} />
        </div>
        <p className="truncate text-sm text-muted-foreground">{metaLine}</p>
        <p className="truncate text-xs uppercase tracking-[0.18em] text-muted-foreground/60">{categoryLine}</p>
      </div>
    </motion.article>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || name.slice(0, 2).toUpperCase();
}
