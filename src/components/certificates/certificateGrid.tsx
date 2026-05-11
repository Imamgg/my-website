"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import { certificates, Certificate } from "@/data/certificates";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CertificateGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);

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

  return (
    <>
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {certificates.map((cert) => (
          <div
            key={`${cert.title}-${cert.date}`}
            className="cert-card group cursor-pointer"
            onClick={() => setSelected(cert)}
          >
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-400/50 dark:hover:border-blue-600/40 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {cert.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {cert.issuer}
                  </p>
                  <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                    {cert.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-zinc-900/60 dark:bg-zinc-100/10 text-white flex items-center justify-center hover:bg-zinc-900/80 dark:hover:bg-zinc-100/20 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
              />
            </div>

            {/* Info bar */}
            <div className="p-5 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {selected.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {selected.issuer} · {selected.date}
                </p>
              </div>
              {selected.credential && (
                <Link
                  href={selected.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-300"
                >
                  <ExternalLink size={14} />
                  Verify
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
