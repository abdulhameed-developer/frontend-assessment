// File: src/constants/navigation.constants.ts
import { NavItem, TeamMember } from '@/types/navigation.types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'inbox', label: 'Inbox', href: '/', isActive: true },
  { id: 'contacts', label: 'Contacts', href: '/contacts' },
  { id: 'employees', label: 'All employees', href: '/employees' },
  { id: 'workflows', label: 'Workflows', href: '/workflows' },
  { id: 'campaigns', label: 'Campaigns', href: '/campaigns' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'sarah', name: 'Sarah Williams', initial: 'S', unreadCount: 2 },
  { id: 'michael', name: 'Michael Johnson', initial: 'M', unreadCount: 11 },
  { id: 'emily', name: 'Emily Davis', initial: 'E', unreadCount: 4 },
  { id: 'christopher', name: 'Christopher Miller', initial: 'C', unreadCount: 4 },
  { id: 'amanda', name: 'Amanda Garcia', initial: 'A', unreadCount: 5 },
  { id: 'joshua', name: 'Joshua Martinez', initial: 'J', unreadCount: 1 },
  { id: 'ashley', name: 'Ashley Taylor', initial: 'A', unreadCount: 1 },
  { id: 'daniel', name: 'Daniel Anderson', initial: 'D', unreadCount: 2 },
  { id: 'jessica', name: 'Jessica Thomas', initial: 'J', unreadCount: 2 },
];

export const COLORS = {
  primary: '#007AEC',
  secondary: '#EFF2F2',
  border: '#D8DEE4',
  textSecondary: '#90909B',
  accent: '#FE3265',
} as const;