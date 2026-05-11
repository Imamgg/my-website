import Script from "next/script";

const siteUrl = "https://imamgg-dev.vercel.app";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Imam Syafii",
  alternateName: "Imamgg",
  url: siteUrl,
  image: `${siteUrl}/Profile.jpg`,
  jobTitle: "Full-Stack Developer",
  description:
    "Full-Stack Developer & Web3 Enthusiast. Mahasiswa Teknik Informatika Universitas Trunodjoyo Madura yang berpengalaman dalam Next.js, Laravel, React, Node.js, dan teknologi blockchain.",
  email: "404imamgg@gmail.com",
  sameAs: [
    "https://github.com/Imamgg",
    "https://linkedin.com/in/imamgg",
    "https://instagram.com/0ximam",
    "https://x.com/404imam",
  ],
  knowsAbout: [
    "Web Development",
    "Full-Stack Development",
    "Next.js",
    "React",
    "Laravel",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "PHP",
    "Tailwind CSS",
    "Web3",
    "Blockchain",
    "MySQL",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Trunodjoyo Madura",
    alternateName: "UTM",
    url: "https://www.trunojoyo.ac.id",
  },
  memberOf: [
    {
      "@type": "Organization",
      name: "Wargalab TIF UTM",
      description: "Informatics Engineering Lab at UTM",
    },
    {
      "@type": "Organization",
      name: "UKMFT-ITC",
      description: "Technology student organization",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Imam Syafii Portfolio",
  alternateName: "Imamgg Portfolio",
  url: siteUrl,
  description:
    "Portfolio website of Imam Syafii — Full-Stack Developer & Web3 Enthusiast",
  author: {
    "@type": "Person",
    name: "Imam Syafii",
  },
  inLanguage: "id",
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Imam Syafii Portfolio",
  url: siteUrl,
  mainEntity: {
    "@type": "Person",
    name: "Imam Syafii",
    url: siteUrl,
  },
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
};

export function JsonLd() {
  return (
    <>
      <Script
        id="person-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="profile-page-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
