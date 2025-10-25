"use client";

import type { PropsWithChildren } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
      className="min-h-[calc(100vh-12rem)]"
    >
      {children}
    </motion.div>
  );
}
