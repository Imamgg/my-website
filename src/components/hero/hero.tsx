"use client";

import { Iphone15Pro } from "../ui/iphone15Pro";
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
      <Iphone15Pro
        className="absolute bottom-10 right-10 w-40 h-auto lg:block hidden"
        videoSrc="https://videos.pexels.com/video-files/9867271/9867271-uhd_2560_1440_24fps.mp4"
      />
    </section>
  );
};

export default Hero;
