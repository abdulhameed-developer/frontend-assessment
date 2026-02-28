// File: src/types/index.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  bio: string;
  status: "online" | "offline" | "away";
  lastSeen: string;
  role: string;
  department: string;
  location: string;
  timezone: string;
  labels: string[];
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: "text" | "image" | "file" | "system";
  status: "sent" | "delivered" | "read";
  isUser: boolean;
  attachments?: {
    name: string;
    url: string;
    size: number;
    type: string;
  }[];
  reactions?: {
    userId: string;
    reaction: string;
  }[];
  replyTo?: {
    id: string;
    content: string;
    senderName: string;
  };
}

export interface Chat {
  id: string;
  name: string;
  participants: User[];
  lastMessage: Message;
  timestamp: string;
  unreadCount: number;
  avatar?: string;
  initials: string;
  messages: Message[];
  email?: string;
  phone?: string;
  isGroup: boolean;
  admins?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  initials: string;
  unreadCount: number;
  avatar?: string;
  online: boolean;
  role: string;
  lastActive: string;
}

export interface Note {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  company?: string;
  position?: string;
  lastContact?: string;
  labels: string[];
  notes: Note[];
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

// FIXED: DashboardStats now includes all properties from the API
export interface DashboardStats {
  all: number;
  unassigned: number;
  sales: number;
  customerSupport: number;
  onlineUsers: number;
  activeChats: number;
  // Additional properties for API stats
  totalUsers?: number;
  totalTodos?: number;
  totalPosts?: number;
  unreadMessages?: number;
}

export interface Activity {
  id: string;
  userId: string;
  type: "message" | "note" | "call" | "email" | "meeting";
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// ADDED: Todo interface for API
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// ADDED: Post interface for API
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// ADDED: Comment interface for API
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  icon?: React.ReactNode;
  badge?: number;
}

export interface NavItemSimple {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}