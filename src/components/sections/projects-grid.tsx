"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import type { ProjectFrontmatter } from "@/types/content";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/shared/project-card";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";

type FilterId = "all" | "web" | "web3" | "tools";

type ProjectsGridProps = {
  projects: ProjectFrontmatter[];
  limit?: number;
};

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "web3", label: "Web3" },
  { id: "tools", label: "Tools" },
];

export function ProjectsGrid({ projects, limit }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredProjects = useMemo(() => {
    const base = activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter);
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [activeFilter, limit, projects]);

  return (
    <div className="mt-8 space-y-6">
      <div className="inline-flex flex-wrap gap-2 rounded-full border border-border/60 bg-background/70 p-1 shadow-sm">
        {filters.map((filter) => {
          const isActive = filter.id === activeFilter;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={isActive}
            >
              {isActive ? (
                <motion.span
                  layoutId="projects-filter-indicator"
                  className="pointer-events-none absolute inset-0 rounded-full bg-primary/10 shadow-[0_12px_30px_-18px_theme(colors.primary/70)]"
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              ) : null}
              <span className="relative z-10">{filter.label}</span>
            </button>
          );
        })}
      </div>
      {filteredProjects.length ? (
        <Stagger key={activeFilter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <StaggerItem as="div" key={project.slug}>
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/60 bg-background/50 p-10 text-center text-sm text-muted-foreground">
          <p className="font-medium">Stay tuned!</p>
          <p className="mt-1">Projects for this category are coming soon.</p>
        </div>
      )}
    </div>
  );
}
