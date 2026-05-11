"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock } from "lucide-react";
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
    <div ref={containerRef} className="mb-16 md:mb-20">
      {/* Big headline */}
      <div className="contact-header-el mb-8">
        <SparklesText
          className="text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]"
          colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
          sparklesCount={15}
        >
          {`Let's Talk`}
        </SparklesText>
      </div>

      <p className="contact-header-el text-base md:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xl mb-10">
        Have an idea, a project, or just want to say hi? Drop me a message and
        {` I'll`} get back to you as soon as I can.
      </p>

      {/* Quick info pills */}
      <div className="contact-header-el flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-600 dark:text-zinc-400">
          <MapPin size={14} className="text-blue-500" />
          Indonesia
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-600 dark:text-zinc-400">
          <Clock size={14} className="text-blue-500" />
          GMT+7
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
