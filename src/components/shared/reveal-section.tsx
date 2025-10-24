"use client";

import type { PropsWithChildren } from "react";

import { Reveal } from "@/components/ui/animations/Reveal";
import type { RevealProps } from "@/components/ui/animations/Reveal";

type RevealSectionProps = PropsWithChildren<Omit<RevealProps, "as">>;

export function RevealSection({ children, className, ...rest }: RevealSectionProps) {
  return (
    <Reveal as="section" className={className} {...rest}>
      {children}
    </Reveal>
  );
}
