"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Mail } from "lucide-react";
import { SparklesText } from "../ui/sparklesText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactHeader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const els = containerRef.current?.querySelectorAll(".contact-header-el");

      els?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
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
    <div ref={containerRef} className="text-center mb-16 md:mb-20">
      {/* Breadcrumb */}
      <div className="contact-header-el flex items-center justify-center gap-2 mb-6">
        <Mail size={16} className="hue-cycle-text" />
        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-mono tracking-wider">
          ~/contact
        </span>
      </div>

      {/* Big headline */}
      <div className="contact-header-el mb-6">
        <SparklesText
          className="text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[50px] md:text-[64px] lg:text-[80px]"
          colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
          sparklesCount={15}
        >
          {`Let's Build Together`}
        </SparklesText>
      </div>

      <p className="contact-header-el text-base md:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-8">
        Have an idea, a project, or just want to say hi? Drop me a message and I'll get back to you as soon as I can.
      </p>

      {/* Quick info pills */}
      <div className="contact-header-el flex flex-wrap gap-3 justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-600 dark:text-zinc-400">
          <MapPin size={14} className="hue-cycle-text" />
          Indonesia
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-600 dark:text-zinc-400">
          <Clock size={14} className="hue-cycle-text" />
          GMT+7
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-40" />
          </div>
          Available for work
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
