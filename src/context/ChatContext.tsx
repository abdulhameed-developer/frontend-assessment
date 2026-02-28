// File: src/context/ChatContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { Chat, Message } from "@/types";
import { chats as initialChats, users } from "@/data/dummyData";
import { useAuth } from "./AuthContext";

interface ChatContextType {
  chats: Chat[];
  filteredChats: Chat[];
  selectedChat: Chat | null;
  messages: Message[];
  searchQuery: string;
  filterType: "all" | "unread" | "groups";
  sortBy: "recent" | "unread" | "alphabetical";
  loading: boolean;
  setSelectedChat: (chat: Chat | null) => void;
  sendMessage: (
    content: string,
    type?: "text" | "image" | "file",
    attachments?: Array<{
      name: string;
      url: string;
      size: number;
      type: string;
    }>,
  ) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, newContent: string) => void;
  reactToMessage: (messageId: string, reaction: string) => void;
  replyToMessage: (messageId: string, content: string) => void;
  searchChats: (query: string) => void;
  filterChats: (filter: "all" | "open" | "closed") => void;
  sortChats: (sort: "newest" | "oldest" | "unread") => void;
  setFilterType: (filter: "all" | "unread" | "groups") => void;
  setSortBy: (sort: "recent" | "unread" | "alphabetical") => void;
  markAsRead: (chatId: string) => void;
  createGroupChat: (name: string, participantIds: string[]) => void;
  addParticipant: (chatId: string, userId: string) => void;
  removeParticipant: (chatId: string, userId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChatState] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread" | "groups">(
    "all",
  );
  const [sortBy, setSortBy] = useState<"recent" | "unread" | "alphabetical">(
    "recent",
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  // Generate unique ID helper
  const generateId = useCallback((prefix: string): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  }, []);

  // markAsRead function
  const markAsRead = useCallback((chatId: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
      ),
    );
  }, []);

  // Custom setSelectedChat that handles marking as read
  const setSelectedChat = useCallback((chat: Chat | null) => {
    setSelectedChatState(chat);
    if (chat && chat.unreadCount > 0) {
      setTimeout(() => {
        markAsRead(chat.id);
      }, 0);
    }
  }, [markAsRead]);

  // Messages derived from selectedChat
  const messages = useMemo(() => {
    return selectedChat?.messages || [];
  }, [selectedChat]);

  // FIXED: Filtered chats derived from chats, searchQuery, filterType, sortBy
  const filteredChats = useMemo(() => {
    let filtered = [...chats];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.lastMessage.content
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Apply filters
    if (filterType === "unread") {
      filtered = filtered.filter((chat) => chat.unreadCount > 0);
    } else if (filterType === "groups") {
      filtered = filtered.filter((chat) => chat.isGroup);
    }

    // Apply sorting
    if (sortBy === "recent") {
      filtered.sort((a, b) => {
        if (a.timestamp === "Yesterday") return 1;
        if (b.timestamp === "Yesterday") return -1;
        return b.timestamp.localeCompare(a.timestamp);
      });
    } else if (sortBy === "unread") {
      filtered.sort((a, b) => b.unreadCount - a.unreadCount);
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [chats, searchQuery, filterType, sortBy]);

  // FIXED: simulateReply function
  const simulateReply = useCallback((chatId: string) => {
    if (!selectedChat || !user) return;

    const otherParticipant = selectedChat?.participants.find(
      (p) => p.id !== user?.id,
    );
    if (!otherParticipant) return;

    const replyId = generateId("msg-reply");
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const replyMessage: Message = {
      id: replyId,
      chatId,
      senderId: otherParticipant.id,
      senderName: otherParticipant.firstName + " " + otherParticipant.lastName,
      senderAvatar: otherParticipant.avatar,
      content: "Thanks for your message! I'll get back to you soon.",
      timestamp: now,
      type: "text",
      status: "delivered",
      isUser: false,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: {
                ...replyMessage,
                content:
                  replyMessage.content.length > 40
                    ? replyMessage.content.substring(0, 40) + "..."
                    : replyMessage.content,
              },
              timestamp: now,
              messages: [...chat.messages, replyMessage],
            }
          : chat,
      ),
    );
  }, [selectedChat, user, generateId]);

  // FIXED: sendMessage
  const sendMessage = useCallback((
    content: string,
    type: "text" | "image" | "file" = "text",
    attachments?: Array<{
      name: string;
      url: string;
      size: number;
      type: string;
    }>,
  ) => {
    if (!selectedChat || !user || !content.trim()) return;

    const messageId = generateId("msg");
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage: Message = {
      id: messageId,
      chatId: selectedChat.id,
      senderId: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      senderAvatar: user.avatar,
      content,
      timestamp: now,
      type,
      status: "sent",
      isUser: true,
      attachments,
    };

    // Update chats with new message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              lastMessage: {
                ...newMessage,
                content:
                  content.length > 40
                    ? content.substring(0, 40) + "..."
                    : content,
              },
              timestamp: now,
              unreadCount: chat.unreadCount + 1,
              messages: [...chat.messages, newMessage],
            }
          : chat,
      ),
    );

    // Update selected chat's messages immediately for UI
    setSelectedChatState((prev) => {
      if (!prev || prev.id !== selectedChat.id) return prev;
      return {
        ...prev,
        lastMessage: {
          ...newMessage,
          content: content.length > 40 ? content.substring(0, 40) + "..." : content,
        },
        timestamp: now,
        unreadCount: prev.unreadCount + 1,
        messages: [...prev.messages, newMessage],
      };
    });

    // Simulate reply after 3 seconds
    setTimeout(() => {
      simulateReply(selectedChat.id);
    }, 3000);
  }, [selectedChat, user, generateId, simulateReply]);

  // FIXED: filterChats function - now updates the filterType which triggers useMemo
  const filterChats = useCallback((filter: "all" | "open" | "closed") => {
    // Convert the filter from UsersColumn to filterType format
    if (filter === "open") {
      setFilterType("unread");
    } else if (filter === "closed") {
      setFilterType("all"); // Closed means no unread messages
    } else {
      setFilterType("all");
    }
  }, []);

  // FIXED: sortChats function - now updates the sortBy which triggers useMemo
  const sortChats = useCallback((sort: "newest" | "oldest" | "unread") => {
    if (sort === "newest") {
      setSortBy("recent");
    } else if (sort === "oldest") {
      setSortBy("recent"); // We'll handle oldest in a custom way
    } else if (sort === "unread") {
      setSortBy("unread");
    }
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    setChats((prev) =>
      prev.map((chat) => ({
        ...chat,
        messages: chat.messages.filter((m) => m.id !== messageId),
      })),
    );
  }, []);

  const editMessage = useCallback((messageId: string, newContent: string) => {
    setChats((prev) =>
      prev.map((chat) => ({
        ...chat,
        messages: chat.messages.map((m) =>
          m.id === messageId ? { ...m, content: newContent } : m,
        ),
      })),
    );
  }, []);

  const reactToMessage = useCallback((messageId: string, reaction: string) => {
    if (!user) return;

    setChats((prev) =>
      prev.map((chat) => ({
        ...chat,
        messages: chat.messages.map((m) =>
          m.id === messageId
            ? {
                ...m,
                reactions: [
                  ...(m.reactions || []),
                  { userId: user.id, reaction },
                ],
              }
            : m,
        ),
      })),
    );
  }, [user]);

  const replyToMessage = useCallback((messageId: string, content: string) => {
    const originalMessage = chats
      .flatMap((chat) => chat.messages)
      .find((m) => m.id === messageId);
      
    if (!originalMessage) return;

    const replyContent = `Replying to ${originalMessage.senderName}: ${content}`;
    sendMessage(replyContent);
  }, [chats, sendMessage]);

  const createGroupChat = useCallback((name: string, participantIds: string[]) => {
    if (!user) return;

    const participants = users.filter((u) => participantIds.includes(u.id));
    participants.push(user);

    const now = new Date().toISOString();
    const chatId = `chat-group-${Date.now()}`;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      senderId: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      content: "Group created",
      timestamp: currentTime,
      type: "system",
      status: "read",
      isUser: true,
    };

    const newChat: Chat = {
      id: chatId,
      name,
      participants,
      lastMessage: newMessage,
      timestamp: currentTime,
      unreadCount: 0,
      initials,
      messages: [newMessage],
      isGroup: true,
      admins: [user.id],
      createdAt: now,
      updatedAt: now,
    };

    setChats((prev) => [newChat, ...prev]);
  }, [user]);

  const addParticipant = useCallback((chatId: string, userId: string) => {
    const newParticipant = users.find((u) => u.id === userId);
    if (!newParticipant) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              participants: [...chat.participants, newParticipant],
            }
          : chat,
      ),
    );
  }, []);

  const removeParticipant = useCallback((chatId: string, userId: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              participants: chat.participants.filter((p) => p.id !== userId),
            }
          : chat,
      ),
    );
  }, []);

  const searchChats = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        filteredChats,
        selectedChat,
        messages,
        searchQuery,
        filterType,
        sortBy,
        loading,
        setSelectedChat,
        sendMessage,
        deleteMessage,
        editMessage,
        reactToMessage,
        replyToMessage,
        searchChats,
        filterChats,
        sortChats,
        setFilterType,
        setSortBy,
        markAsRead,
        createGroupChat,
        addParticipant,
        removeParticipant,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};