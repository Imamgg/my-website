import HomeClient from "@/components/home/homeClient";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        Imam Syafii — Full-Stack Developer & Web3 Enthusiast | Portfolio
      </h1>
      <p className="sr-only">
        Portfolio website Imam Syafii, mahasiswa Teknik Informatika Universitas
        Trunodjoyo Madura. Berpengalaman dalam Next.js, Laravel, React, Node.js,
        TypeScript, dan teknologi Web3/Blockchain. Lihat project, pengalaman
        kerja, sertifikasi, dan hubungi saya.
      </p>
      <HomeClient />
    </>
  );
}
