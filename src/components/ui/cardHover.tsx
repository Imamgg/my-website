import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useState, useRef } from "react";
import { ShineBorder } from "./shineBorder";
import { Github, Eye, ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "./Buttons/hoverButton";
import Link from "next/link";

// Individual Card Component with its own viewport detection
const AnimatedCard = ({
  item,
  idx,
  hoveredIndex,
  setHoveredIndex,
}: {
  item: {
    title: string;
    description: string;
    image: string;
    sourceCode?: string;
    demo?: string;
  };
  idx: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    amount: 0.3,
    once: false,
    margin: "0px 0px -100px 0px", // Trigger earlier
  });

  return (
    <motion.div
      ref={cardRef}
      className="relative group block p-2 h-full w-full"
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isCardInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.5,
                delay: 0.1, // Small consistent delay for each card
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : {
              opacity: 0,
              y: 50,
              scale: 0.9,
              transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
      }
    >
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-blue-200 dark:bg-slate-800/[0.8] block rounded-3xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.2,
                ease: [0.4, 0.0, 0.2, 1],
              },
            }}
          />
        )}
      </AnimatePresence>
      <Card>
        <ProjectImage src={item.image} alt={item.title} />
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <ProjectLinks sourceCode={item.sourceCode} demo={item.demo} />
      </Card>
    </motion.div>
  );
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    image: string;
    sourceCode?: string;
    demo?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const buttonRef = useRef(null);
  const isButtonInView = useInView(buttonRef, { amount: 0.3, once: false });

  const handleViewAll = () => {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className =
      "fixed top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-2";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease-out";
    toast.innerHTML = `
      <span class="font-semibold">Soon! 🤣🤣</span>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 10);

    // Animate out after 3 seconds
    setTimeout(() => {
      toast.style.transform = "translateX(100%)";
      toast.style.opacity = "0";
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
          className
        )}
      >
        {items.map((item, idx) => (
          <AnimatedCard
            key={item.title}
            item={item}
            idx={idx}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
      {/* View All Button */}
      <motion.div
        ref={buttonRef}
        className="flex justify-end mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={
          isButtonInView
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }
            : {
                opacity: 0,
                y: 30,
                transition: {
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }
        }
      >
        <button
          onClick={handleViewAll}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-zinc-500 hover:from-blue-600 hover:to-zinc-600 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <span>Lihat Semua</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </motion.div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden relative z-20 p-3",
        className
      )}
    >
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <div className="relative z-50">{children}</div>
    </div>
  );
};

export const ProjectImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-48 overflow-hidden rounded-t-2xl",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-fill transition-all duration-500 ease-out group-hover:scale-110"
      />
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("font-bold tracking-wide text-xl px-4 pt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 tracking-wide leading-relaxed text-sm px-4",
        className
      )}
    >
      {children}
    </p>
  );
};

export const ProjectLinks = ({
  sourceCode,
  demo,
  className,
}: {
  sourceCode?: string;
  demo?: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex gap-3 mt-4 p-4", className)}>
      {sourceCode && (
        <InteractiveHoverButton>
          <Link
            href={sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center"
          >
            <Github size={16} />
          </Link>
        </InteractiveHoverButton>
      )}
      {demo && (
        <a
          href={demo}
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-blue-500 to-zinc-500 hover:from-blue-600 hover:to-zinc-600 transition-all duration-300 ease-out transform hover:scale-105"
        >
          <Eye size={16} />
          <span className="font-semibold">Demo</span>
        </a>
      )}
    </div>
  );
};
