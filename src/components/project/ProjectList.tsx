"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectList = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".project-card");

      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.08,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <div ref={containerRef} className="space-y-5">
      {/* Featured Project */}
      <FeaturedCard project={featured} />

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rest.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
};

interface ProjectProps {
  project: (typeof projects)[number];
}

function FeaturedCard({ project }: ProjectProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-blue-400/50 dark:hover:border-blue-600/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-all duration-700 ease-out ${
              hovered ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-zinc-900/10 dark:bg-zinc-900/20" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-blue-500 text-white">
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 mb-5">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.sourceCode && (
              <Link
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors duration-300"
              >
                <Github size={16} />
                Source
              </Link>
            )}
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-300"
              >
                <ExternalLink size={16} />
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: ProjectProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-blue-400/50 dark:hover:border-blue-600/40 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-all duration-700 ease-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-zinc-900/5 dark:bg-zinc-900/15" />

        {/* Hover overlay with links */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 bg-zinc-900/60 backdrop-blur-sm transition-all duration-400 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {project.sourceCode && (
            <Link
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-zinc-900 hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label="Source Code"
            >
              <Github size={18} />
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-zinc-900 hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label="Live Demo"
            >
              <ExternalLink size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="flex-shrink-0 mt-1 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>

        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
