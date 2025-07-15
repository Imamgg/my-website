"use client";

import { motion, Variants } from "framer-motion";
import { HyperText } from "../ui/hyperText";
import Separator from "../ui/separator";
import { SparklesText } from "../ui/sparklesText";
import { ArrowRight, Code } from "lucide-react";

const ProjectHeader = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { opacity: 0, rotate: -180, scale: 0 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-8 "
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 mb-6"
      >
        <motion.div variants={iconVariants}>
          <Code className="w-8 h-8 text-primary" />
        </motion.div>
        <motion.span
          variants={itemVariants}
          className="text-sm text-muted-foreground font-mono"
        >
          ~/projects
        </motion.span>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SparklesText>
          <HyperText className="text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]">
            My Projects
          </HyperText>
          <Separator />
        </SparklesText>
      </motion.div>

      <div className="flex justify-between items-center">
        <motion.p
          variants={itemVariants}
          className="max-w-lg text-lg leading-relaxed text-muted-foreground"
        >
          {`Some things I've built with love, expertise and a pinch of magical ingredients.`}
        </motion.p>

        <motion.button
          onClick={handleViewAll}
          variants={containerVariants}
          className="hidden md:flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-zinc-500 hover:from-blue-600 hover:to-zinc-600 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span>View More</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectHeader;
