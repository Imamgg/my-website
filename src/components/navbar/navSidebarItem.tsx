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
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 glass-tooltip border-r border-b border-brand/50 rotate-[-45deg]"></div>
      </div>

      <MagneticEffect>
        <button
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(
            "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group",
            isActive
              ? "bg-brand/30 text-brand dark:text-white shadow-lg shadow-brand/15 dark:shadow-brand/20 scale-105 border border-brand/50"
              : "bg-muted/40 text-muted-foreground hover:text-brand dark:hover:text-foreground hover:bg-brand/10 border border-transparent hover:border-brand/50 dark:hover:border-white/10"
          )}
          aria-label={item.label}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {item.icon}
          </span>

          {isActive && (
            <span className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-brand shadow-sm shadow-brand/50 animate-pulse"></span>
          )}
        </button>
      </MagneticEffect>
    </div>
  );
}
