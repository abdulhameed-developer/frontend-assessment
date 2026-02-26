// File: src/components/user/UserProfile.tsx
import React from 'react';
// import { classNames } from '@/utils/classNames';

interface UserProfileProps {
  name: string;
  initial: string;
  avatar?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  name, 
  initial, 
  // avatar 
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-10.5 h-10.5 rounded-full bg-linear-to-br from-[#007AEC] to-[#0056A3] flex items-center justify-center text-white font-semibold text-[16.84px] font-['Inter']">
          {initial}
        </div>
        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
      </div>
      <span className="text-[14px] font-['Inter'] text-[#1A1A1A] font-medium">{name}</span>
    </div>
  );
};