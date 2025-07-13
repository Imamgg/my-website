import { BoxReveal } from "../ui/boxReveal";
import { HoverEffect } from "../ui/cardHover";
import { HyperText } from "../ui/hyperText";
import Separator from "../ui/separator";
import { SparklesText } from "../ui/sparklesText";
import { RetroGrid } from "../ui/background/retroGrid";
import Image from "next/image";

const Projects = () => {
  return (
    <section id="projects" className="relative w-full overflow-hidden py-20">
      <div className="absolute top-0 right-0 w-40 h-full opacity-45 pointer-events-none">
        <Image
          src="/right-pattern.svg"
          alt="Right Pattern"
          width={320}
          height={1080}
          className="object-cover"
        />
      </div>

      <div className="mx-auto relative container px-6">
        <BoxReveal>
          <div className="space-y-2">
            <SparklesText>
              <HyperText className="text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]">
                My Projects
              </HyperText>
            </SparklesText>
            <Separator />
            <p className="max-w-lg text-lg leading-relaxed">
              {`Some things I've built with love, expertise and a pinch of magical ingredients.`}
            </p>
          </div>
        </BoxReveal>
        <HoverEffect items={projectItems} />
      </div>
      <RetroGrid />
    </section>
  );
};

export default Projects;
const projectItems = [
  {
    title: "SIPEKA",
    description:
      "School Academic Management System is a web-based information system developed using Laravel, Tailwind CSS, MySQL. This system is designed to optimize and integrate all administrative processes and academic activities within a school environment.",
    image: "/assets/projects/project1.png",
    sourceCode: "https://github.com/Imamgg/sipeka",
    demo: "https://sipeka.engineer/",
  },
  {
    title: "Portfolio Website",
    description:
      "This personal portfolio, developed using Next.js, Tailwind CSS, GSAP, and Framer Motion, features a unique web interface that mimics a code editor with intuitive navigation, and includes interactive elements and games on the main page for a personalized and engaging experience.",
    image: "/assets/projects/project2.png",
    sourceCode: "https://github.com/Imamgg/next-porto",
    demo: "https://imamgg-dev.vercel.app/",
  },
  {
    title: "Dixbit",
    description:
      "Dixbit is a bootcamp and intensive course platform focused entirely on the world of Information Technology (IT). Designed to equip individuals with practical and relevant training, Dixbit offers in-depth learning programs across a wide range of IT fields.",
    image: "/assets/projects/project3.png",
    sourceCode: "",
    demo: "",
  },
  {
    title: "Hunger Apps",
    description:
      "Hunger Apps is a landing page website built with HTML, CSS, and JavaScript, supported by open source API integration. This website serves as a directory providing basic restaurant information, including restaurant name, location, and rating.",
    image: "/assets/projects/project4.png",
    sourceCode: "https://github.com/Imamgg/hunger-apps",
    demo: "https://imamgg.github.io/hunger-apps/",
  },
];
