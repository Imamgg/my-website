"use client";

import { cn } from "@/lib/utils";
import type { NavSidebarItemProps } from "./navSidebarItem";

export default function NavSidebarItemMobile({ item, isActive, onClick }: NavSidebarItemProps) {
  return (
    <div className="nav-sidebar-item-mobile relative flex items-center">
      <button
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group active:scale-95",
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
    </div>
  );
}
