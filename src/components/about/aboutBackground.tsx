"use client";

import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "../ui/animatedGridPattern";
import ScrollVelocity from "../ui/scrollVelocity";

const AboutBackground = () => {
  return (
    <>
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
    </>
  );
};

export default AboutBackground;
