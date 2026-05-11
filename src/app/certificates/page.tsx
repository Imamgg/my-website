import type { Metadata } from "next";
import CertificatesPageClient from "./pageClient";

export const metadata: Metadata = {
  title: "Certificates & Achievements",
  description:
    "Koleksi sertifikasi dan pencapaian Imam Syafii dari berbagai platform seperti Dicoding Indonesia, freeCodeCamp, Google Cloud, dan Coursera. Meliputi Web Development, React.js, Node.js, Cloud Computing, dan Blockchain.",
  alternates: {
    canonical: "/certificates",
  },
  openGraph: {
    title: "Certificates & Achievements | Imam Syafii",
    description:
      "Koleksi sertifikasi dan pencapaian Imam Syafii dari Dicoding, freeCodeCamp, Google Cloud, dan Coursera.",
    url: "/certificates",
    type: "website",
  },
};

export default function CertificatesPage() {
  return <CertificatesPageClient />;
}
