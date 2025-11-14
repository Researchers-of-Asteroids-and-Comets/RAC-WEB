import React from 'react';
import Image from 'next/image';

interface RACIconProps {
  size?: number;
  className?: string;
}

export const RACIcon: React.FC<RACIconProps> = ({
  size = 24,
  className = ""
}) => {
  return (
    <span
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo/logo (1).avif"
        alt="RAC logo"
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </span>
  );
};