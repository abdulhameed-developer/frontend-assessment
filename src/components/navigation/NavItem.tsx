// File: src/components/navigation/NavItem.tsx
import React from 'react';
import { classNames } from '@/utils/classNames';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  badge?: number;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ 
  label, 
  isActive, 
  badge, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'px-[16.84px] py-[8.42px] rounded-[11.23px] font-["Poppins"] text-[12.63px] font-medium transition-all duration-200',
        isActive 
          ? 'bg-[#007AEC] text-white' 
          : 'text-[#90909B] hover:bg-[#EFF2F2] hover:text-[#1A1A1A]'
      )}
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {badge !== undefined && (
          <span className={classNames(
            'px-[5.61px] py-[2.8px] rounded-[5.61px] text-[9.82px] font-medium',
            isActive ? 'bg-white text-[#007AEC]' : 'bg-[#FE3265] text-white'
          )}>
            {badge}
          </span>
        )}
      </div>
    </button>
  );
};