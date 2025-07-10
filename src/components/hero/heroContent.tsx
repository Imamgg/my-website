import React, { useRef, useEffect } from "react";
import { OrbitingCircles } from "../ui/orbitingCircles";
import { ProfileImage } from "./profileImage";
import { TechStackIcons } from "./techStackIcons";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface HeroContentProps {
  profileImageSrc: string;
  profileImageAlt: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  profileImageSrc,
  profileImageAlt,
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.7 }
      );
    }
  }, []);

  return (
    <div
      ref={contentRef}
      className="relative flex h-[50rem] w-full items-center justify-center"
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-zinc-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden">
        <div className="absolute z-20 flex items-center justify-center">
          <ProfileImage
            src={profileImageSrc}
            alt={profileImageAlt}
            size={120}
            className="animate-pulse-slow"
          />
        </div>

        {/* Orbiting Tech Stack Icons */}
        <OrbitingCircles iconSize={48} radius={200} duration={25}>
          <TechStackIcons.ubuntu />
          <TechStackIcons.css />
          <TechStackIcons.typescript />
          <TechStackIcons.github />
          <TechStackIcons.nodejs />
          <TechStackIcons.react />
          <TechStackIcons.javascript />
          <TechStackIcons.php />
        </OrbitingCircles>

        {/* Inner orbit with smaller radius */}
        <OrbitingCircles iconSize={36} radius={120} duration={20} reverse>
          <TechStackIcons.laravel />
          <TechStackIcons.vscode />
          <TechStackIcons.tailwind />
          <TechStackIcons.nextjs />
        </OrbitingCircles>
      </div>
    </div>
  );
};
