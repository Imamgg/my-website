"use client";

import gsap from "gsap";
import {
  Home,
  User,
  FolderOpen,
  Mail,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
} from "lucide-react";
import { useIsomorphicLayoutEffect } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import MagneticEffect from "../providers/MagneticEffect";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  scrollTarget: string;
}

export default function NavSidebar() {
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
  ];

  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
      const locomotivescroll = new locomotiveModule.default();
      setScroll(locomotivescroll);
    });
  }, []);

  // Entrance animation
  useIsomorphicLayoutEffect(() => {
    if (!sidebarRef.current) return;

    const ctx = gsap.context(() => {
      const items = sidebarRef.current?.querySelectorAll(".nav-sidebar-item");
      const themeBtn =
        sidebarRef.current?.querySelector(".nav-sidebar-theme");
      const chevronBtn =
        sidebarRef.current?.querySelector(".nav-sidebar-chevron");

      // Desktop: animate nav items in
      gsap.set([...(items || []), themeBtn], {
        x: 80,
        opacity: 0,
      });

      if (chevronBtn) {
        gsap.set(chevronBtn, { x: 80, opacity: 0 });
      }

      const tl = gsap.timeline({ delay: 1 });

      // Always animate chevron first on mobile
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

      // Desktop items
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

  // Mobile expand/collapse animation
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

  const handleScroll = (id: string) => {
    if (scroll) {
      scroll.scrollTo(id, { duration: 2 });
    }
    setActiveSection(id);
    setIsExpanded(false);
  };

  return (
    <div
      ref={sidebarRef}
      className="pointer-events-auto fixed right-4 md:right-5 top-1/2 -translate-y-1/2 z-[999] flex flex-col items-center gap-2"
    >
      {/* ===== DESKTOP NAVBAR ===== */}
      <div className="hidden md:flex flex-col items-center gap-1.5 rounded-full glass-container p-2 shadow-2xl shadow-black/30">
        {navItems.map((item, index) => (
          <NavSidebarItem
            key={index}
            item={item}
            isActive={activeSection === item.scrollTarget}
            onClick={() => handleScroll(item.scrollTarget)}
          />
        ))}
      </div>

      {/* ===== MOBILE NAVBAR ===== */}
      <div className="flex md:hidden flex-col items-center gap-1.5">
        {/* Chevron Toggle Button */}
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

        {/* Expandable Nav Items */}
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
              onClick={() => handleScroll(item.scrollTarget)}
            />
          ))}
        </div>
      </div>

      {/* Theme Toggle (both desktop & mobile) */}
      <div className="nav-sidebar-theme mt-1">
        <ThemeToggle />
      </div>
    </div>
  );
}

/* ======================== */
/* Desktop Nav Item          */
/* ======================== */

interface NavSidebarItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

function NavSidebarItem({ item, isActive, onClick }: NavSidebarItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="nav-sidebar-item relative flex items-center">
      {/* Tooltip Label */}
      <div
        className={cn(
          "absolute right-full mr-3 px-3 py-1.5 rounded-lg glass-tooltip text-xs font-medium whitespace-nowrap transition-all duration-300 shadow-lg",
          hovered
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-2 pointer-events-none"
        )}
      >
        {item.label}
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 glass-tooltip border-r border-b border-blue-200/50 dark:border-blue-900/30 rotate-[-45deg]"></div>
      </div>

      {/* Icon Button */}
      <MagneticEffect>
        <button
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(
            "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group",
            isActive
              ? "bg-blue-500/30 dark:bg-blue-500/40 text-blue-700 dark:text-white shadow-lg shadow-blue-500/15 dark:shadow-blue-500/20 scale-105 border border-blue-400/50 dark:border-blue-400/40"
              : "bg-zinc-300/40 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-100/50 dark:hover:bg-white/15 border border-transparent hover:border-blue-200/50 dark:hover:border-white/10"
          )}
          aria-label={item.label}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {item.icon}
          </span>

          {isActive && (
            <span className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-sm shadow-blue-500/50 dark:shadow-blue-400/50 animate-pulse"></span>
          )}
        </button>
      </MagneticEffect>
    </div>
  );
}

/* ======================== */
/* Mobile Nav Item           */
/* ======================== */

function NavSidebarItemMobile({ item, isActive, onClick }: NavSidebarItemProps) {
  return (
    <div className="nav-sidebar-item-mobile relative flex items-center">
      <button
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group active:scale-95",
          isActive
            ? "bg-blue-500/30 dark:bg-blue-500/40 text-blue-700 dark:text-white shadow-lg shadow-blue-500/15 dark:shadow-blue-500/20 scale-105 border border-blue-400/50 dark:border-blue-400/40"
            : "bg-zinc-300/40 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-100/50 dark:hover:bg-white/15 border border-transparent hover:border-blue-200/50 dark:hover:border-white/10"
        )}
        aria-label={item.label}
      >
        <span className="transition-transform duration-300 group-hover:scale-110">
          {item.icon}
        </span>

        {isActive && (
          <span className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-sm shadow-blue-500/50 dark:shadow-blue-400/50 animate-pulse"></span>
        )}
      </button>
    </div>
  );
}

/* ======================== */
/* Theme Toggle              */
/* ======================== */

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <MagneticEffect>
      <button
        aria-label="Toggle Theme"
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="flex items-center justify-center w-10 h-10 rounded-full glass-container text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 shadow-lg shadow-black/10 dark:shadow-black/20 group"
      >
        <span className="transition-transform duration-500 group-hover:rotate-180">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </span>
      </button>
    </MagneticEffect>
  );
}
