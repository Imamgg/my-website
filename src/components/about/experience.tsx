"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  GraduationCap,
  FlaskConical,
  Monitor,
  ChevronRight,
} from "lucide-react";
import AboutHeader from "./aboutHeader";
import { experiences, ExperienceItem } from "@/data/experiences";
import ElectricBorder from "../ui/ElectricBorder";
import { useTheme } from "next-themes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<ExperienceItem["iconName"], React.ReactNode> = {
  monitor: <Monitor size={22} />,
  "graduation-cap": <GraduationCap size={22} />,
  "flask-conical": <FlaskConical size={22} />,
  briefcase: <Briefcase size={22} />,
};

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const cards = trackRef.current.querySelectorAll(".h-scroll-card");
    const totalScroll = trackRef.current.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const scrollTween = gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (experiences.length - 1));
            setActiveIndex(idx);
          },
          onEnter: () => setIsActive(true),
          onLeave: () => setIsActive(false),
          onEnterBack: () => setIsActive(true),
          onLeaveBack: () => setIsActive(false),
        },
      });

      cards.forEach((card) => {
        const inner = card.querySelector(".card-inner");
        const icon = card.querySelector(".card-icon");
        const tagContainer = card.querySelector(".card-tags");

        if (inner) {
          gsap.fromTo(
            inner,
            { y: 30, opacity: 0.4 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 80%",
                end: "left 40%",
                scrub: 1,
              },
            }
          );
        }

        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0.5, rotate: -20 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 70%",
                end: "left 50%",
                scrub: 1,
              },
            }
          );
        }

        if (tagContainer) {
          const tags = tagContainer.querySelectorAll(".exp-tag");
          gsap.fromTo(
            tags,
            { y: 10, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 60%",
                end: "left 35%",
                scrub: 1,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen overflow-x-hidden">
      <div className="pt-10">
        <AboutHeader
          text="Experience"
          className="flex flex-col items-center justify-center"
          breadcrumbText="~/experience"
          breadcrumbIcon={<Briefcase size={16} className="hue-cycle-text" />}
        />
      </div>

      <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`w-2 rounded-full transition-all duration-500 ${i === activeIndex
              ? `h-6 ${exp.color.replace("text-", "bg-")}`
              : "h-2 bg-zinc-300 dark:bg-zinc-700"
              }`}
          />
        ))}
      </div>

      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-3 px-5 py-2.5 rounded-full glass-container transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          {String(activeIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
        </span>
        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 max-w-[200px] truncate">
          {experiences[activeIndex]?.role}
        </span>
        <ChevronRight size={14} className="text-zinc-400 animate-pulse" />
      </div>

      <div ref={trackRef} className="flex gap-6 md:gap-8 px-8 md:px-16 py-12 w-max">
        {experiences.map((exp, i) => (
          <div
            key={`${exp.role}-${exp.date}`}
            className="h-scroll-card w-[85vw] md:w-[550px] lg:w-[600px] flex-shrink-0"
          >
            <div
              className={`card-inner h-full transition-all duration-500 group relative`}
            >
              <ElectricBorder
                color={isDark ? "#818cf8" : "#3b82f6"}
                speed={1}
                chaos={0.12}
                borderRadius={24}
                className="h-full"
              >
                <div className="h-full p-6 md:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-sm relative overflow-hidden">
                  <span className="absolute -right-4 -top-8 text-[140px] font-black text-zinc-100 dark:text-zinc-800/50 select-none leading-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="card-icon w-12 h-12 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hue-cycle-text bg-zinc-50 dark:bg-zinc-800 group-hover:scale-110 transition-transform duration-300"
                        style={{ animationDelay: `${i * 1.2}s` }}
                      >
                        {iconMap[exp.iconName]}
                      </div>
                      <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 tracking-wider bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        {exp.date}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1 leading-tight">
                      {exp.role}
                    </h3>

                    <p
                      className="text-sm font-semibold hue-cycle-text mb-4"
                      style={{ animationDelay: `${i * 1.2}s` }}
                    >
                      {exp.organization}
                    </p>

                    <p className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 flex-1">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </ElectricBorder>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
