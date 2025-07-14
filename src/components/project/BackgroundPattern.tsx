import Image from "next/image";
import { RetroGrid } from "../ui/background/retroGrid";

const BackgroundPattern = () => {
  return (
    <>
      <RetroGrid />
      <div className="absolute top-0 right-0 w-40 h-full opacity-45 pointer-events-none">
        <Image
          src="/right-pattern.svg"
          alt="Right Pattern"
          width={320}
          height={1080}
          className="object-cover"
        />
      </div>
    </>
  );
};

export default BackgroundPattern;
