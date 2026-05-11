"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { SparklesText } from "@/components/ui/sparklesText";
import CertificateGrid from "@/components/certificates/certificateGrid";
import Navbar from "@/components/navbar/navbar";
import { ScrollProgress } from "@/components/ui/background/scrollProgress";

export default function CertificatesPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const els = headerRef.current?.querySelectorAll(".cert-page-el");

      els?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.2 + i * 0.1,
          }
        );
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <ScrollProgress />
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 max-w-5xl pt-24 pb-20">
        <div ref={headerRef}>
          <div className="cert-page-el mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              Back to Home
            </Link>
          </div>

          <div className="cert-page-el flex items-center gap-2.5 mb-5">
            <Award className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400 font-mono tracking-wider">
              ~/certificates
            </span>
          </div>

          <div className="cert-page-el mb-4">
            <SparklesText
              className="text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]"
              colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
              sparklesCount={15}
            >
              Certificates
            </SparklesText>
          </div>

          <p className="cert-page-el text-base leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xl mb-12">
            A collection of certifications and achievements from various courses
            and programs.
          </p>
        </div>

        <CertificateGrid />
      </main>
    </div>
  );
}
