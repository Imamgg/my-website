"use client";
import Preloader from "@/components/preloader/Preloader";
import { useState } from "react";
import { ScrollProgress } from "@/components/ui/background/scrollProgress";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/hero";
import { AnimatedGridPattern } from "@/components/ui/background/animatedGridPattern";
import { cn } from "@/lib/utils";
import About from "@/components/about/about";
import Project from "@/components/project/project";

export default function Home() {
  const [loadingPreloader, setLoadingPreloader] = useState(true);
  const handlePreloaderComplete = () => {
    setLoadingPreloader(false);
  };

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
          <Preloader
            text="Hello, Everyone!"
            showStickman={true}
            className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-slate-200"
            delay={100}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handlePreloaderComplete}
          />
        </div>
      )}
      {!loadingPreloader && (
        <div className="h-full w-full bg-zinc-100 dark:bg-zinc-900">
          <ScrollProgress />
          <Navbar />
          <main data-scroll-container className="flex flex-col items-center">
            <Hero />
            <About />
            <Project />
          </main>
        </div>
      )}
    </>
  );
}
