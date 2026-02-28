// File: src/components/ui/SkeletonText.tsx
import React from 'react';

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({ 
  lines = 1,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 bg-gray-200 animate-pulse rounded ${
            i === lines - 1 ? 'w-4/5' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

export default SkeletonText;