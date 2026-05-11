"use client";

import gsap from "gsap";
import { Home, User, FolderOpen, Mail, Award, ChevronDown } from "lucide-react";
import { useIsomorphicLayoutEffect } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NavSidebarItem from "./navSidebarItem";
import NavSidebarItemMobile from "./navSidebarItemMobile";
import ThemeToggle from "./themeToggle";
import type { NavItem } from "./navSidebarItem";

export default function NavSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = [
    {
      icon: <Home size={18} />,
      label: "Home",
      scrollTarget: "#hero",
    },
    {
      icon: <User size={18} />,
      label: "About",
      scrollTarget: "#about",
    },
    {
      icon: <FolderOpen size={18} />,
      label: "Projects",
      scrollTarget: "#projects",
    },
    {
      icon: <Mail size={18} />,
      label: "Contact",
      scrollTarget: "#contact",
    },
    {
      icon: <Award size={18} />,
      label: "Certificates",
      scrollTarget: "/certificates",
    },
  ];

  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
      const locomotivescroll = new locomotiveModule.default();
      setScroll(locomotivescroll);
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!sidebarRef.current) return;

    const ctx = gsap.context(() => {
      const items = sidebarRef.current?.querySelectorAll(".nav-sidebar-item");
      const themeBtn =
        sidebarRef.current?.querySelector(".nav-sidebar-theme");
      const chevronBtn =
        sidebarRef.current?.querySelector(".nav-sidebar-chevron");

      gsap.set([...(items || []), themeBtn], {
        x: 80,
        opacity: 0,
      });

      if (chevronBtn) {
        gsap.set(chevronBtn, { x: 80, opacity: 0 });
      }

      const tl = gsap.timeline({ delay: 1 });

      if (chevronBtn) {
        tl.to(
          chevronBtn,
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      if (items) {
        items.forEach((item, i) => {
          tl.to(
            item,
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            i * 0.08
          );
        });
      }

      if (themeBtn) {
        tl.to(
          themeBtn,
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          (items?.length || 0) * 0.08
        );
      }
    }, sidebarRef);

    return () => ctx.kill();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!navItemsRef.current) return;

    const ctx = gsap.context(() => {
      const items = navItemsRef.current?.querySelectorAll(
        ".nav-sidebar-item-mobile"
      );

      if (isExpanded) {
        gsap.to(navItemsRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        });

        if (items) {
          items.forEach((item, i) => {
            gsap.fromTo(
              item,
              { x: 30, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.35,
                delay: i * 0.06,
                ease: "back.out(1.5)",
              }
            );
          });
        }
      } else {
        if (items) {
          items.forEach((item) => {
            gsap.to(item, {
              x: 20,
              opacity: 0,
              duration: 0.2,
              ease: "power2.in",
            });
          });
        }
        gsap.to(navItemsRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power3.in",
        });
      }
    }, navItemsRef);

    return () => ctx.kill();
  }, [isExpanded]);

  const handleNav = (target: string) => {
    if (target.startsWith("/")) {
      router.push(target);
    } else {
      if (pathname !== "/") {
        sessionStorage.setItem("scrollTarget", target);
        router.push("/");
      } else if (scroll) {
        scroll.scrollTo(target, { duration: 2 });
      }
      setActiveSection(target);
    }
    setIsExpanded(false);
  };

  return (
    <div
      ref={sidebarRef}
      className="pointer-events-auto fixed right-4 md:right-5 top-1/2 -translate-y-1/2 z-[999] flex flex-col items-center gap-2"
    >
      <div className="hidden md:flex flex-col items-center gap-1.5 rounded-full glass-container p-2 shadow-2xl shadow-black/30">
        {navItems.map((item, index) => (
          <NavSidebarItem
            key={index}
            item={item}
            isActive={activeSection === item.scrollTarget}
            onClick={() => handleNav(item.scrollTarget)}
          />
        ))}
      </div>

      <div className="flex md:hidden flex-col items-center gap-1.5">
        <button
          className="nav-sidebar-chevron flex items-center justify-center w-10 h-10 rounded-full glass-container transition-all duration-300 hover:scale-110 group"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
        >
          <span
            className={cn(
              "text-zinc-600 dark:text-zinc-300 transition-transform duration-500",
              isExpanded ? "rotate-180" : "rotate-0"
            )}
          >
            <ChevronDown size={18} />
          </span>
        </button>

        <div
          ref={navItemsRef}
          className="flex flex-col items-center gap-1.5 rounded-full glass-container p-2 overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          {navItems.map((item, index) => (
            <NavSidebarItemMobile
              key={index}
              item={item}
              isActive={activeSection === item.scrollTarget}
              onClick={() => handleNav(item.scrollTarget)}
            />
          ))}
        </div>
      </div>

      <div className="nav-sidebar-theme mt-1">
        <ThemeToggle />
      </div>
    </div>
  );
}
