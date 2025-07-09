"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Github, Instagram, X } from "lucide-react";
import { useIsomorphicLayoutEffect } from "motion/react";
import NavMenuLink from "./navMenuLink";
import Dock from "../ui/dock";
import NavMenuBtn from "./navMenuBtn";

export default function NavMenu() {
  const [active, setActive] = useState<boolean>(false);
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuBgRef = useRef<HTMLDivElement | null>(null);

  const toggleHamburger = (status: boolean) => {
    setActive(status);
  };

  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
      const locomotivescroll = new locomotiveModule.default();
      setScroll(locomotivescroll);
    });

    // Add keyboard event listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      if (active) {
        gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: "power3.inOut" });
        gsap.to(menuBgRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(menuRef.current, {
          x: "100%",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(menuBgRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        });
      }
    }, menuRef);
  }, [active]);

  const handleScroll = (id: string) => {
    if (scroll) {
      scroll.scrollTo(id, { duration: 2 });
    }
    setActive(false);
  };

  const items = [
    {
      icon: <Github size={18} className="text-blue-600 hover:text-blue-700" />,
      label: "GitHub",
      href: "https://github.com/Imamgg",
    },
    {
      icon: (
        <Instagram size={18} className="text-blue-600 hover:text-blue-700" />
      ),
      label: "Instagram",
      href: "https://instagram.com",
    },
    {
      icon: <X size={18} className="text-blue-600 hover:text-blue-700" />,
      label: "Twitter",
      href: "https://twitter.com",
    },
  ];
  return (
    <>
      <div
        ref={menuBgRef}
        className={cn(
          "fixed inset-0 bg-gradient-to-r from-black/20 via-blue-900/30 to-black/40 opacity-0 backdrop-blur-md",
          active ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={() => setActive(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setActive(false);
          }
        }}
      ></div>
      <div
        ref={menuRef}
        className={cn(
          "nav-menu pointer-events-auto fixed top-0 right-0 h-full flex translate-x-[100%] will-change-transform"
        )}
      >
        <div className="w-[400px] md:w-[500px] bg-zinc-200 backdrop-blur-xl border-l border-blue-200/50 shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-blue-300/15 to-transparent rounded-tl-full"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="px-8 pt-20 pb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                Navigation
              </h2>
            </div>

            {/* Navigation Cards */}
            <div className="flex-1 px-8 space-y-4">
              <NavMenuLink
                title={"Home"}
                active={active}
                duration={1}
                handleScroll={() => handleScroll("#hero")}
              />
              <NavMenuLink
                title={"About"}
                active={active}
                duration={1.1}
                handleScroll={() => handleScroll("#about")}
              />
              <NavMenuLink
                title={"Projects"}
                active={active}
                duration={1.2}
                handleScroll={() => handleScroll("#projects")}
              />
              <NavMenuLink
                title={"Contact"}
                active={active}
                duration={1.3}
                handleScroll={() => handleScroll("#contact")}
              />
            </div>

            {/* Social Links Section */}
            <div className="px-8 pb-8">
              <h3 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">
                Connect
              </h3>
              <div className="border-t border-blue-200/50 pt-6">
                <div className="flex justify-center">
                  <Dock
                    items={items}
                    baseItemSize={36}
                    magnification={48}
                    distance={100}
                    spring={{ mass: 0.2, stiffness: 200, damping: 15 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavMenuBtn active={active} toggleHamburger={toggleHamburger} />
    </>
  );
}
