"use client";

import { useState } from "react";
import MagneticEffect from "../providers/magneticEffect";
import { cn } from "@/lib/utils";

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  scrollTarget: string;
}

export interface NavSidebarItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

export default function NavSidebarItem({ item, isActive, onClick }: NavSidebarItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="nav-sidebar-item relative flex items-center">
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
