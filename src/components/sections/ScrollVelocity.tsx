import type { ComponentProps } from "react";

import BaseScrollVelocity from "@/components/scroll-velocity";
import { cn } from "@/lib/utils";

type ScrollVelocityProps = ComponentProps<typeof BaseScrollVelocity>;

export default function ScrollVelocity(props: ScrollVelocityProps) {
  return (
    <div className="w-full px-0">
      <BaseScrollVelocity
        {...props}
        parallaxClassName={cn("w-full bg-background/70 py-4", props.parallaxClassName)}
        scrollerClassName={cn("flex w-full items-center px-6", props.scrollerClassName)}
        numCopies={props.numCopies ?? 8}
      />
    </div>
  );
}
