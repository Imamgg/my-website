"use client";

import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  delay?: number;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  duration = 8,
  delay = 0,
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border-beam-effect",
        className
      )}
      style={
        {
          "--border-beam-duration": `${duration}s`,
          "--border-beam-delay": `${delay}s`,
          "--border-beam-width": `${borderWidth}px`,
        } as CSSProperties
      }
    />
  );
}
