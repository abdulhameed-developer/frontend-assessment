// File: src/components/ui/SkeletonText.tsx
import React from 'react';
import { classNames } from '@/utils/classNames';

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ 
  lines = 1,
  className 
}) => {
  return (
    <div className={classNames('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-[#EFF2F2] animate-pulse rounded-[5.61px]"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
};