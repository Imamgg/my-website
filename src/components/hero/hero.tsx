"use client";

import { Iphone15Pro } from "../ui/iphone15Pro";
import { Ripple } from "../ui/ripple";
import { HeroContent } from "./heroContent";
import { MorphingText } from "../ui/morphingText";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Hero = () => {
  const morphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (morphRef.current) {
      gsap.fromTo(
        morphRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.8, ease: "power4.inOut", delay: 0.4 }
      );
    }
  }, []);

  return (
    <section className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      <div
        ref={morphRef}
        className="absolute top-24 left-0 z-10 w-full max-w-xl pl-8 text-left"
      >
        <MorphingText
          className="text-xl md:text-3xl lg:text-5xl"
          texts={[
            "I'm Imam Syafii",
            "Informatics Engineering Student",
            "Web3 Enthusiast",
          ]}
        />
      </div>
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
