"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MagneticEffect from "../providers/magneticEffect";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const next = isDark ? "light" : "dark";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function";

    if (!supportsViewTransitions || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-cx", `${cx}px`);
    root.style.setProperty("--theme-cy", `${cy}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset.themeAnim = "1";

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    transition.finished.finally(() => {
      delete root.dataset.themeAnim;
    });
  };

  return (
    <MagneticEffect>
      <button
        aria-label="Toggle Theme"
        type="button"
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-full glass-container text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 shadow-lg shadow-black/10 dark:shadow-black/20 group"
      >
        <span className="transition-transform duration-500 group-hover:rotate-180">
          {mounted ? (
            isDark ? <Sun size={16} /> : <Moon size={16} />
          ) : (
            <Moon size={16} />
          )}
        </span>
      </button>
    </MagneticEffect>
  );
}
