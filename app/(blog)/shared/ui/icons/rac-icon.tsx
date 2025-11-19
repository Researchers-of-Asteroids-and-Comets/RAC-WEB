import React from "react";
import Image from "next/image";

interface RACIconProps {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

export const RACIcon: React.FC<RACIconProps> = ({
  size = 24,
  width,
  height,
  className = "",
}) => {
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  return (
    <span
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      style={{ width: finalWidth, height: finalHeight }}
    >
      <Image
        src="/logo/logo (1).avif"
        alt="RAC logo"
        fill
        sizes={`${Math.max(finalWidth, finalHeight)}px`}
        className="object-cover"
        priority
      />
    </span>
  );
};
