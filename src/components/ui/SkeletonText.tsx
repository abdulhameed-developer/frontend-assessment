// File: src/components/ui/SkeletonText.tsx
import React from "react";
import { classNames } from "@/utils/classNames";

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

// import "./SkeletonText.css";
import "../../app/globals.css";

// ...

const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 1,
  className,
}) => {
  return (
    <div className={classNames("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 bg-[#EFF2F2] animate-pulse rounded-[4px] ${i === lines - 1 ? "skeleton-text" : ""}`}
        />
      ))}
    </div>
  );
};

export default SkeletonText;