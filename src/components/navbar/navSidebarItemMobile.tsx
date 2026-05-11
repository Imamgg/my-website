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
