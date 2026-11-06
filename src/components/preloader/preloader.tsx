"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

interface PreloaderProps {
  onComplete: () => void;
  foodCount?: number;
}

interface Point {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const CELL_SIZE = 20;
const SNAKE_SPEED = 100;
// Failsafe: never trap the visitor in the splash, even if the snake stalls.
const MAX_SPLASH_MS = 12_000;
// Food spawns at a middle distance from the head (Manhattan cells):
// close enough to reach in a short run, far enough to need steering.
const SPAWN_RADIUS = 20;
const SPAWN_MIN_DISTANCE = 8;
const EXIT_MS = 500; // exit faster than entrance (animate.md)
const INITIAL_SNAKE_LENGTH = 4;

const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  foodCount = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const snakeRef = useRef<Point[]>([]);
  const directionRef = useRef<Direction>("RIGHT");
  const foodRef = useRef<Point | null>(null);
  const collectedRef = useRef(0);
  const isManualRef = useRef(false);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrameRef = useRef<number>(0);
  const gridColsRef = useRef(0);
  const gridRowsRef = useRef(0);
  const completedRef = useRef(false);
  const [collected, setCollected] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failsafeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<Point | null>(null);

  const spawnFood = useCallback(() => {
    const cols = gridColsRef.current;
    const rows = gridRowsRef.current;
    if (cols === 0 || rows === 0) return;

    const head = snakeRef.current[0];
    // Spawn near the head so the next bite is always a short run,
    // not a cross-map trip. Radius scales down on small grids.
    const radius = Math.max(6, Math.min(SPAWN_RADIUS, cols, rows));
    const minDistance = Math.min(SPAWN_MIN_DISTANCE, Math.floor(radius / 2));
    const distance = (a: Point, b: Point) =>
      Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

    let best: Point | null = null;
    let bestDistance = Infinity;
    let attempts = 0;

    // Sample nearby cells; keep the closest valid one as fallback.
    while (attempts < 200) {
      const angle = Math.random() * Math.PI * 2;
      const dist =
        minDistance + Math.random() * Math.max(1, radius - minDistance);
      const pos: Point = {
        x: Math.round(head.x + Math.cos(angle) * dist),
        y: Math.round(head.y + Math.sin(angle) * dist),
      };
      attempts++;

      if (pos.x < 0 || pos.x >= cols || pos.y < 0 || pos.y >= rows) continue;
      if (snakeRef.current.some((s) => s.x === pos.x && s.y === pos.y)) continue;

      const d = distance(pos, head);
      if (d <= radius) {
        foodRef.current = pos;
        return;
      }
      if (d < bestDistance) {
        best = pos;
        bestDistance = d;
      }
    }

    if (best) foodRef.current = best;
  }, []);

  const getAutoPilotDirection = useCallback((): Direction => {
    const snake = snakeRef.current;
    const food = foodRef.current;
    const head = snake[0];
    const current = directionRef.current;

    if (!food) return current;

    const cols = gridColsRef.current;
    const rows = gridRowsRef.current;

    const opposite: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    const moves: { dir: Direction; dx: number; dy: number }[] = [
      { dir: "UP", dx: 0, dy: -1 },
      { dir: "DOWN", dx: 0, dy: 1 },
      { dir: "LEFT", dx: -1, dy: 0 },
      { dir: "RIGHT", dx: 1, dy: 0 },
    ];

    const isSafe = (x: number, y: number): boolean => {
      if (x < 0 || x >= cols || y < 0 || y >= rows) return false;
      return !snake.some((s) => s.x === x && s.y === y);
    };

    const distance = (a: Point, b: Point): number => {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    };

    const validMoves = moves.filter((m) => {
      if (m.dir === opposite[current]) return false;
      return isSafe(head.x + m.dx, head.y + m.dy);
    });

    if (validMoves.length === 0) return current;

    validMoves.sort((a, b) => {
      const posA = { x: head.x + a.dx, y: head.y + a.dy };
      const posB = { x: head.x + b.dx, y: head.y + b.dy };
      return distance(posA, food) - distance(posB, food);
    });

    return validMoves[0].dir;
  }, []);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(63, 63, 70, 0.3)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= w; x += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const food = foodRef.current;
    if (food) {
      const fx = food.x * CELL_SIZE + CELL_SIZE / 2;
      const fy = food.y * CELL_SIZE + CELL_SIZE / 2;

      const pulseTime = Date.now() / 400;
      const pulseScale = 1 + Math.sin(pulseTime) * 0.15;
      const pulseRadius = (CELL_SIZE / 2 - 2) * pulseScale;

      ctx.save();
      ctx.shadowColor = "#f43f5e";
      ctx.shadowBlur = 18;

      const outerGlow = ctx.createRadialGradient(fx, fy, 0, fx, fy, pulseRadius + 8);
      outerGlow.addColorStop(0, "rgba(244, 63, 94, 0.3)");
      outerGlow.addColorStop(1, "rgba(244, 63, 94, 0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(fx, fy, pulseRadius + 8, 0, Math.PI * 2);
      ctx.fill();

      const gradient = ctx.createRadialGradient(fx, fy, 0, fx, fy, pulseRadius);
      gradient.addColorStop(0, "#fda4af");
      gradient.addColorStop(0.5, "#f43f5e");
      gradient.addColorStop(1, "#be123c");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(fx, fy, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.beginPath();
      ctx.arc(fx - 2, fy - 2, pulseRadius * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const snake = snakeRef.current;
    snake.forEach((segment, i) => {
      const sx = segment.x * CELL_SIZE;
      const sy = segment.y * CELL_SIZE;
      const t = 1 - i / snake.length;

      ctx.save();

      if (i === 0) {
        ctx.shadowColor = "#3b82f6";
        ctx.shadowBlur = 16;
      } else {
        ctx.shadowColor = "#3b82f6";
        ctx.shadowBlur = 8 * t;
      }

      const segGrad = ctx.createLinearGradient(sx, sy, sx + CELL_SIZE, sy + CELL_SIZE);
      if (i === 0) {
        segGrad.addColorStop(0, "#60a5fa");
        segGrad.addColorStop(1, "#3b82f6");
      } else {
        const alpha = 0.4 + 0.6 * t;
        segGrad.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
        segGrad.addColorStop(1, `rgba(37, 99, 235, ${alpha})`);
      }

      ctx.fillStyle = segGrad;

      const pad = i === 0 ? 1 : 2;
      const radius = i === 0 ? 5 : 3;
      const size = CELL_SIZE - pad * 2;

      ctx.beginPath();
      ctx.roundRect(sx + pad, sy + pad, size, size, radius);
      ctx.fill();

      if (i === 0) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        const dir = directionRef.current;
        let ex1: Point, ex2: Point;
        const eyeSize = 2.5;
        const center = { x: sx + CELL_SIZE / 2, y: sy + CELL_SIZE / 2 };

        switch (dir) {
          case "RIGHT":
            ex1 = { x: center.x + 3, y: center.y - 3 };
            ex2 = { x: center.x + 3, y: center.y + 3 };
            break;
          case "LEFT":
            ex1 = { x: center.x - 3, y: center.y - 3 };
            ex2 = { x: center.x - 3, y: center.y + 3 };
            break;
          case "UP":
            ex1 = { x: center.x - 3, y: center.y - 3 };
            ex2 = { x: center.x + 3, y: center.y - 3 };
            break;
          case "DOWN":
            ex1 = { x: center.x - 3, y: center.y + 3 };
            ex2 = { x: center.x + 3, y: center.y + 3 };
            break;
        }
        ctx.beginPath();
        ctx.arc(ex1.x, ex1.y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ex2.x, ex2.y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    animFrameRef.current = requestAnimationFrame(drawGame);
  }, []);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setFadingOut(true);
    completeTimerRef.current = setTimeout(() => {
      onComplete();
    }, EXIT_MS);
  }, [onComplete]);

  const moveSnake = useCallback(() => {
    if (completedRef.current) return;

    const snake = snakeRef.current;
    const head = snake[0];
    const cols = gridColsRef.current;
    const rows = gridRowsRef.current;

    if (!isManualRef.current) {
      directionRef.current = getAutoPilotDirection();
    }

    const dir = directionRef.current;
    let newHead: Point;

    switch (dir) {
      case "UP":
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case "DOWN":
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case "LEFT":
        newHead = { x: head.x - 1, y: head.y };
        break;
      case "RIGHT":
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    if (newHead.x < 0) newHead.x = cols - 1;
    if (newHead.x >= cols) newHead.x = 0;
    if (newHead.y < 0) newHead.y = rows - 1;
    if (newHead.y >= rows) newHead.y = 0;

    const hitSelf = snake.some((s) => s.x === newHead.x && s.y === newHead.y);
    if (hitSelf) {
      snakeRef.current = [
        { x: Math.floor(cols / 2), y: Math.floor(rows / 2) },
      ];
      for (let i = 1; i < INITIAL_SNAKE_LENGTH; i++) {
        snakeRef.current.push({
          x: Math.floor(cols / 2) - i,
          y: Math.floor(rows / 2),
        });
      }
      directionRef.current = "RIGHT";
      isManualRef.current = false;
      return;
    }

    snake.unshift(newHead);

    const food = foodRef.current;
    if (food && newHead.x === food.x && newHead.y === food.y) {
      collectedRef.current += 1;
      setCollected(collectedRef.current);

      if (collectedRef.current >= foodCount) {
        complete();
        return;
      }
      spawnFood();
    } else {
      snake.pop();
    }
  }, [foodCount, complete, spawnFood, getAutoPilotDirection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = prefersReducedMotion();
    setReducedMotion(reduced);
    setCoarsePointer(
      typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches
    );

    // Failsafe: the splash never outlives MAX_SPLASH_MS.
    failsafeTimerRef.current = setTimeout(() => complete(), MAX_SPLASH_MS);

    // Reduced motion: no game, no spatial movement — progress fills and exits.
    if (reduced) {
      const step = Math.max(1, Math.floor(foodCount / 3));
      let n = 0;
      const tick = setInterval(() => {
        n += step;
        if (n >= foodCount) {
          clearInterval(tick);
          setCollected(foodCount);
          complete();
        } else {
          setCollected(n);
        }
      }, 150);
      return () => {
        clearInterval(tick);
        if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current);
        if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
      };
    }

    let paused = false;
    const startLoops = () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      gameLoopRef.current = setInterval(moveSnake, SNAKE_SPEED);
      animFrameRef.current = requestAnimationFrame(drawGame);
    };
    const stopLoops = () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
    const handleVisibility = () => {
      // Nonessential loop stops when hidden (animate.md).
      if (document.hidden && !paused) {
        paused = true;
        stopLoops();
      } else if (!document.hidden && paused) {
        paused = false;
        startLoops();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gridColsRef.current = Math.floor(w / CELL_SIZE);
      gridRowsRef.current = Math.floor(h / CELL_SIZE);
    };

    resize();
    window.addEventListener("resize", resize);

    const cols = gridColsRef.current;
    const rows = gridRowsRef.current;
    const startX = Math.floor(cols / 2);
    const startY = Math.floor(rows / 2);

    snakeRef.current = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      snakeRef.current.push({ x: startX - i, y: startY });
    }

    directionRef.current = "RIGHT";
    collectedRef.current = 0;
    completedRef.current = false;
    setCollected(0);
    spawnFood();

    startLoops();

    const handleKey = (e: KeyboardEvent) => {
      const current = directionRef.current;
      let next: Direction | null = null;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (current !== "DOWN") next = "UP";
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (current !== "UP") next = "DOWN";
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (current !== "RIGHT") next = "LEFT";
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (current !== "LEFT") next = "RIGHT";
          break;
      }

      if (next) {
        e.preventDefault();
        directionRef.current = next;
        isManualRef.current = true;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const minSwipe = 30;

      if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;

      const current = directionRef.current;
      let next: Direction | null = null;

      if (Math.abs(dx) > Math.abs(dy)) {
        next = dx > 0 ? (current !== "LEFT" ? "RIGHT" : null) : (current !== "RIGHT" ? "LEFT" : null);
      } else {
        next = dy > 0 ? (current !== "UP" ? "DOWN" : null) : (current !== "DOWN" ? "UP" : null);
      }

      if (next) {
        directionRef.current = next;
        isManualRef.current = true;
      }

      touchStartRef.current = null;
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [spawnFood, moveSnake, drawGame, complete]);

  const progress = Math.round((collected / foodCount) * 100);
  const done = collected >= foodCount;

  return (
    <div
      ref={containerRef}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
      className={`absolute inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fadingOut ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"
      }`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />

      {/* Skip — name the action, keep it reachable by keyboard. */}
      <button
        type="button"
        onClick={() => complete()}
        className="absolute top-6 right-6 z-20 min-h-11 px-4 py-2 rounded-full glass-container text-sm font-medium text-zinc-200 hover:text-white transition-colors duration-200 focus-visible:outline-none"
      >
        Skip intro
      </button>

      {/* HUD — progress is the state, not decoration. */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[min(20rem,80vw)] flex flex-col items-center gap-3 z-10">
        <div
          aria-hidden="true"
          className="flex w-full gap-1.5"
        >
          {Array.from({ length: foodCount }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < collected ? "bg-blue-500" : "bg-zinc-700/60"
              }`}
            />
          ))}
        </div>

        <div aria-live="polite" className="flex items-center gap-3">
          <span className="text-sm font-mono tabular-nums text-zinc-300">
            {progress}%
          </span>
          <span className="text-zinc-600">·</span>
          <p className="text-xs tracking-wider uppercase font-mono text-zinc-400">
            {done
              ? "Loading..."
              : reducedMotion
                ? "Loading portfolio"
                : coarsePointer
                  ? "Swipe to steer the snake"
                  : "Arrow keys or WASD to steer — or just watch"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
