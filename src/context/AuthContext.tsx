// File: src/context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { User } from "@/types";
import { users } from "@/data/dummyData";

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  changePassword: (
    oldPassword: string,
    newPassword: string,
  ) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(users);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check for saved session with proper initialization pattern
  useEffect(() => {
    // Only run once when component mounts
    if (!isInitialized) {
      try {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    }
  }, [isInitialized]);

  // Login function - password is intentionally unused in demo
  const login = useCallback(async (
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email (password is ignored in demo)
    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setError("Invalid email or password");
    setIsLoading(false);
    return false;
  }, [allUsers]);

  // Signup function - password is intentionally unused in demo
  const signup = useCallback(async (
    userData: Partial<User>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // Check if user already exists
    const existingUser = allUsers.find(
      (u) => u.email.toLowerCase() === userData.email?.toLowerCase(),
    );
    if (existingUser) {
      setError("User with this email already exists");
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      avatar: userData.avatar || "",
      phone: userData.phone || "",
      bio: userData.bio || "New user",
      status: "online",
      lastSeen: "now",
      role: "Member",
      department: "General",
      location: "Not specified",
      timezone: "UTC",
      labels: ["New"],
    };

    // In a real app, you'd save to database
    setAllUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setIsLoading(false);
    return true;
  }, [allUsers]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("currentUser");
  }, []);

  const updateUser = useCallback((updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      // Update in allUsers list
      setAllUsers((prev) => prev.map((u) => (u.id === user.id ? newUser : u)));
    }
  }, [user]);

  // Change password function - parameters are intentionally unused in demo
  const changePassword = useCallback(async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    oldPassword: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    newPassword: string
  ): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    return true;
  }, []);

  const uploadAvatar = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        updateUser({ avatar: avatarUrl });
        resolve(avatarUrl);
      };
      reader.readAsDataURL(file);
    });
  }, [updateUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        users: allUsers,
        login,
        signup,
        logout,
        updateUser,
        changePassword,
        uploadAvatar,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};