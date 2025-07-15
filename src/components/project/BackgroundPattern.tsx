import Image from "next/image";

const BackgroundPattern = () => {
  return (
    <>
      {/* Pattern kanan utama */}
      <div className="absolute top-0 right-0 w-40 h-full opacity-45 pointer-events-none">
        <Image
          src="/right-pattern.svg"
          alt="Right Pattern"
          width={320}
          height={1080}
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-32 h-full opacity-20 pointer-events-none rotate-180">
        <Image
          src="/right-pattern.svg"
          alt="Left Pattern"
          width={256}
          height={1080}
          className="object-cover"
        />
      </div>

      {/* Geometric shapes floating */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl pointer-events-none animate-pulse" />
      <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full blur-lg pointer-events-none animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-xl pointer-events-none animate-pulse delay-2000" />
      <div className="absolute bottom-20 right-20 w-14 h-14 bg-gradient-to-br from-yellow-500/10 to-red-500/10 rounded-full blur-lg pointer-events-none animate-pulse delay-500" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-500/20 to-transparent pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      {/* Floating dots */}
      <div
        className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-500/30 rounded-full pointer-events-none animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-3/4 right-1/3 w-2 h-2 bg-purple-500/30 rounded-full pointer-events-none animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/5 w-2 h-2 bg-green-500/30 rounded-full pointer-events-none animate-bounce"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-1/5 w-2 h-2 bg-pink-500/30 rounded-full pointer-events-none animate-bounce"
        style={{ animationDelay: "0.5s" }}
      />
    </>
  );
};

export default BackgroundPattern;
