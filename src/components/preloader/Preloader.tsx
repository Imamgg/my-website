"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  showStickman?: boolean;
}

const Preloader: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  showStickman = false,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const stickmanRef = useRef<HTMLDivElement>(null);
  const animationCompletedRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !text) return;

    const el = ref.current;
    const stickmanEl = stickmanRef.current;

    animationCompletedRef.current = false;

    // Stickman animation timeline
    if (showStickman && stickmanEl) {
      const stickmanTl = gsap.timeline();

      // Initial state (off-screen)
      gsap.set(stickmanEl, {
        opacity: 1,
        scale: 0.5,
        x: -120,
        y: -40,
        rotation: -15,
      });

      // Entrance animation
      stickmanTl.to(stickmanEl, {
        x: 0,
        y: -20,
        scale: 0.8,
        rotation: -5,
        duration: 1,
        ease: "power2.out",
      });

      // Flying animation loop
      stickmanTl
        .to(stickmanEl, {
          y: -30,
          rotation: 5,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(stickmanEl, {
          y: -15,
          rotation: -3,
          duration: 0.6,
          ease: "power2.inOut",
        })
        .to(stickmanEl, {
          y: -25,
          rotation: 2,
          duration: 0.7,
          ease: "power2.inOut",
        }); // Energy trail particles animation
      const particles = stickmanEl.querySelectorAll(".jetpack-particle");
      particles.forEach((particle, i) => {
        // Initial particles state
        gsap.set(particle, { opacity: 0, scaleX: 0.3 });

        // Particles start animation (delayed for entrance)
        gsap.to(particle, {
          opacity: 0.8 - i * 0.1,
          scaleX: 1,
          duration: 0.5,
          delay: 1 + i * 0.1,
          ease: "power2.out",
        });

        // Continuous trail animation (moving backwards)
        gsap.to(particle, {
          x: -60 - i * 20,
          opacity: 0,
          scaleX: 0.2,
          duration: 0.6,
          delay: 1.5 + i * 0.05,
          repeat: -1,
          ease: "power2.out",
        });
      });

      // Progress bar animation
      const progressFill = stickmanEl.querySelector(".progress-fill");
      if (progressFill) {
        gsap.to(progressFill, {
          width: "100%",
          duration: 2.5,
          delay: 1,
          ease: "power2.inOut",
        });
      }

      // Engine glow intensification during exit preparation
      const engineGlow = stickmanEl.querySelector(".animate-pulse");
      if (engineGlow) {
        gsap.to(engineGlow, {
          scale: 1.2,
          opacity: 0.8,
          duration: 0.3,
          delay: 2.7,
          ease: "power2.out",
        });
      }

      // Cockpit window flash effect before exit
      const cockpitWindow = stickmanEl.querySelector(".bg-gradient-to-br");
      if (cockpitWindow) {
        gsap.to(cockpitWindow, {
          scale: 1.1,
          opacity: 1,
          duration: 0.2,
          delay: 2.9,
          ease: "power2.out",
        });
      }

      // Spaceship vibration effect before exit (charging up)
      gsap.to(stickmanEl, {
        x: "+=2",
        y: "+=1",
        rotation: "+=1",
        duration: 0.1,
        delay: 2.7,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Hide stickman after 3 seconds with exit animation
      gsap.to(stickmanEl, {
        x: 150,
        y: -100,
        rotation: 25,
        scale: 0.4,
        duration: 1.5,
        delay: 3,
        ease: "power2.inOut",
      });

      // Fade out stickman smoothly
      gsap.to(stickmanEl, {
        opacity: 0,
        duration: 1,
        delay: 4,
        ease: "power2.out",
        onComplete: () => {
          if (stickmanEl) {
            stickmanEl.style.display = "none";
          }
        },
      });

      // Engine boost effect before exit (stronger thrust)
      const engineCore = stickmanEl.querySelector(".animate-ping");
      if (engineCore) {
        gsap.to(engineCore, {
          scale: 1.5,
          opacity: 1,
          duration: 0.4,
          delay: 2.7,
          ease: "power2.out",
        });
      }

      // Progress bar final push
      if (progressFill) {
        gsap.to(progressFill, {
          width: "110%",
          duration: 0.5,
          delay: 2.8,
          ease: "power3.out",
        });
      }

      // Energy trail boost effect before exit
      gsap.to(particles, {
        scaleX: 2.5,
        opacity: 1,
        duration: 0.4,
        delay: 2.8,
        ease: "power2.out",
      });

      // Extended trail during exit
      gsap.to(particles, {
        x: -120,
        scaleX: 3,
        opacity: 0.9,
        duration: 0.8,
        delay: 3,
        ease: "power2.inOut",
      });

      // Final trail fade out
      gsap.to(particles, {
        opacity: 0,
        scaleX: 0.1,
        duration: 0.8,
        delay: 3.8,
        ease: "power2.in",
      });
    }

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    let splitter: GSAPSplitText;
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: "split-line",
      });
    } catch (error) {
      console.error("Failed to create SplitText:", error);
      return;
    }

    let targets: Element[];
    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "chars":
        targets = splitter.chars;
        break;
      default:
        targets = splitter.chars;
    }

    if (!targets || targets.length === 0) {
      console.warn("No targets found for SplitText animation");
      splitter.revert();
      return;
    }

    targets.forEach((t) => {
      (t as HTMLElement).style.willChange = "transform, opacity";
    });

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
    const sign =
      marginValue < 0
        ? `-=${Math.abs(marginValue)}${marginUnit}`
        : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
        onToggle: (self) => {
          scrollTriggerRef.current = self;
        },
      },
      smoothChildTiming: true,
      onComplete: () => {
        animationCompletedRef.current = true;
        gsap.set(targets, {
          ...to,
          clearProps: "willChange",
          immediateRender: true,
        });
        onLetterAnimationComplete?.();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      tl.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      gsap.killTweensOf(targets);
      if (splitter) {
        splitter.revert();
      }
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
    showStickman,
  ]);

  return (
    <div className="relative inline-block">
      {/* Spaceship Loader */}
      {showStickman && (
        <div
          ref={stickmanRef}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10"
          style={{ opacity: 0 }}
        >
          {/* Main Spaceship Container */}
          <div className="relative w-24 h-16">
            {/* Energy Trail/Laser Beams */}
            <div className="absolute top-1 left-16 w-8 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full jetpack-particle opacity-80 shadow-lg shadow-purple-500/50"></div>
            <div className="absolute top-3 left-16 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full jetpack-particle opacity-70 shadow-md shadow-purple-400/40"></div>
            <div className="absolute top-2 left-16 w-7 h-0.5 bg-gradient-to-r from-purple-700 to-blue-600 rounded-full jetpack-particle opacity-60 shadow-sm shadow-purple-600/30"></div>
            <div className="absolute top-4 left-16 w-9 h-0.5 bg-gradient-to-r from-purple-400 to-blue-300 rounded-full jetpack-particle opacity-50 shadow-sm shadow-purple-300/20"></div>

            {/* Main Body - Triangle Shape */}
            <div
              className="absolute top-2 left-2"
              style={{
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderRight: "60px solid #7C3AED",
                borderBottom: "6px solid transparent",
              }}
            ></div>

            {/* Main Cockpit - Circle */}
            <div className="absolute top-0 -right-2 w-6 h-6 bg-purple-600 rounded-full border-2 border-purple-400">
              {/* Cockpit Window */}
              <div className="absolute top-1 left-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
            </div>

            {/* Wing Extension */}
            <div
              className="absolute top-0 right-4"
              style={{
                width: 0,
                height: 0,
                borderTop: "0px solid transparent",
                borderRight: "50px solid #7C3AED",
                borderBottom: "16px solid transparent",
              }}
            ></div>

            {/* Engine/Thruster */}
            <div className="absolute top-1 right-6 w-5 h-3 bg-gradient-to-r from-purple-700 to-purple-500 rounded-l-full shadow-lg shadow-purple-600/60">
              {/* Engine Glow */}
              <div className="absolute -top-0.5 -left-1 w-6 h-4 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
              {/* Engine Core */}
              <div className="absolute top-0.5 left-1 w-3 h-2 bg-blue-400 rounded-full animate-ping"></div>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div className="progress-fill h-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full w-0 shadow-sm"></div>
            </div>

            {/* Additional Details */}
            <div className="absolute top-3 right-8 w-1 h-1 bg-blue-400 rounded-full animate-ping shadow-sm shadow-blue-400/50"></div>
            <div className="absolute top-1 right-9 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse shadow-sm shadow-purple-300/50"></div>
            <div className="absolute top-2.5 right-7 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-bounce shadow-sm shadow-cyan-300/50"></div>
          </div>
        </div>
      )}

      <p
        ref={ref}
        className={`split-parent ${className}`}
        style={{
          textAlign,
          overflow: "hidden",
          display: "inline-block",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default Preloader;
