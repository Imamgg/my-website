import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView, Variants } from "motion/react";
import Image from "next/image";
import { useState, useRef } from "react";
import { ShineBorder } from "./shineBorder";
import { Github, Eye } from "lucide-react";
import { InteractiveHoverButton } from "./Buttons/hoverButton";
import Link from "next/link";

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
    amount: 0.2,
    once: false, // Changed to false to allow repeated animations
    margin: "0px 0px -50px 0px",
  });

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: idx * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group block p-2 h-full w-full"
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
      variants={cardVariants}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
    >
      <AnimatePresence mode="wait">
        {hoveredIndex === idx && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-blue-200 dark:bg-zinc-500/10 block rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeInOut",
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
  const containerRef = useRef(null);

  const isContainerInView = useInView(containerRef, {
    amount: 0.1,
    once: false, // Allow repeated animations
    margin: "0px 0px -100px 0px",
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08, // Smooth stagger for re-entry
      },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isContainerInView ? "visible" : "hidden"}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4",
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
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        <Link
          href={sourceCode}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <InteractiveHoverButton>
            <Github size={16} />
          </InteractiveHoverButton>
        </Link>
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
