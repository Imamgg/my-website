"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { certificates, Certificate } from "@/data/certificates";
import { motion, AnimatePresence } from "motion/react";
import SpotlightCard from "../ui/SpotlightCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CertificateGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".cert-card");

      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    if (selectedIndex < 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setSelectedIndex(-1);
      } else if (e.key === "ArrowRight") {
        const nextIndex = (selectedIndex + 1) % certificates.length;
        setSelected(certificates[nextIndex]);
        setSelectedIndex(nextIndex);
      } else if (e.key === "ArrowLeft") {
        const prevIndex =
          (selectedIndex - 1 + certificates.length) % certificates.length;
        setSelected(certificates[prevIndex]);
        setSelectedIndex(prevIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const openLightbox = (cert: Certificate, index: number) => {
    setSelected(cert);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelected(null);
    setSelectedIndex(-1);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (selectedIndex + 1) % certificates.length;
    setSelected(certificates[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex =
      (selectedIndex - 1 + certificates.length) % certificates.length;
    setSelected(certificates[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {certificates.map((cert, i) => (
          <div
            key={`${cert.title}-${cert.date}`}
            className="cert-card"
          >
            <SpotlightCard
              className="cursor-pointer h-full"
              spotlightColor="rgba(59, 130, 246, 0.15)"
            >
              <div
                className="h-full rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-400/50 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 group"
                onClick={() => openLightbox(cert, i)}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={i < 3}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {cert.issuer}
                    </p>
                    {cert.date && (
                      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                        {cert.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              aria-label="Previous certificate"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              aria-label="Next certificate"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-sm font-mono text-white/60">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(certificates.length).padStart(2, "0")}
            </div>

            <motion.div
              key={selected.image}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl shadow-black/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* Image */}
              <div className="relative w-full aspect-[16/10] bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Info bar */}
              <div className="p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {selected.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {selected.issuer}
                    {selected.date && ` · ${selected.date}`}
                  </p>
                </div>
                {selected.credential && (
                  <Link
                    href={selected.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-300 shrink-0"
                  >
                    <ExternalLink size={14} />
                    Verify
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Keyboard hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs text-white/40">
              <span className="hidden md:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-[10px] font-mono">
                  ←
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-[10px] font-mono">
                  →
                </kbd>
                Navigate
              </span>
              <span className="hidden md:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-[10px] font-mono">
                  Esc
                </kbd>
                Close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
