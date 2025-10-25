"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ForwardRefComponent, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type MotionTag = keyof typeof motion;

type StaggerProps = Omit<HTMLMotionProps<"div">, "ref"> & {
  as?: MotionTag;
  delayChildren?: number;
  staggerChildren?: number;
};

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "ref"> & {
  as?: MotionTag;
};

export const Stagger = forwardRef<HTMLElement, StaggerProps>(function Stagger(
  {
    as = "div",
    className,
    variants,
    initial,
    whileInView,
    viewport,
    delayChildren = 0.12,
    staggerChildren = 0.08,
    children,
    ...rest
  },
  ref,
) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const motionComponents = motion as unknown as Record<
    MotionTag,
    ForwardRefComponent<any, HTMLMotionProps<any>>
  >;
  const MotionComponent = motionComponents[as] ?? motion.div;

  const containerVariants = variants ?? {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.3,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren,
            delayChildren,
          },
    },
  };

  const defaultViewport = { once: true, amount: 0.2 };

  return (
    <MotionComponent
      ref={ref as never}
      className={cn(className)}
      variants={containerVariants}
      initial={initial ?? "hidden"}
      whileInView={whileInView ?? "visible"}
      viewport={viewport ?? defaultViewport}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
});

export const StaggerItem = forwardRef<HTMLElement, StaggerItemProps>(function StaggerItem(
  { as = "div", className, variants, children, ...rest },
  ref,
) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const motionComponents = motion as unknown as Record<
    MotionTag,
    ForwardRefComponent<any, HTMLMotionProps<any>>
  >;
  const MotionComponent = motionComponents[as] ?? motion.div;

  const itemVariants = variants ??
    (prefersReducedMotion
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      : {
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          },
        });

  return (
    <MotionComponent ref={ref as never} className={cn(className)} variants={itemVariants} {...rest}>
      {children}
    </MotionComponent>
  );
});

export type { StaggerProps, StaggerItemProps };
