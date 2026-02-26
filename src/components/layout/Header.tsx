// File: src/components/layout/Header.tsx
'use client';

import React from 'react';
import { Navigation } from '@/navigation/Navigation';
import { UserProfile } from '@/user/UserProfile';
import { SkeletonBlock } from '@/ui/SkeletonBlock';
import { useDelayedRender } from '@/hooks/useDelayedRender';
import { classNames } from '@/utils/classNames';

export const Header: React.FC = () => {
  const isReady = useDelayedRender(1000);

  return (
    <header className="w-full bg-white border-b border-[#D8DEE4] px-8 py-4">
      <div className="max-w-360 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-[42.11px]">
          {!isReady ? (
            <SkeletonBlock width="w-[118.77px]" height="h-[32px]" />
          ) : (
            <span className="text-[24px] font-['SF Compact'] font-bold text-[#1A1A1A] tracking-[-0.02em]">
              BOX<span className="text-[#007AEC]">pad</span>
            </span>
          )}

          <Navigation />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-[21.05px]">
          {/* Settings Icon */}
          {!isReady ? (
            <SkeletonBlock width="w-[42px]" height="h-[42px]" className="rounded-[11.23px]" />
          ) : (
            <div className="relative w-10.5 h-10.5">
              <div className="absolute inset-0 border-2 border-[#D8DEE4] rounded-[11.23px]" />
              <div className="absolute inset-1 border border-[#90909B] rounded-[5.61px] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="#1A1A1A" strokeWidth="1.5"/>
                  <path d="M19.5 12H19.505M4.5 12H4.505M12 4.5V4.495M12 19.5V19.495" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          )}

          {/* User Profile */}
          {!isReady ? (
            <div className="flex items-center gap-3">
              <SkeletonBlock width="w-[42px]" height="h-[42px]" className="rounded-full" />
              <SkeletonBlock width="w-[100px]" height="h-[16px]" />
            </div>
          ) : (
            <UserProfile name="Michael Johnson" initial="M" />
          )}
        </div>
      </div>
    </header>
  );
};