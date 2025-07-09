"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useRef } from "react";
import MagneticEffect from "../providers/MagneticEffect";
import { useIsomorphicLayoutEffect } from "motion/react";

interface NavMenuBtnProps {
  active: boolean;
  toggleHamburger: (status: boolean) => void;
}

export default function NavMenuBtn({
  active,
  toggleHamburger,
}: NavMenuBtnProps) {
  const el = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!el.current) return console.log("el.current is null");
    const context = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(el.current, { x: 0, duration: 2, ease: "power4.inOut" }, 0);
    }, el);

    return () => context.kill();
  }, []);

  return (
    <div
      ref={el}
      className="pointer-events-auto fixed right-6 top-6 z-[51] translate-x-[calc(5rem+2.5vw)]"
    >
      <MagneticEffect>
        <button tabIndex={0} onClick={() => toggleHamburger(!active)}>
          <div
            className={cn(
              "relative flex h-[50px] w-[50px] transform items-center justify-center rounded-full bg-zinc-200 backdrop-blur-md border border-blue-200/60 shadow-xl ring-0 ring-blue-400/30 transition-all duration-300 hover:ring-4 hover:shadow-blue-400/30 hover:border-blue-400/60 hover:bg-blue-50/95 hover:scale-105",
              {
                "ring-4 rounded-full transition-all duration-200 ring-blue-400/60 border-blue-400/80 bg-blue-50/95 scale-105":
                  active,
              }
            )}
          >
            <div
              className={cn(
                "flex h-[24px] w-[24px] origin-center transform flex-col justify-between transition-all duration-300",
                { "-rotate-[45deg]": active }
              )}
            >
              <div
                className={cn(
                  "h-[3px] w-1/2 origin-right transform rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all delay-75 duration-300 shadow-sm",
                  {
                    "h-[2px] -translate-y-[1px] -rotate-90 from-blue-400 to-blue-500":
                      active,
                  }
                )}
              ></div>
              <div className="h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"></div>
              <div
                className={cn(
                  "h-[3px] w-1/2 origin-left transform self-end rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all delay-75 duration-300 shadow-sm",
                  {
                    "h-[2px] translate-y-[1px] -rotate-90 from-blue-400 to-blue-500":
                      active,
                  }
                )}
              ></div>
            </div>
          </div>
        </button>
      </MagneticEffect>
    </div>
  );
}
