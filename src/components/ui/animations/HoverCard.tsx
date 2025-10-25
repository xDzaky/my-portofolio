"use client";

import { forwardRef, useCallback } from "react";
import type {
  ElementRef,
  ForwardedRef,
  MouseEventHandler,
  ReactElement,
  Ref,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { DOMMotionComponents, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type MotionTag = Extract<keyof DOMMotionComponents, keyof HTMLElementTagNameMap>;

type HoverCardProps<Tag extends MotionTag = "div"> = Omit<HTMLMotionProps<Tag>, "ref"> & {
  as?: Tag;
  tilt?: number;
  enableGlow?: boolean;
};

type HoverCardMouseEvent<Tag extends MotionTag> =
  HoverCardProps<Tag>["onMouseMove"] extends (event: infer Event) => unknown ? Event : never;

type HoverCardMouseLeaveEvent<Tag extends MotionTag> =
  HoverCardProps<Tag>["onMouseLeave"] extends (event: infer Event) => unknown ? Event : never;

function HoverCardInner<Tag extends MotionTag = "div">(
  {
    as = "div" as Tag,
    className,
    style,
    tilt = 10,
    enableGlow = true,
    onMouseMove,
    onMouseLeave,
    children,
    ...rest
  }: HoverCardProps<Tag>,
  ref: ForwardedRef<ElementRef<DOMMotionComponents[Tag]>>,
) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const rotateX = useSpring(0, { stiffness: 180, damping: 16, mass: 0.2 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 16, mass: 0.2 });
  const glowX = useMotionValue(50);

  const motionComponents = motion as unknown as DOMMotionComponents;
  const MotionComponent = motionComponents[as] ?? motion.div;

  const glowTranslateX = useTransform(glowX, [0, 100], [-30, 30]);
  const glowOpacity = useTransform(glowX, [0, 50, 100], [0.1, 0.4, 0.1]);

  const handleMouseMove = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      if (prefersReducedMotion) {
        onMouseMove?.(event as HoverCardMouseEvent<Tag>);
        return;
      }

      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const percentX = (offsetX / rect.width) * 100;
      const percentY = (offsetY / rect.height) * 100;
      const clampedTilt = Math.max(2, tilt);

      const tiltX = ((percentY - 50) / 50) * clampedTilt;
      const tiltY = ((percentX - 50) / 50) * clampedTilt * -1;

      rotateX.set(tiltX);
      rotateY.set(tiltY);
      glowX.set(percentX);

      onMouseMove?.(event as HoverCardMouseEvent<Tag>);
    },
    [glowX, prefersReducedMotion, rotateX, rotateY, tilt, onMouseMove],
  );

  const handleMouseLeave = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      rotateX.set(0);
      rotateY.set(0);
      glowX.set(50);
      onMouseLeave?.(event as HoverCardMouseLeaveEvent<Tag>);
    },
    [glowX, onMouseLeave, rotateX, rotateY],
  );

  return (
    <MotionComponent
      ref={ref}
      className={cn("relative will-change-transform", className)}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 160, damping: 18, mass: 0.2 }}
      {...(rest as HTMLMotionProps<Tag>)}
    >
      {enableGlow && !prefersReducedMotion ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent"
          style={{
            opacity: glowOpacity,
            translateX: glowTranslateX,
            translateY: -10,
            filter: "blur(20px)",
          }}
        />
      ) : null}
      <span className="pointer-events-none absolute inset-0 rounded-2xl border border-border/40" aria-hidden />
      <div className="relative z-10" style={{ transform: "translateZ(8px)" }}>
        {children}
      </div>
    </MotionComponent>
  );
}

export const HoverCard = forwardRef(HoverCardInner) as <
  Tag extends MotionTag = "div"
>(
  props: HoverCardProps<Tag> & {
    ref?: Ref<ElementRef<DOMMotionComponents[Tag]>>;
  },
) => ReactElement | null;

export type { HoverCardProps };
