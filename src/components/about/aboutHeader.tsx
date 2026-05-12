"use client";

import { SparklesText } from "../ui/sparklesText";
import { ReactNode } from "react";

const AboutHeader = ({
  text,
  className,
  breadcrumbText,
  breadcrumbIcon,
}: {
  text: string;
  className?: string;
  breadcrumbText?: string;
  breadcrumbIcon?: ReactNode;
}) => {
  return (
    <div className={`my-7 px-6 container mx-auto ${className}`}>
      {breadcrumbText && breadcrumbIcon && (
        <div className="flex items-center gap-2 mb-6">
          {breadcrumbIcon}
          <span className="text-sm text-zinc-500 dark:text-zinc-400 font-mono tracking-wider">
            {breadcrumbText}
          </span>
        </div>
      )}
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
