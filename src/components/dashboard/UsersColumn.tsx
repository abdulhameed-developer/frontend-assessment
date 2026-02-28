// File: src/components/dashboard/UsersColumn.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { User, Chat as ChatType } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";

// Define interfaces for the component
interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  status?: "online" | "offline" | "away";
  role?: string;
  lastSeen?: string;
  phone?: string;
  bio?: string;
  department?: string;
  location?: string;
  timezone?: string;
  labels?: string[];
}

interface LastMessage {
  senderId: string;
  content: string;
  timestamp?: string;
  attachments?: Array<{
    name: string;
    url: string;
    size: number;
    type: string;
  }>;
}

interface ChatItem {
  id: string;
  name: string;
  participants: Participant[];
  unreadCount: number;
  timestamp: string;
  lastMessage: LastMessage;
  initials?: string;
  messages?: ChatType['messages'];
  isGroup?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const UsersColumn: React.FC = () => {
  const { user } = useAuth();
  const {
    filteredChats,
    selectedChat,
    setSelectedChat,
    searchChats,
    filterChats,
    sortChats,
  } = useChat();
  const [searchInput, setSearchInput] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<"all" | "open" | "closed">(
    "all",
  );
  const [currentSort, setCurrentSort] = useState<
    "newest" | "oldest" | "unread"
  >("newest");

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    searchChats(e.target.value);
  };

  // Filter functions now work
  const handleFilter = (filter: "open" | "closed" | "all") => {
    setCurrentFilter(filter);
    filterChats(filter);
    setFilterOpen(false);
  };

  // Sort functions now work
  const handleSort = (sort: "newest" | "oldest" | "unread") => {
    setCurrentSort(sort);
    sortChats(sort);
    setSortOpen(false);
  };

  const getInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, []);

  const getAvatarColor = useCallback((name: string): string => {
    const colors: string[] = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  }, []);

  // Helper function to convert Participant to User
  const participantToUser = useCallback((p: Participant): User => {
    return {
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      avatar: p.avatar || "",
      phone: p.phone || "",
      bio: p.bio || "",
      status: p.status || "offline",
      lastSeen: p.lastSeen || new Date().toISOString(),
      role: p.role || "",
      department: p.department || "",
      location: p.location || "",
      timezone: p.timezone || "",
      labels: p.labels || [],
    };
  }, []);

  // Helper function to convert ChatItem to ChatType
  const handleSelectChat = useCallback((chat: ChatItem) => {
    const participantsAsUsers = chat.participants.map(participantToUser);
    const sender = chat.participants.find(p => p.id === chat.lastMessage.senderId);
    const senderName = sender 
      ? `${sender.firstName} ${sender.lastName}`.trim()
      : 'Unknown';

    const chatToSelect: ChatType = {
      id: chat.id,
      name: chat.name,
      participants: participantsAsUsers,
      lastMessage: {
        id: `${chat.lastMessage.senderId}-${chat.id}-${Date.now()}`,
        chatId: chat.id,
        senderId: chat.lastMessage.senderId,
        senderName: senderName,
        content: chat.lastMessage.content,
        timestamp: chat.timestamp,
        type: 'text',
        status: 'read',
        isUser: chat.lastMessage.senderId === user?.id,
        ...(chat.lastMessage.attachments ? { attachments: chat.lastMessage.attachments } : {})
      },
      timestamp: chat.timestamp,
      unreadCount: chat.unreadCount,
      initials: chat.initials || getInitials(chat.name),
      messages: chat.messages || [],
      isGroup: chat.isGroup || false,
      createdAt: chat.createdAt || new Date().toISOString(),
      updatedAt: chat.updatedAt || new Date().toISOString(),
    };
    
    setSelectedChat(chatToSelect);
  }, [user?.id, getInitials, participantToUser, setSelectedChat]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search Chat"
            className="w-full pl-8 pr-3 py-1.5 bg-gray-100 rounded text-[11px] text-gray-900 placeholder-gray-400 outline-none focus:ring-1 focus:ring-blue-500"
          />
          <svg
            className="absolute left-2.5 top-2 w-3 h-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mt-2">
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-[11px] hover:bg-gray-200 transition-colors"
            >
              <span>
                {currentFilter === "all"
                  ? "All"
                  : currentFilter === "open"
                    ? "Open"
                    : "Closed"}
              </span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {filterOpen && (
              <div className="absolute left-0 z-10 w-24 mt-1 bg-white border border-gray-200 rounded shadow-lg top-full">
                <button
                  onClick={() => handleFilter("all")}
                  className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 transition-colors"
                >
                  All
                </button>
                <button
                  onClick={() => handleFilter("open")}
                  className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 transition-colors"
                >
                  Open
                </button>
                <button
                  onClick={() => handleFilter("closed")}
                  className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 transition-colors"
                >
                  Closed
                </button>
              </div>
            )}
          </div>
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-[11px] hover:bg-gray-200 transition-colors"
            >
              <span>
                {currentSort === "newest"
                  ? "Newest"
                  : currentSort === "oldest"
                    ? "Oldest"
                    : "Unread"}
              </span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {sortOpen && (
              <div className="absolute right-0 z-10 w-24 mt-1 bg-white border border-gray-200 rounded shadow-lg top-full">
                <button
                  onClick={() => handleSort("newest")}
                  className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 transition-colors"
                >
                  Newest
                </button>
                <button
                  onClick={() => handleSort("oldest")}
                  className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 transition-colors"
                >
                  Oldest
                </button>
                <button
                  onClick={() => handleSort("unread")}
                  className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 transition-colors"
                >
                  Unread
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredChats.map((chat: ChatItem) => {
          const isActive = selectedChat?.id === chat.id;

          const otherParticipant = chat.participants?.find(
            (participant: Participant) => participant.id !== user?.id,
          );

          const initials = getInitials(chat.name);
          const avatarColor = getAvatarColor(chat.name);

          return (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`flex items-center gap-2 p-3 cursor-pointer border-b border-gray-100 transition-colors ${
                isActive ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white text-[11px] font-medium shrink-0 overflow-hidden`}
              >
                {otherParticipant?.avatar ? (
                  <Image
                    src={otherParticipant.avatar}
                    alt={chat.name}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/default-avatar.png";
                    }}
                  />
                ) : (
                  <span className="text-[11px]">{initials}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-medium text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-[9px] text-gray-500 ml-1 shrink-0">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">
                  {chat.lastMessage?.content || ""}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="flex items-center justify-center shrink-0 w-4 h-4 ml-1 bg-blue-600 rounded-full">
                  <span className="text-[8px] text-white">
                    {chat.unreadCount}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};