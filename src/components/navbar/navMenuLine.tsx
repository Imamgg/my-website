import React from "react";
import Separator from "../ui/separator";

interface NavMenuLineProps {
  title: string;
}

export default function NavMenuLine({ title }: NavMenuLineProps) {
  return (
    <div className="px-[clamp(1.25rem,3vw,2.5rem)]">
      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
        {title}
      </span>
      <Separator className="mt-3 mb-4 bg-gradient-to-r from-blue-400/60 to-blue-500/50 h-[2px]" />
    </div>
  );
}
