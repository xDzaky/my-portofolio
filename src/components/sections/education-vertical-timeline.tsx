"use client";

import type { CSSProperties } from "react";
import { useMemo, useRef, useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { GraduationCap, School, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import type { EducationItem } from "@/types/content";

type EducationVerticalTimelineProps = {
  items: EducationItem[];
};

type Palette = {
  line: string;
  iconBackground: string;
  iconGlow: string;
  arrow: string;
  highlightBg: string;
  highlightHover: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const bulletVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function formatPeriod(start: string, end: string | null) {
  const formatter = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" });
  const startDate = new Date(`${start}-01`);
  const endDate = end ? new Date(`${end}-01`) : null;
  const startLabel = Number.isNaN(startDate.getTime()) ? start : formatter.format(startDate);
  const endLabel = !endDate || Number.isNaN(endDate.getTime()) ? "Sekarang" : formatter.format(endDate);
  return `${startLabel.toUpperCase()} — ${endLabel.toUpperCase()}`;
}

const educationIconMap: Record<string, JSX.Element> = {
  smk: <School className="h-4 w-4" />,
  sma: <School className="h-4 w-4" />,
  "smk negeri 1 kota probolinggo": <School className="h-4 w-4" />,
  mts: <BookOpen className="h-4 w-4" />,
  smp: <BookOpen className="h-4 w-4" />,
  "mtsn 1 kota probolinggo": <BookOpen className="h-4 w-4" />,
  sd: <GraduationCap className="h-4 w-4" />,
  "sd negeri wiroborang 1 probolinggo": <GraduationCap className="h-4 w-4" />,
};

function getEducationIcon(level: string) {
  const key = level.toLowerCase();
  const IconElement = educationIconMap[key] ?? <GraduationCap className="h-4 w-4" />;

  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/90 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]">
      {IconElement}
    </span>
  );
}

export function EducationVerticalTimeline({ items }: EducationVerticalTimelineProps) {
  const { resolvedTheme } = useTheme();
  const themeKey = resolvedTheme ?? "dark";
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const palette: Palette = useMemo(() => {
    const isDark = themeKey === "dark";
    return {
      line: isDark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.3)",
      iconBackground: isDark
        ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 100%)"
        : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.7) 100%)",
      iconGlow: isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.4)",
      arrow: isDark ? "0.45rem solid rgba(255,255,255,0.2)" : "0.45rem solid rgba(255,255,255,0.25)",
      highlightBg: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)",
      highlightHover: isDark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.2)",
    };
  }, [themeKey]);

  const timelineItems = useMemo(
    () => items.slice().sort((a, b) => (a.start > b.start ? -1 : 1)),
    [items],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timeline = timelineRef.current;
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - timelineTop) / (windowHeight + timelineHeight)
        ));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={timelineRef} className="relative">
      {/* Animated Line */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-white/0 via-white/30 to-white/0"
        style={{
          scaleY: scrollProgress,
          transformOrigin: "top",
        }}
        transition={{ duration: 0.1 }}
      />
      
      <VerticalTimeline
        animate
        lineColor="transparent" // Hide original line
        className="[&_.vertical-timeline-element]:!mt-16 [&_.vertical-timeline-element-content]:!bg-transparent [&_.vertical-timeline-element-content]:!shadow-none [&_.vertical-timeline-element-content]:!p-0 [&_.vertical-timeline-element-icon]:!shadow-[0_0_0_4px_var(--icon-glow)]"
      >
        {timelineItems.map((item) => {
          const iconStyle: CSSProperties = {
            background: palette.iconBackground,
            boxShadow: `0 12px 32px -12px ${palette.iconGlow}`,
            "--icon-glow": palette.iconGlow,
          } as CSSProperties;

          return (
            <VerticalTimelineElement
              key={`${item.school}-${item.start}`}
              date={formatPeriod(item.start, item.end)}
              dateClassName="font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/70"
              iconStyle={iconStyle}
              contentStyle={{ background: "transparent", boxShadow: "none" }}
              contentArrowStyle={{ borderRight: palette.arrow }}
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{ y: -6, scale: 1.005 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/5 via-background to-background/60 p-8 backdrop-blur-xl"
              >
                <header className="space-y-2">
                  <motion.h3
                    className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-lg font-semibold text-transparent"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16 }}
                  >
                    {item.school}
                  </motion.h3>
                  <p className="text-sm font-semibold text-white/80">{item.major}</p>
                </header>

                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="mt-5 space-y-3 text-sm text-white/80"
                >
                  {item.highlights.map((highlight, highlightIndex) => (
                    <motion.li
                      key={highlight}
                      variants={bulletVariants}
                      whileHover={{ 
                        backgroundColor: palette.highlightHover,
                        x: 4
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="relative overflow-hidden rounded-2xl border border-white/15 px-5 py-3"
                      style={{
                        background: palette.highlightBg,
                        boxShadow: "0 18px 40px -24px rgba(255,255,255,0.4)",
                      }}
                    >
                      <motion.div
                        className="absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/20"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        transition={{ type: "spring", stiffness: 360, damping: 18 }}
                      >
                        <motion.span
                          className="text-white"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: highlightIndex * 0.1 + 0.3 }}
                        >
                          {getEducationIcon(item.school)}
                        </motion.span>
                      </motion.div>
                      <span className="ml-8 block leading-relaxed">{highlight}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}
