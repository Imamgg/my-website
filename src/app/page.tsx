"use client";
import Preloader from "@/components/preloader/Preloader";
import { useState } from "react";
import { ScrollProgress } from "@/components/ui/scrollProgress";
import { Particles } from "@/components/ui/particles";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/hero";

export default function Home() {
  const [loadingPreloader, setLoadingPreloader] = useState(true);
  const handlePreloaderComplete = () => {
    setLoadingPreloader(false);
  };

  return (
    <>
      {loadingPreloader && (
        <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full absolute inset-0 h-screen">
            <Particles />
          </div>
          <Preloader
            text="Hello, Everyone!"
            className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white"
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
        <div className="h-full w-full bg-zinc-900">
          <ScrollProgress />
          <Navbar />
          <main data-scroll-container className="flex flex-col items-center">
            <Hero />
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-3xl font-bold text-slate-200">Test Page</h1>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
