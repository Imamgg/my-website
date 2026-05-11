import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/seo/jsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://imamgg-dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Imamgg | Portfolio",
    template: "%s | Imamgg",
  },
  description:
    "Portfolio Imamgg — Full-Stack Developer & Web3 Enthusiast. Mahasiswa Teknik Informatika Universitas Trunodjoyo Madura yang berpengalaman dalam Next.js, Laravel, React, Node.js, dan teknologi blockchain. Lihat project, pengalaman, dan sertifikasi saya.",
  keywords: [
    "Imamgg",
    "Imam Syafii",
    "Full-Stack Developer",
    "Web3 Enthusiast",
    "Portfolio",
    "Next.js Developer",
    "Laravel Developer",
    "React Developer",
    "Node.js Developer",
    "Teknik Informatika UTM",
    "Universitas Trunodjoyo Madura",
    "Web Developer Indonesia",
    "Blockchain Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer Indonesia",
  ],
  authors: [{ name: "Imam Syafii", url: siteUrl }],
  creator: "Imam Syafii",
  publisher: "Imam Syafii",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Imam Syafii Portfolio",
    title: "Imam Syafii | Full-Stack Developer & Web3 Enthusiast",
    description:
      "Full-Stack Developer & Web3 Enthusiast. Mahasiswa Teknik Informatika UTM berpengalaman dalam Next.js, Laravel, React, dan blockchain technology.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imam Syafii — Full-Stack Developer & Web3 Enthusiast",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imam Syafii | Full-Stack Developer & Web3 Enthusiast",
    description:
      "Full-Stack Developer & Web3 Enthusiast. Mahasiswa Teknik Informatika UTM berpengalaman dalam Next.js, Laravel, React, dan blockchain technology.",
    creator: "@404imam",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Xwd1bfeG7IO-LVSNvuHJCyeK09o0UnX9EWQiKCDPw5Q",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
    { media: "(prefers-color-scheme: dark)", color: "#18181b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        <Toaster />
      </body>
    </html>
  );
}
