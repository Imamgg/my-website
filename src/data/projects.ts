export interface Project {
  title: string;
  description: string;
  image: string;
  sourceCode: string;
  demo: string;
  tags: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Discord Auto Chat",
    description:
      "Node.js-based script to automate sending messages in Discord from multiple accounts to multiple channels at customizable intervals, featuring AI-powered auto-replies.",
    image: "/assets/projects/project5.webp",
    sourceCode: "https://github.com/Imamgg/discord-auto-chat",
    demo: "",
    tags: ["Node.js", "Discord API", "AI"],
    featured: true,
  },
  {
    title: "SIPEKA",
    description:
      "School Academic Management System with QR Code attendance, integrating all administrative and academic processes within a school environment.",
    image: "/assets/projects/project1.webp",
    sourceCode: "https://github.com/Imamgg/sipeka",
    demo: "https://sipeka.engineer/",
    tags: ["Laravel", "Tailwind CSS", "MySQL", "QR Code"],
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio with a code editor-inspired interface, interactive elements, and smooth animations for a personalized experience.",
    image: "/assets/projects/project2.webp",
    sourceCode: "https://github.com/Imamgg/next-porto",
    demo: "https://imamgg-dev.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    title: "Dixbit",
    description:
      "Bootcamp and intensive course platform focused on IT, offering in-depth practical learning programs across a wide range of fields.",
    image: "/assets/projects/project3.webp",
    sourceCode: "",
    demo: "",
    tags: ["Web Platform", "Education", "IT"],
  },
  {
    title: "Hunger Apps",
    description:
      "Restaurant directory landing page with open source API integration, displaying restaurant name, location, and rating information.",
    image: "/assets/projects/project4.webp",
    sourceCode: "https://github.com/Imamgg/hunger-apps",
    demo: "https://imamgg.github.io/hunger-apps/",
    tags: ["HTML", "CSS", "JavaScript", "REST API"],
  },
];
