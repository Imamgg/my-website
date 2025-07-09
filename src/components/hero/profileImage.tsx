import React from "react";
import Image from "next/image";

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  size = 120,
  className = "",
}) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden border-4 border-white/20 dark:border-gray-800/20 shadow-2xl backdrop-blur-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full"></div>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="relative z-10 object-cover rounded-full"
        priority
      />
    </div>
  );
};
