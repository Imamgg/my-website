"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactHeader from "./contactHeader";
import ContactForm from "./contactForm";
import { toast } from "sonner";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Copy,
  Check,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { socials, contactEmail, Social } from "@/data/socials";
import { BorderBeam } from "../ui/borderBeam";
import { prefersReducedMotion } from "@/lib/reducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const socialIconMap: Record<Social["iconName"], React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  instagram: <Instagram size={18} />,
  twitter: <Twitter size={18} />,
};

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

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
      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 max-w-5xl"
      >
        <ContactHeader />

        {/* Connect cards — email + socials in one grid */}
        <div className="contact-animate mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Email card — spans 2 cols on mobile, 1 on desktop */}
            <button
              onClick={handleCopyEmail}
              className="group col-span-2 md:col-span-1 relative overflow-hidden rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-muted-foreground/40"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hue-cycle-text bg-muted group-hover:scale-110 transition-transform duration-300">
                  <Mail size={18} />
                </div>
                {copied ? (
                  <Check
                    size={14}
                    className="ml-auto text-green-500"
                  />
                ) : (
                  <Copy
                    size={14}
                    className="ml-auto text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-300"
                  />
                )}
              </div>
              <p className="text-sm font-semibold text-foreground mb-0.5">
                Email
              </p>
              <p className="text-xs text-muted-foreground font-mono truncate">
                {contactEmail}
              </p>
            </button>

            {/* Social cards */}
            {socials.map((social, i) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-muted-foreground/40"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hue-cycle-text bg-muted group-hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: `${(i + 1) * 1.2}s` }}
                  >
                    {socialIconMap[social.iconName]}
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="ml-auto text-muted-foreground/50 group-hover:text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  {social.name}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {social.handle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="contact-animate">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 lg:p-10">
            <BorderBeam duration={16} borderWidth={1} className="opacity-30" />

            {/* Form label */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full hue-cycle-bg" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Send a message
              </span>
            </div>

            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
