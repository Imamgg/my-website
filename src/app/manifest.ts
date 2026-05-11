import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Imam Syafii — Full-Stack Developer & Web3 Enthusiast",
    short_name: "Imam Syafii",
    description:
      "Portfolio website of Imam Syafii — Full-Stack Developer & Web3 Enthusiast, mahasiswa Teknik Informatika UTM.",
    start_url: "/",
    display: "standalone",
    background_color: "#18181b",
    theme_color: "#3b82f6",
    orientation: "portrait-primary",
    categories: ["portfolio", "technology", "web development"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
