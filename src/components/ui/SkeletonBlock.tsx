// File: src/components/ui/SkeletonBlock.tsx
import React from "react";

interface SkeletonBlockProps {
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width = "w-full",
  height = "h-4",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${width} ${height} ${className}`}
    />
  );
};


export default SkeletonBlock;