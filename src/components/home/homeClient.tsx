"use client";

import Preloader from "@/components/preloader/preloader";
import { useState, useEffect } from "react";
import { ScrollProgress } from "@/components/ui/background/scrollProgress";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/hero";
import { AnimatedGridPattern } from "@/components/ui/background/animatedGridPattern";
import { cn } from "@/lib/utils";
import About from "@/components/about/about";
import Project from "@/components/project/project";
import Contact from "@/components/contact/contact";

export default function HomeClient() {
  const [loadingPreloader, setLoadingPreloader] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("preloaderDone")) {
      setLoadingPreloader(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("preloaderDone", "1");
    setLoadingPreloader(false);
  };

  useEffect(() => {
    if (loadingPreloader) return;

    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      sessionStorage.removeItem("scrollTarget");
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [loadingPreloader]);

  return (
    <>
      {loadingPreloader && (
        <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
          <Preloader onComplete={handlePreloaderComplete} foodCount={3} />
        </div>
      )}
      {!loadingPreloader && (
        <div className="h-full w-full bg-zinc-100 dark:bg-zinc-900">
          <ScrollProgress />
          <Navbar />
          <main
            data-scroll-container
            className="relative flex flex-col items-center"
          >
            <Hero />
            <About />
            <Project />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}
