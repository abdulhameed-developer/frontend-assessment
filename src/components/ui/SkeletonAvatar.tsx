// File: src/components/ui/SkeletonAvatar.tsx
import React from "react";

interface SkeletonAvatarProps {
  size?: string;
  className?: string;
}

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = "w-8 h-8",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-full ${size} ${className}`}
    />
  );
};

export default SkeletonAvatar;
