// File: src/components/ui/SkeletonBlock.tsx
import React from 'react';
import { classNames } from '@/utils/classNames';

interface SkeletonBlockProps {
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ 
  width = 'w-full', 
  height = 'h-4',
  className 
}) => {
  return (
    <div
      className={classNames(
        'bg-[#EFF2F2] animate-pulse rounded-[5.61px]',
        width,
        height,
        className
      )}
    />
  );
};