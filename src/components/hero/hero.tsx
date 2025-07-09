"use client";

import { Ripple } from "../ui/ripple";
import { HeroContent } from "./heroContent";

// import { AnimatedGridPattern } from "../ui/animatedGridPattern";
// import { HeroContent } from "./heroContent";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <HeroContent
        profileImageSrc="/Profile.jpg"
        profileImageAlt="Imam Syafii"
      />
      <Ripple />
    </section>
  );
};

export default Hero;
