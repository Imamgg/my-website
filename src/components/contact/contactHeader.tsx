"use client";

import { motion, Variants, useInView } from "framer-motion";
import { Terminal } from "lucide-react";
import { HyperText } from "../ui/hyperText";
import { useRef } from "react";

const ContactHeader = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
    amount: 0.3,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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

  const terminalVariants: Variants = {
    hidden: { opacity: 0, x: -20, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="text-center mb-16 relative"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-center gap-2 mb-4 relative z-10"
      >
        <motion.div variants={terminalVariants}>
          <Terminal className="w-6 h-6 text-primary" />
        </motion.div>
        <motion.span
          variants={itemVariants}
          className="text-sm text-muted-foreground font-mono"
        >
          ~/contact
        </motion.span>
      </motion.div>

      <motion.div variants={itemVariants} className="relative z-10">
        <HyperText className="text-4xl md:text-6xl font-bold">{`Let's Connect`}</HyperText>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-lg text-muted-foreground max-w-2xl mx-auto relative z-10"
      >
        Feel free to contact me or just want to say hi!
      </motion.p>
    </motion.div>
  );
};

export default ContactHeader;
