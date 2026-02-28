// File: src/services/api.ts
import { Comment, DashboardStats, Post, Todo, User } from "@/types";

// Define interface for DummyJSON user response
interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  phone: string;
  username: string;
  birthDate: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  };
}

interface DummyUsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

const API = {
  users: "https://reqres.in/api/users",
  dummyUsers: "https://dummyjson.com/users",
  todos: "https://jsonplaceholder.typicode.com/todos",
  posts: "https://jsonplaceholder.typicode.com/posts",
  comments: "https://jsonplaceholder.typicode.com/comments",
};

export const fetchUsers = async (page: number = 1): Promise<User[]> => {
  const response = await fetch(`${API.users}?page=${page}`);
  const data = await response.json();
  return data.data;
};

export const fetchUserProfile = async (id: number = 2): Promise<User> => {
  const response = await fetch(`${API.users}/${id}`);
  const data = await response.json();
  return data.data;
};

// FIXED: Properly typed return value
export const fetchAllUsers = async (): Promise<DummyUser[]> => {
  const response = await fetch(API.dummyUsers);
  const data: DummyUsersResponse = await response.json();
  return data.users;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API.todos);
  const data = await response.json();
  return data.slice(0, 10); // Get first 10 todos
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(API.posts);
  const data = await response.json();
  return data.slice(0, 5); // Get first 5 posts
};

export const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch(API.comments);
  const data = await response.json();
  return data.slice(0, 8); // Get first 8 comments for activity
};

// FIXED: Now returns complete DashboardStats object with all required properties
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const [usersRes, todosRes, postsRes, commentsRes] = await Promise.all([
    fetch(API.dummyUsers),
    fetch(API.todos),
    fetch(API.posts),
    fetch(API.comments),
  ]);

  const users: DummyUsersResponse = await usersRes.json();
  const todos: Todo[] = await todosRes.json();
  const posts: Post[] = await postsRes.json();
  const comments: Comment[] = await commentsRes.json();

  return {
    // Original DashboardStats required properties
    all: 28,
    unassigned: 5,
    sales: 7,
    customerSupport: 16,
    onlineUsers: 5,
    activeChats: 8,
    // Additional API properties (optional)
    totalUsers: users.total,
    totalTodos: todos.length,
    totalPosts: posts.slice(0, 5).length,
    unreadMessages: comments.slice(0, 5).length,
  };
};