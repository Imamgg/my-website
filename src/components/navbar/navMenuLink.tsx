"use client";

import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "motion/react";
import { useEffect, useRef } from "react";

interface NavMenuLinkProps {
  title: string;
  active: boolean;
  duration: number;
  handleScroll: () => void;
}

export default function NavMenuLink({
  title,
  active,
  duration,
  handleScroll,
}: NavMenuLinkProps) {
  const el = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(gsap.timeline({ paused: true }));

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      tl.current?.fromTo(
        el.current,
        { x: 150 },
        { x: 0, duration: duration, ease: "power3.inOut" },
        0
      );
    }, el);
  }, []);

  useEffect(() => {
    if (active) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [active]);

  return (
    <div ref={el}>
      <div
        className="group flex !w-full cursor-pointer items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-zinc-200 to-blue-50/50 dark:from-zinc-900 dark:to-blue-950/30 border border-blue-100/50 dark:border-blue-900/50 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/70 dark:hover:from-blue-950/40 dark:hover:to-blue-900/60 hover:shadow-lg hover:border-blue-300/50 dark:hover:border-blue-800/50 hover:scale-[1.02] transform"
        onClick={() => handleScroll()}
      >
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-400 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          <p className="font-medium transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400 group-hover:font-semibold text-lg">
            {title}
          </p>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-500/20 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
