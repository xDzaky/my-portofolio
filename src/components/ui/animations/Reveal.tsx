"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { DOMMotionComponents, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type MotionTag = keyof typeof motion;

type RevealProps = Omit<HTMLMotionProps<"div">, "ref"> & {
  as?: MotionTag;
};

export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  {
    as = "div",
    className,
    initial,
    whileInView,
    transition,
    viewport,
    children,
    ...rest
  },
  ref,
) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const motionComponents = motion as unknown as DOMMotionComponents;
  const MotionComponent = motionComponents[as] ?? motion.div;

  const defaultInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 };
  const defaultWhileInView = { opacity: 1, y: 0 };
  const defaultTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: "easeOut" };
  const defaultViewport = { once: true, amount: 0.2 };

  return (
    <MotionComponent
      ref={ref as never}
      className={cn(className)}
      initial={initial ?? defaultInitial}
      whileInView={whileInView ?? defaultWhileInView}
      transition={transition ?? defaultTransition}
      viewport={viewport ?? defaultViewport}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
});

export type { RevealProps };
