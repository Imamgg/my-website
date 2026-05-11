"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactHeader from "./contactHeader";
import ContactForm from "./contactForm";
import { toast } from "sonner";
import { Github, Linkedin, Instagram, Twitter, Copy, Check } from "lucide-react";
import Link from "next/link";
import { socials, contactEmail, Social } from "@/data/socials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const socialIconMap: Record<Social["iconName"], React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  instagram: <Instagram size={20} />,
  twitter: <Twitter size={20} />,
};

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const els = containerRef.current?.querySelectorAll(".contact-animate");

      els?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (data: FormData) => {
    toast.success("Message sent!", {
      description: `Thanks ${data.name}, I'll get back to you soon.`,
      duration: 4000,
    });
  };

  return (
    <section id="contact" className="relative w-full py-20">
      <div ref={containerRef} className="container mx-auto px-4 md:px-6 max-w-5xl">
        <ContactHeader />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left column — Form (takes 3/5) */}
          <div className="lg:col-span-3 contact-animate">
            <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm">
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </div>

          {/* Right column — Socials + CTA (takes 2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Copy email card */}
            <div className="contact-animate">
              <button
                onClick={handleCopyEmail}
                className="w-full group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-blue-400/50 dark:hover:border-blue-600/40 transition-all duration-300 text-left"
              >
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                  Email
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {contactEmail}
                  </span>
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-zinc-400 group-hover:text-blue-500 transition-colors duration-300"
                    />
                  )}
                </div>
              </button>
            </div>

            {/* Social links */}
            <div className="contact-animate">
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
                  Socials
                </p>
                <div className="flex flex-col gap-1">
                  {socials.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
                    >
                      <span className="text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {socialIconMap[social.iconName]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {social.name}
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                          {social.handle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="contact-animate">
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      Available for work
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      Open to freelance & collaboration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
