"use client";

import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "../ui/animatedGridPattern";
import { OrbitingCircles } from "../ui/orbitingCircles";
import { useRef } from "react";
import { SparklesText } from "../ui/sparkles-text";
import { BoxReveal } from "../ui/box-reveal";
import { HyperText } from "../ui/hyper-text";
import ScrollVelocity from "../ui/scrollVelocity";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <ScrollVelocity
        velocity={50}
        numCopies={4}
        texts={["WEB DEVELOPER", "WEB3 ENTHUSIAST"]}
      />
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.05}
        duration={3}
        width={60}
        height={60}
        repeatDelay={1}
        className={cn(
          "md:[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] ",
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />

      {/* Hero Section with Morphing Text */}
      <div className="mx-auto relative z-10 flex min-h-screen flex-col">
        {/* Header with Sparkles */}
        <div className="mb-10 flex w-full items-center justify-between gap-x-2 md:mb-16">
          <SparklesText
            className="text-6xl font-bold text-white md:text-7xl"
            colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
            sparklesCount={15}
          >
            About Me
          </SparklesText>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Introduction with Box Reveal */}
            <div className="space-y-6">
              <BoxReveal>
                <h2 className="text-3xl font-bold text-white">
                  Im a<HyperText>Full-Stack Developer</HyperText>
                </h2>
              </BoxReveal>

              <BoxReveal>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non,
                  quis. Non dolore laboriosam amet reiciendis facilis vitae qui
                  ducimus praesentium dolorem pariatur consectetur magni
                  eligendi, cupiditate accusantium ipsa nisi nam?
                </p>
              </BoxReveal>
            </div>
          </div>

          {/* Right Column - Interactive Elements */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Orbiting Circles with Tech Stack */}
            <div className="relative" ref={containerRef}>
              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={20}
                radius={120}
              >
                <span className="text-2xl">⚡</span>
              </OrbitingCircles>

              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={10}
                radius={120}
              >
                <span className="text-2xl">🔷</span>
              </OrbitingCircles>

              <OrbitingCircles
                className="size-[40px] border-none bg-transparent"
                duration={15}
                delay={0}
                radius={80}
                reverse
              >
                <span className="text-xl">🚀</span>
              </OrbitingCircles>

              <OrbitingCircles
                className="size-[40px] border-none bg-transparent"
                duration={15}
                delay={10}
                radius={80}
                reverse
              >
                <span className="text-xl">⚡</span>
              </OrbitingCircles>

              {/* Center Avatar */}
              <div className="relative z-10 flex size-[200px] items-center justify-center rounded-full border-2 border-dashed border-gray-600 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
