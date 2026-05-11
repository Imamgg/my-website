export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credential?: string;
}

export const certificates: Certificate[] = [
  {
    title: "Web Development Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "Jan 2024",
    image: "/assets/certificates/image.png",
  },
  {
    title: "React.js Frontend Development",
    issuer: "Dicoding Indonesia",
    date: "Mar 2024",
    image: "/assets/certificates/cert-2.webp",
    credential: "https://www.dicoding.com/certificates/",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "Apr 2024",
    image: "/assets/certificates/cert-3.webp",
    credential: "https://www.freecodecamp.org/certification/",
  },
  {
    title: "Back-End Development with Node.js",
    issuer: "Dicoding Indonesia",
    date: "Jun 2024",
    image: "/assets/certificates/cert-4.webp",
    credential: "https://www.dicoding.com/certificates/",
  },
  {
    title: "Cloud Computing Essentials",
    issuer: "Google Cloud",
    date: "Aug 2024",
    image: "/assets/certificates/cert-5.webp",
  },
  {
    title: "Blockchain & Web3 Fundamentals",
    issuer: "Coursera",
    date: "Oct 2024",
    image: "/assets/certificates/cert-6.webp",
    credential: "https://www.coursera.org/verify/",
  },
];
