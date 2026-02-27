// File: src/context/ChatContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Chat, Message, User } from "@/types";
import { chats as initialChats, users, currentUser } from "@/data/dummyData";
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
    attachments?: any[],
  ) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, newContent: string) => void;
  reactToMessage: (messageId: string, reaction: string) => void;
  replyToMessage: (messageId: string, content: string) => void;
  searchChats: (query: string) => void;
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
  const [filteredChats, setFilteredChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread" | "groups">(
    "all",
  );
  const [sortBy, setSortBy] = useState<"recent" | "unread" | "alphabetical">(
    "recent",
  );
  const [loading, setLoading] = useState(false);

  // Load messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
      markAsRead(selectedChat.id);
    }
  }, [selectedChat]);

  // Apply filters and search
  useEffect(() => {
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

    setFilteredChats(filtered);
  }, [chats, searchQuery, filterType, sortBy]);

  const sendMessage = async (
    content: string,
    type: "text" | "image" | "file" = "text",
    attachments: any[] = [],
  ) => {
    if (!selectedChat || !user || !content.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId: selectedChat.id,
      senderId: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      senderAvatar: user.avatar,
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type,
      status: "sent",
      isUser: true,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    // Update messages in selected chat
    setMessages((prev) => [...prev, newMessage]);

    // Update chat list
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
              timestamp: newMessage.timestamp,
              unreadCount: chat.unreadCount + 1,
              messages: [...chat.messages, newMessage],
            }
          : chat,
      ),
    );

    // Simulate reply (in real app, this would come from WebSocket)
    setTimeout(() => {
      simulateReply(selectedChat.id);
    }, 3000);
  };

  const simulateReply = (chatId: string) => {
    const otherParticipant = selectedChat?.participants.find(
      (p) => p.id !== user?.id,
    );
    if (!otherParticipant) return;

    const replyMessage: Message = {
      id: `msg-${Date.now()}-reply`,
      chatId,
      senderId: otherParticipant.id,
      senderName: otherParticipant.firstName + " " + otherParticipant.lastName,
      senderAvatar: otherParticipant.avatar,
      content: "Thanks for your message! I'll get back to you soon.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
      status: "delivered",
      isUser: false,
    };

    setMessages((prev) => [...prev, replyMessage]);
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
              timestamp: replyMessage.timestamp,
              messages: [...chat.messages, replyMessage],
            }
          : chat,
      ),
    );
  };

  const deleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
    // Update in chats as well
    setChats((prev) =>
      prev.map((chat) => ({
        ...chat,
        messages: chat.messages.filter((m) => m.id !== messageId),
      })),
    );
  };

  const editMessage = (messageId: string, newContent: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, content: newContent } : m)),
    );
  };

  const reactToMessage = (messageId: string, reaction: string) => {
    if (!user) return;

    setMessages((prev) =>
      prev.map((m) =>
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
    );
  };

  const replyToMessage = (messageId: string, content: string) => {
    const originalMessage = messages.find((m) => m.id === messageId);
    if (!originalMessage) return;

    const replyContent = `Replying to ${originalMessage.senderName}: ${content}`;
    sendMessage(replyContent);
  };

  const markAsRead = (chatId: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
      ),
    );
  };

  const createGroupChat = (name: string, participantIds: string[]) => {
    const participants = users.filter((u) => participantIds.includes(u.id));
    participants.push(user!);

    const newChat: Chat = {
      id: `chat-group-${Date.now()}`,
      name,
      participants,
      lastMessage: {
        id: `msg-${Date.now()}`,
        chatId: `chat-group-${Date.now()}`,
        senderId: user!.id,
        senderName: `${user!.firstName} ${user!.lastName}`,
        content: "Group created",
        timestamp: "now",
        type: "system",
        status: "read",
        isUser: true,
      },
      timestamp: "now",
      unreadCount: 0,
      initials: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase(),
      messages: [],
      isGroup: true,
      admins: [user!.id],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setChats((prev) => [newChat, ...prev]);
  };

  const addParticipant = (chatId: string, userId: string) => {
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
  };

  const removeParticipant = (chatId: string, userId: string) => {
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
  };

  const searchChats = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ChatContext.Provider
      value={{
        chats: filteredChats,
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
