import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ShinyTextProps = ComponentProps<"span"> & {
  text: string;
  speed?: number;
  disabled?: boolean;
};

export function ShinyText({ text, speed = 3, disabled = false, className, ...rest }: ShinyTextProps) {
  return (
    <span
      className={cn(
        "relative inline-flex bg-clip-text text-transparent",
        !disabled && "animate-shine",
        className,
      )}
      style={{
        backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
        backgroundSize: "200% 100%",
        animationDuration: `${Math.max(speed * 1000, 1000)}ms`,
      }}
      {...rest}
    >
      {text}
    </span>
  );
}
