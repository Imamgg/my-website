export interface ExperienceItem {
  role: string;
  organization: string;
  date: string;
  description: string;
  iconName: "monitor" | "graduation-cap" | "flask-conical" | "briefcase";
  color: string;
  borderColor: string;
  beamColor: { from: string; to: string };
}

export const experiences: ExperienceItem[] = [
  {
    role: "Lab Admin",
    organization: "Wargalab TIF UTM",
    date: "2025 - Present",
    description:
      "Managing lab facilities, maintaining equipment, and handling all administrative duties related to lab operations.",
    iconName: "monitor",
    color: "text-blue-500",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    beamColor: { from: "#3b82f6", to: "#60a5fa" },
  },
  {
    role: "Practicum Assistant",
    organization: "Wargalab TIF UTM - Web Programming",
    date: "Mar 2025 - Jun 2025",
    description:
      "Practicum Assistant for Web Programming Fundamentals. Assisted students in understanding core web programming concepts, including HTML, CSS, JavaScript, Bootstrap, and jQuery. Provided hands-on guidance for weekly practical sessions and assignments.",
    iconName: "graduation-cap",
    color: "text-violet-500",
    borderColor: "border-violet-500/30 hover:border-violet-500/60",
    beamColor: { from: "#8b5cf6", to: "#a78bfa" },
  },
  {
    role: "Staff Litbang",
    organization: "UKMFT-ITC",
    date: "Feb 2025 - Aug 2025",
    description:
      "Responsible for enhancing the quality and competence of UKMFT-ITC members in technology through research and development initiatives. Organized training and workshops to prepare members for innovation and changes in the tech world.",
    iconName: "flask-conical",
    color: "text-emerald-500",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
    beamColor: { from: "#10b981", to: "#34d399" },
  },
  {
    role: "Practicum Assistant",
    organization: "Wargalab TIF UTM - IT Fundamentals",
    date: "Sep 2024 - Dec 2024",
    description:
      "Practicum Assistant for Introduction to Information Technology. Assisted students in understanding the fundamental concepts of Information Technology and provided hands-on practice with weekly lecture materials.",
    iconName: "graduation-cap",
    color: "text-amber-500",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    beamColor: { from: "#f59e0b", to: "#fbbf24" },
  },
  {
    role: "Training Division",
    organization: "Wargalab TIF UTM",
    date: "Jul 2024 - Present",
    description:
      "Member of the Wargalab TIF Training division, an informatics engineering student association, which focuses on the development and delivery of practical training programs in the field of technology and informatics.",
    iconName: "briefcase",
    color: "text-rose-500",
    borderColor: "border-rose-500/30 hover:border-rose-500/60",
    beamColor: { from: "#f43f5e", to: "#fb7185" },
  },
];
