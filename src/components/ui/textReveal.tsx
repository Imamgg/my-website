"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
  inline?: boolean;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  inline = false,
  ...props
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(targetRef, { once: false, margin: "0px" });
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  if (inline) {
    return (
      <div ref={targetRef} className={cn("relative", className)} {...props}>
        <span className="flex flex-wrap text-inherit">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <InlineWord
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                isInView={isInView}
              >
                {word}
              </InlineWord>
            );
          })}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[200vh]", className)}
      {...props}
    >
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
      >
        <span
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-slate-200/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  inline?: boolean;
}

const Word: FC<WordProps> = ({ children, progress, range, inline = false }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  if (inline) {
    return (
      <span className="relative mx-1">
        <span className="absolute opacity-30 text-inherit">{children}</span>
        <motion.span style={{ opacity: opacity }} className="text-inherit">
          {children}
        </motion.span>
      </span>
    );
  }

  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-slate-200"}
      >
        {children}
      </motion.span>
    </span>
  );
};

interface InlineWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isInView: boolean;
}

const InlineWord: FC<InlineWordProps> = ({
  children,
  progress,
  range,
  isInView,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1">
      <span className="absolute opacity-30 text-inherit">{children}</span>
      <motion.span
        style={{ opacity: isInView ? opacity : 0 }}
        className="text-inherit"
      >
        {children}
      </motion.span>
    </span>
  );
};
