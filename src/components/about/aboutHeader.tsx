"use client";

import { SparklesText } from "../ui/sparklesText";

const AboutHeader = () => {
  return (
    <div className="my-7 flex items-center justify-start px-6 container mx-auto">
      <SparklesText
        className="text-left text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]"
        colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
        sparklesCount={15}
      >
        About Me
      </SparklesText>
    </div>
  );
};

export default AboutHeader;
