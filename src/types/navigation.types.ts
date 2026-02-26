// File: src/types/index.ts
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  name: string;
  body: string;
  email: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalTodos: number;
  totalPosts: number;
  unreadMessages: number;
}