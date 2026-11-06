"use client";

import gsap from "gsap";
import { Code2 } from "lucide-react";
import { useIsomorphicLayoutEffect } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

export default function NavHome() {
  const el = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(el.current, { x: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(el.current, { x: 0, duration: 0.6, ease: "expo.out" }, 0);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={el}
      className="pointer-events-auto fixed left-6 top-6 translate-x-[calc(-15rem-2.5vw)] z-50"
    >
      <div className="overflow-hidden">
        <Link
          href="/"
          className="group inline-flex items-center gap-x-3 px-6 py-3 rounded-2xl transition-all duration-300 transform"
        >
          <div className="relative">
            <Code2 className="h-7 w-7 text-brand transition-all duration-300 ease-in-out group-hover:rotate-[20deg] group-hover:text-brand" />
            <div className="absolute inset-0 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase group-hover:text-brand transition-colors duration-300 leading-none">
              Coding with
            </p>
            <p className="text-xs group-hover:text-brand transition-colors duration-300">
              Imamgg
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
