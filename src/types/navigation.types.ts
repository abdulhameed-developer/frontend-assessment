// File: src/types/navigation.types.ts
export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  badge?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  initial: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isUser?: boolean;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  labels?: string[];
  notes?: string[];
}