"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code } from "lucide-react";
import { SparklesText } from "../ui/sparklesText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectHeader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const els = containerRef.current?.querySelectorAll(".proj-header-el");

      els?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mb-12 md:mb-16">
      <div className="proj-header-el flex items-center gap-2.5 mb-5">
        <Code className="w-5 h-5 text-blue-500" />
        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-mono tracking-wider">
          ~/projects
        </span>
      </div>

      <div className="proj-header-el">
        <SparklesText
          className="text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]"
          colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
          sparklesCount={15}
        >
          My Projects
        </SparklesText>
      </div>

      <p className="proj-header-el mt-6 max-w-lg text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
        {`Things I've built with care - from full-stack apps to creative experiments.`}
      </p>
    </div>
  );
};

export default ProjectHeader;
