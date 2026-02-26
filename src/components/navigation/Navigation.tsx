// File: src/components/navigation/Navigation.tsx
'use client';

import React from 'react';
import { NavItem } from './NavItem';
import { NAV_ITEMS } from '@/constants/navigation.constants';
import { useDelayedRender } from '@/hooks/useDelayedRender';
import { SkeletonNavItem } from '@/ui/SkeletonNavItem';

interface NavigationProps {
  onNavChange?: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavChange }) => {
  const isReady = useDelayedRender(1500);
  const [activeId, setActiveId] = React.useState('inbox');

  const handleNavClick = (id: string) => {
    setActiveId(id);
    onNavChange?.(id);
  };

  if (!isReady) {
    return (
      <nav className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonNavItem key={i} />
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-2">
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          isActive={item.id === activeId}
          badge={item.badge}
          onClick={() => handleNavClick(item.id)}
        />
      ))}
    </nav>
  );
};