export interface Social {
  name: string;
  iconName: "github" | "linkedin" | "instagram" | "twitter";
  href: string;
  handle: string;
}

export const socials: Social[] = [
  {
    name: "GitHub",
    iconName: "github",
    href: "https://github.com/Imamgg",
    handle: "Imamgg",
  },
  {
    name: "Instagram",
    iconName: "instagram",
    href: "https://instagram.com/0ximam",
    handle: "0ximam",
  },
  {
    name: "LinkedIn",
    iconName: "linkedin",
    href: "https://linkedin.com/in/imamgg",
    handle: "Imam Syafii",
  },
  {
    name: "X",
    iconName: "twitter",
    href: "https://x.com/404imam",
    handle: "Imamgg",
  },
];

export const contactEmail = "404imamgg@gmail.com";
