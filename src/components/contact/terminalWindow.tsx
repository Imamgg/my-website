"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface TerminalWindowProps {
  terminalHistory: string[];
}

const TerminalWindow = ({ terminalHistory }: TerminalWindowProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (terminalRef.current) {
      const terminalElement = terminalRef.current.querySelector("pre");
      if (terminalElement) {
        setTimeout(() => {
          terminalElement.scrollTop = terminalElement.scrollHeight;
        }, 200);
      }
    }
  }, [terminalHistory]);

  return (
    <motion.div
      ref={terminalRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="w-full"
    >
      <Terminal className="w-full max-w-none">
        <TypingAnimation delay={500} className="text-blue-400">
          $ npm run contact-form
        </TypingAnimation>

        <AnimatedSpan delay={1500} className="text-green-400">
          <span>✔ Starting contact interface...</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2000} className="text-green-400">
          <span>✔ Initializing Mail Service...</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2500} className="text-green-400">
          <span>✔ Ready to receive your message!</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3000} className="text-blue-400">
          <span>$ Waiting for user input...</span>
        </AnimatedSpan>

        {terminalHistory.slice(4).map((line, index) => (
          <AnimatedSpan
            key={`history-${index}-${terminalHistory.length}-${line.slice(
              0,
              10
            )}`}
            delay={3500 + index * 200}
            className={
              line.startsWith("$")
                ? "text-blue-400"
                : line.startsWith("✓")
                ? "text-green-400"
                : line.startsWith("✗")
                ? "text-red-400"
                : line.startsWith(">")
                ? "text-yellow-400"
                : "text-gray-400"
            }
          >
            <span>{line}</span>
          </AnimatedSpan>
        ))}

        {/* Cursor prompt */}
        <div className="flex items-center mt-2">
          <span className="text-blue-400 mr-2">imamgg@webdev:~/contact$</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="bg-blue-400 text-black w-2 h-4 inline-block"
          />
        </div>
      </Terminal>
    </motion.div>
  );
};

export default TerminalWindow;
