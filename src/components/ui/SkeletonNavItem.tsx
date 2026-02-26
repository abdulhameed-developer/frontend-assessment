// File: src/components/ui/SkeletonNavItem.tsx
import React from 'react';
import SkeletonBlock  from './SkeletonBlock';
import SkeletonText from './SkeletonText';

export const SkeletonNavItem: React.FC = () => {
  return (
    <div className="flex items-center justify-between py-2">
      <SkeletonText lines={1} className="w-24" />
      <SkeletonBlock width="w-6" height="h-6" />
    </div>
  );
};