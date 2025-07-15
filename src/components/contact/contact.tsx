"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactHeader from "./contactHeader";
import TerminalWindow from "./terminalWindow";
import ContactForm from "./contactForm";
import { toast } from "sonner";
import { AnimatedGridPattern } from "../ui/background/animatedGridPattern";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "$ npm run contact-form",
    "$ Starting contact interface...",
    "$ Ready to receive your message!",
    "$ Waiting for user input...",
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main container animation with improved easing and toggle actions
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
            onEnter: () => {
              gsap.to(containerRef.current, {
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
                duration: 0.6,
                ease: "power2.out",
              });
            },
            onLeave: () => {
              gsap.to(containerRef.current, {
                boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
                duration: 0.3,
                ease: "power2.out",
              });
            },
            onEnterBack: () => {
              gsap.to(containerRef.current, {
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
                duration: 0.6,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(containerRef.current, {
                boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
                duration: 0.3,
                ease: "power2.out",
              });
            },
          },
        }
      );

      // Enhanced terminal and form animations with stagger effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Terminal animation with enhanced effects
      tl.fromTo(
        editorRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotateY: -25,
          x: -60,
          filter: "blur(8px)",
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "back.out(1.4)",
        }
      )
        // Contact form animation with enhanced effects
        .fromTo(
          terminalRef.current,
          {
            scale: 0.8,
            opacity: 0,
            rotateY: 25,
            x: 60,
            filter: "blur(8px)",
          },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "back.out(1.4)",
          },
          "-=0.6"
        );

      // Add floating animation for continuous engagement
      gsap.to([editorRef.current, terminalRef.current], {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
        stagger: {
          amount: 0.5,
          from: "start",
        },
      });

      // Add subtle rotation on hover for interactive feel
      const handleMouseEnter = (element: HTMLElement) => {
        gsap.to(element, {
          scale: 1.02,
          rotateY: 2,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = (element: HTMLElement) => {
        gsap.to(element, {
          scale: 1,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      // Add mouse interaction listeners
      if (editorRef.current) {
        editorRef.current.addEventListener("mouseenter", () =>
          handleMouseEnter(editorRef.current!)
        );
        editorRef.current.addEventListener("mouseleave", () =>
          handleMouseLeave(editorRef.current!)
        );
      }

      if (terminalRef.current) {
        terminalRef.current.addEventListener("mouseenter", () =>
          handleMouseEnter(terminalRef.current!)
        );
        terminalRef.current.addEventListener("mouseleave", () =>
          handleMouseLeave(terminalRef.current!)
        );
      }

      // Cleanup function for event listeners
      return () => {
        if (editorRef.current) {
          editorRef.current.removeEventListener("mouseenter", () =>
            handleMouseEnter(editorRef.current!)
          );
          editorRef.current.removeEventListener("mouseleave", () =>
            handleMouseLeave(editorRef.current!)
          );
        }
        if (terminalRef.current) {
          terminalRef.current.removeEventListener("mouseenter", () =>
            handleMouseEnter(terminalRef.current!)
          );
          terminalRef.current.removeEventListener("mouseleave", () =>
            handleMouseLeave(terminalRef.current!)
          );
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (data: FormData) => {
    const timestamp = new Date().toLocaleTimeString();

    // Add visual feedback animation when form is submitted
    gsap.to(terminalRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    // Add glow effect to terminal
    gsap.to(editorRef.current, {
      boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
      duration: 0.5,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    // Show terminal activity toast
    toast.info("Terminal activity", {
      description: `Message processing started for ${data.name}`,
      duration: 3000,
    });

    // Update terminal history with new messages
    const newMessages = [
      `$ send-message --to="404imamgg@gmail.com"`,
      `> Processing message from ${data.name}...`,
      `> Message length: ${data.message.length} characters`,
      `> Timestamp: ${timestamp}`,
      `> Sending message...`,
      `✓ Email sent successfully!`,
      `✓ Thank you ${data.name}, for your message!`,
      `$ Ready for next message...`,
    ];

    setTerminalHistory((prev) => [...prev, ...newMessages]);
  };

  return (
    <section id="contact" className="relative w-full py-20 overflow-hidden">
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.05}
        duration={3}
        width={60}
        height={60}
        repeatDelay={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <ContactHeader />
        <div className="grid lg:grid-cols-2 gap-8 mx-auto">
          <div ref={editorRef} className="space-y-6">
            <TerminalWindow terminalHistory={terminalHistory} />
          </div>

          <div ref={terminalRef} className="space-y-6">
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
