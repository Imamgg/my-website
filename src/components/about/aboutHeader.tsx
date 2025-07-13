"use client";

import { SparklesText } from "../ui/sparklesText";

const AboutHeader = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={`my-7 px-6 container mx-auto ${className}`}>
      <SparklesText
        className="text-left text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]"
        colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
        sparklesCount={15}
      >
        {text}
      </SparklesText>
    </div>
  );
};

export default AboutHeader;
