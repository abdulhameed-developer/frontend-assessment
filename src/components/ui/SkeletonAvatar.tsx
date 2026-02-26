// File: src/components/ui/SkeletonAvatar.tsx
import React from 'react';
import { classNames } from '@/utils/classNames';

interface SkeletonAvatarProps {
  size?: string;
  className?: string;
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ 
  size = 'w-8 h-8',
  className 
}) => {
  return (
    <div
      className={classNames(
        'bg-[#EFF2F2] animate-pulse rounded-full',
        size,
        className
      )}
    />
  );
};