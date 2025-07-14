"use client";

import Image from "next/image";
import { BoxReveal } from "../ui/boxReveal";
import { HyperText } from "../ui/hyperText";
import { TextReveal } from "../ui/textReveal";
import { useRef } from "react";
import { SpinningText } from "../ui/spinningText";
import confetti from "canvas-confetti";
import AboutHeader from "./aboutHeader";

const AboutIntroduction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageHover = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 40 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() * 0.2 + 0.3 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() * 0.2 + 0.3 },
      });
    }, 250);
  };

  return (
    <>
      <AboutHeader text="About Me" />
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <div className="space-y-8">
          <div className="space-y-2 md:space-y-4">
            <BoxReveal>
              <h2 className="text-3xl font-mono">
                {`I'm a`}
                <HyperText className="text-2xl py-0 md:text-3xl lg:text-4xl">
                  Full-Stack Developer
                </HyperText>
              </h2>
            </BoxReveal>
            <BoxReveal>
              <div className="text-lg leading-relaxed">
                <TextReveal inline>
                  {`I'm Imam Syafii, an Informatics Engineering student currently studying at Trunojoyo University. I have a strong interest and focus on modern web development, from intuitive user interfaces to scalable back-end systems. Furthermore, I'm actively exploring Web3 and am passionate about exploring various innovations within it, such as blockchain, NFTs, and decentralized applications (dApps). I'm interested in how these technologies have the potential to transform the way we interact digitally.`}
                </TextReveal>
              </div>
            </BoxReveal>
            <BoxReveal>
              <blockquote className="border-l-2 md:border-l-4 border-blue-500 pl-3 md:pl-4 italic text-sm lg:text-base text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-1 md:p-2 lg:p-3 rounded-r-lg leading-relaxed">
                {'"Leveraging AI as a professional tool, not a replacement."'}
              </blockquote>
            </BoxReveal>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div
            className="relative size-[300px] flex justify-center items-center"
            ref={containerRef}
          >
            <SpinningText
              radius={13}
              className="inset-0 absolute items-center justify-center"
            >
              404 not found • 404 not found • 404 not found •
            </SpinningText>
            <div className="inset-0 z-10 size-[200px] items-center justify-center rounded-full overflow-hidden border border-gray-600 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur">
              <Image
                src={"/Profile2.jpg"}
                alt="Imamgg"
                width={300}
                height={300}
                className="object-cover object-top flex filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                onMouseEnter={handleImageHover}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutIntroduction;
