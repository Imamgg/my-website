"use client";

import { Ripple } from "../ui/ripple";
import { HeroContent } from "./heroContent";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full flex justify-center items-center overflow-hidden"
    >
      <span
        className="absolute left-2 md:block hidden top-1/2 -translate-y-1/2 text-8xl font-bold tracking-widest opacity-5 select-none pointer-events-none rotate-90"
        aria-hidden="true"
      >
        DEV
      </span>
      <HeroContent
        profileImageSrc="/Profile.jpg"
        profileImageAlt="Imam Syafii"
      />
      <Ripple />
    </section>
  );
};

export default Hero;

