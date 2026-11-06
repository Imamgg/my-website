import React, { useRef, useEffect } from "react";
import { OrbitingCircles } from "../ui/orbitingCircles";
import { ProfileImage } from "./profileImage";
import { TechStackIcons } from "./techStackIcons";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import gsap from "gsap";

interface HeroContentProps {
  profileImageSrc: string;
  profileImageAlt: string;
}

/**
 * Focal moment (impeccable / animate.md): one authored entrance —
 * profile resolves from blur, orbits settle in around it.
 * Supporting motion stays quiet. Content is visible by default;
 * the entrance only runs when JS + motion are available, and
 * prefers-reduced-motion renders the final state instantly.
 */
export const HeroContent: React.FC<HeroContentProps> = ({
  profileImageSrc,
  profileImageAlt,
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });
      tl.fromTo(
        ".hero-grid",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0
      )
        .fromTo(
          profileRef.current,
          { opacity: 0, scale: 0.9, filter: "blur(8px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8 },
          0.05
        )
        .fromTo(
          ".hero-orbit",
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12 },
          0.15
        );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={contentRef}
      className="relative flex h-[36rem] w-full items-center justify-center sm:h-[42rem] md:h-[50rem]"
    >
      <div
        aria-hidden="true"
        className={cn(
          "hero-grid absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-zinc-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      ></div>
      <div
        ref={stageRef}
        className="relative flex h-[600px] w-full origin-center scale-[0.62] flex-col items-center justify-center overflow-hidden min-[480px]:scale-75 sm:scale-90 lg:scale-100"
      >
        <div
          ref={profileRef}
          className="absolute z-20 flex items-center justify-center"
        >
          <ProfileImage
            src={profileImageSrc}
            alt={profileImageAlt}
            size={120}
            className="motion-safe:animate-pulse-slow"
          />
        </div>

        {/* Orbiting Tech Stack Icons */}
        <div className="hero-orbit absolute inset-0 flex items-center justify-center">
          <OrbitingCircles iconSize={48} radius={200} duration={25}>
            <TechStackIcons.css />
            <TechStackIcons.tailwind />
            <TechStackIcons.python />
            <TechStackIcons.nodejs />
            <TechStackIcons.javascript />
            <TechStackIcons.typescript />
            <TechStackIcons.react />
            <TechStackIcons.php />
          </OrbitingCircles>
        </div>

        {/* Inner orbit with smaller radius */}
        <div className="hero-orbit absolute inset-0 flex items-center justify-center">
          <OrbitingCircles iconSize={36} radius={120} duration={20} reverse>
            <TechStackIcons.laravel />
            <TechStackIcons.linux />
            <TechStackIcons.docker />
            <TechStackIcons.nextjs />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
};
