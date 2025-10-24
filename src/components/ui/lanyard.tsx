"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type LanyardSimpleProps = {
  imageUrl: string;
  name: string;
  role: string;
  className?: string;
};

export function LanyardSimple({ imageUrl, name, role, className }: LanyardSimpleProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 120, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 120, damping: 15 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="absolute -top-12 left-1/2 z-20 -translate-x-1/2">
        <div className="relative">
          <div className="h-10 w-20 rounded-t-xl rounded-b-md border border-gray-500/50 bg-gradient-to-b from-gray-400 to-gray-600 shadow-2xl" />
          <div className="absolute top-full left-1/2 h-20 w-1.5 -translate-x-1/2 bg-gradient-to-b from-gray-300 to-gray-500" />
        </div>
      </div>

      <motion.div
        ref={ref}
        className="relative rounded-2xl border border-gray-200/80 bg-gradient-to-br from-white to-gray-100 p-6 shadow-2xl backdrop-blur-sm"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />

        <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-xl border-2 border-white bg-white shadow-lg">
          <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 192px, 192px"
            priority
          />
        </div>

        <div className="space-y-2 text-center [transform-style:preserve-3d]">
          <motion.h3 className="text-lg font-bold leading-tight text-gray-900" style={{ transform: "translateZ(20px)" }}>
            {name}
          </motion.h3>
          <motion.p className="text-sm font-medium text-gray-600" style={{ transform: "translateZ(15px)" }}>
            {role}
          </motion.p>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 left-4 right-4 -z-10 h-4 rounded-full bg-black/20 blur-md"
        style={{ scale: useTransform(rotateY, [-15, 15], [0.8, 1.2]) }}
      />
    </div>
  );
}
