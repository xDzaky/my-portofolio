"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type SegmentedMeterProps = {
  segments?: number;
  filled: number;
  className?: string;
};

export function SegmentedMeter({ segments = 4, filled, className }: SegmentedMeterProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const [hasAnimated, setHasAnimated] = useState(prefersReducedMotion);

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  const segmentArray = useMemo(() => Array.from({ length: Math.max(segments, 1) }), [segments]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid grid-cols-4 gap-1.5 rounded-full border border-border/60 bg-background/70 p-1",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${Math.max(segments, 1)}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {segmentArray.map((_, index) => {
        const isActive = index < filled;
        const delay = hasAnimated && !prefersReducedMotion ? index * 0.08 : 0;
        return (
          <motion.span
            key={index}
            className={cn(
              "h-1.5 rounded-full bg-border/70",
              isActive && "shadow-[0_2px_12px_-6px_theme(colors.primary/70)]",
            )}
            data-filled={isActive}
            initial={{
              scaleX: prefersReducedMotion ? 1 : 0.2,
              opacity: isActive ? 0.4 : 0.18,
              backgroundColor: isActive ? "var(--meter-active, rgba(37, 99, 235, 0.8))" : "rgba(148, 163, 184, 0.35)",
            }}
            animate={{
              scaleX: 1,
              opacity: isActive ? 1 : 0.26,
              backgroundColor: isActive
                ? "var(--meter-active, rgba(37, 99, 235, 0.85))"
                : "rgba(148, 163, 184, 0.3)",
            }}
            transition={{ duration: 0.35, ease: "easeOut", delay }}
            style={{ transformOrigin: "left center" }}
          />
        );
      })}
    </div>
  );
}
