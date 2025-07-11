"use client";

import Image from "next/image";
import { BoxReveal } from "../ui/boxReveal";
import { HyperText } from "../ui/hyperText";
import { TextReveal } from "../ui/textReveal";
import { useRef } from "react";
import { SpinningText } from "../ui/spinningText";
import confetti from "canvas-confetti";

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
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 pb-10">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate adipisci, vero eos perspiciatis obcaecati voluptate
                optio mollitia, dignissimos illum et reprehenderit enim numquam
                quibusdam ullam itaque commodi modi voluptatem veniam.
                Accusantium aliquam temporibus excepturi nostrum ipsa inventore.
                Ut distinctio, officia enim, dolores vero ducimus iusto
                dignissimos maxime tenetur assumenda ex facilis accusantium, quo
                ipsum. Odit consequuntur blanditiis iste fugiat nam.
              </TextReveal>
            </div>
          </BoxReveal>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <div
          className="relative flex justify-center items-center"
          ref={containerRef}
        >
          <SpinningText className="absolute" radius={13}>
            404 not found • 404 not found • 404 not found •
          </SpinningText>
          <div className="relative z-10 flex size-[200px] items-center justify-center rounded-full overflow-hidden border border-gray-600 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur">
            <Image
              src={"/Profile2.jpg"}
              alt="Imamgg"
              width={200}
              height={200}
              className="object-cover object-top filter md:grayscale grayscale-0 hover:grayscale-0 transition-all duration-300 hover:scale-110"
              onMouseEnter={handleImageHover}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutIntroduction;
