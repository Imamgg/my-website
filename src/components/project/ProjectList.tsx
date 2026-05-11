"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projects, Project } from "@/data/projects";
import { BorderBeam } from "../ui/borderBeam";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardDeckRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const goTo = useCallback(
    (newIndex: number) => {
      if (isAnimating || newIndex === activeIndex) return;
      setIsAnimating(true);
      setActiveIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating, activeIndex]
  );

  const next = () => goTo((activeIndex + 1) % projects.length);
  const prev = () =>
    goTo((activeIndex - 1 + projects.length) % projects.length);

  // Mouse tilt on the card deck
  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardDeckRef.current) return;
    const rect = cardDeckRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -6, y: x * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <div ref={containerRef}>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Left: Stacked card deck with 3D tilt */}
        <div
          ref={cardDeckRef}
          className="relative h-[380px] md:h-[440px] lg:h-[480px]"
          style={{ perspective: "1200px" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ambient glow behind active card */}
          <div
            className="absolute inset-0 rounded-3xl hue-cycle-bg opacity-[0.07] blur-3xl scale-90 transition-opacity duration-700 pointer-events-none"
            style={{ opacity: isHovering ? 0.12 : 0.05 }}
          />

          {projects.map((project, i) => {
            const offset = ((i - activeIndex + projects.length) % projects.length);
            const isActive = offset === 0;

            if (offset > 3 && offset < projects.length - 1) return null;

            const displayOffset = offset > projects.length / 2 ? offset - projects.length : offset;
            const absOffset = Math.abs(displayOffset);

            return (
              <div
                key={project.title}
                className="absolute inset-0 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                style={{
                  transform: `
                    rotateX(${isActive ? tilt.x : 0}deg)
                    rotateY(${isActive ? tilt.y : 0}deg)
                    translateY(${displayOffset * 22}px)
                    translateZ(${-absOffset * 40}px)
                    scale(${1 - absOffset * 0.05})
                  `,
                  zIndex: 10 - absOffset,
                  opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.2,
                  filter: isActive ? "none" : `brightness(${1 - absOffset * 0.1})`,
                  pointerEvents: isActive ? "auto" : "none",
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (!isActive) goTo(i);
                }}
              >
                <ProjectCard project={project} isActive={isActive} />
              </div>
            );
          })}
        </div>

        {/* Right: Active project details */}
        <div className="flex flex-col justify-center lg:pl-4">
          <ProjectDetails
            project={projects[activeIndex]}
            index={activeIndex}
            total={projects.length}
          />

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              disabled={isAnimating}
              className="w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 disabled:opacity-40 active:scale-95"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Progress bar + dots */}
            <div className="flex-1 flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative flex-1 h-1.5 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 transition-all duration-300"
                  aria-label={`Go to project ${i + 1}`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "hue-cycle-bg scale-100"
                        : i < activeIndex
                        ? "bg-zinc-400 dark:bg-zinc-600 scale-100"
                        : "scale-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              disabled={isAnimating}
              className="w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 disabled:opacity-40 active:scale-95"
              aria-label="Next project"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

function ProjectCard({ project, isActive }: ProjectCardProps) {
  return (
    <div className="h-full rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 overflow-hidden relative group shadow-xl shadow-black/10 dark:shadow-black/40">
      {isActive && (
        <BorderBeam
          duration={10}
          borderWidth={1.5}
          className="opacity-40 group-hover:opacity-100 transition-opacity duration-700"
        />
      )}

      <div className="relative h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 ${
            isActive ? "group-hover:scale-[1.03]" : ""
          }`}
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Noise grain texture */}
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-white/15 text-white/80 backdrop-blur-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {project.title}
              </h3>
            </div>

            {/* Quick action icons */}
            <div className="flex items-center gap-2">
              {project.sourceCode && (
                <Link
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/25 hover:text-white transition-all duration-300"
                  aria-label="Source Code"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                </Link>
              )}
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/25 hover:text-white transition-all duration-300"
                  aria-label="Live Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectDetailsProps {
  project: Project;
  index: number;
  total: number;
}

function ProjectDetails({ project, index, total }: ProjectDetailsProps) {
  return (
    <div key={project.title} className="project-detail-enter">
      {/* Counter */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl md:text-6xl font-black hue-cycle-text font-mono leading-none" style={{ animationDelay: `${index * 1.2}s` }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col gap-1">
          <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">
            of {String(total).padStart(2, "0")} projects
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 leading-[1.1] tracking-tight">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag, i) => (
          <span
            key={tag}
            className="project-tag-enter px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/80"
            style={{ animationDelay: `${0.1 + i * 0.05}s` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        {project.sourceCode && (
          <Link
            href={project.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-5 py-3 text-sm font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300"
          >
            <Github size={16} className="group-hover:rotate-12 transition-transform duration-300" />
            Source Code
          </Link>
        )}
        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-5 py-3 text-sm font-medium rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 active:scale-[0.97]"
          >
            <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            Live Demo
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProjectList;
