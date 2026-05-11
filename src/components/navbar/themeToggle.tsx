"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import MagneticEffect from "../providers/MagneticEffect";

export default function ThemeToggle() {
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
