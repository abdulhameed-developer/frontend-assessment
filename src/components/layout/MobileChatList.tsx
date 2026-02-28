// File: src/components/layout/MobileChatList.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { channels } from "@/data/dummyData";
import { User } from "@/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

// Define interfaces for proper typing
interface Participant extends Partial<User> {
  id: string;
  status?: "online" | "offline" | "away";
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
  isGroup?: boolean;
}

interface Channel {
  id: string;
  name: string;
  color: string;
  unread: number;
}

export const MobileChatList: React.FC = () => {
  const { user } = useAuth();
  const { chats, setSelectedChat } = useChat();
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "channels">("all");
  const [filteredChats, setFilteredChats] = useState<ChatItem[]>(
    chats as ChatItem[],
  );
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>(channels);

  // FIXED: Generate unique ID helper - moved outside render to avoid impure function warnings
  const generateChannelIds = useCallback((channelName: string) => {
    const timestamp = Date.now();
    const uniqueSuffix = Math.random().toString(36).substring(2, 7);
    return {
      chatId: `channel-${channelName}-${timestamp}-${uniqueSuffix}`,
      message1Id: `channel-${channelName}-${timestamp}-1-${uniqueSuffix}`,
      message2Id: `channel-${channelName}-${timestamp}-2-${uniqueSuffix}`,
      lastMessageId: `last-${channelName}-${timestamp}-${uniqueSuffix}`,
    };
  }, []);

  // Filter chats based on search input
  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredChats(chats as ChatItem[]);
      setFilteredChannels(channels);
    } else {
      // Filter chats
      const chatResults = (chats as ChatItem[]).filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          chat.lastMessage.content
            .toLowerCase()
            .includes(searchInput.toLowerCase()),
      );
      setFilteredChats(chatResults);

      // Filter channels
      const channelResults = channels.filter((channel) =>
        channel.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setFilteredChannels(channelResults);
    }
  }, [searchInput, chats]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    setSearchInput("");
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // FIXED: Color mapping to avoid inline styles
  const getChannelColorClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      "#10B981": "bg-emerald-500",
      "#F59E0B": "bg-amber-500",
      "#8B5CF6": "bg-purple-500",
      "#EC4899": "bg-pink-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  const getAvatarColor = (name: string): string => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // FIXED: Channel selection with proper ID generation (no impure functions in render)
  const handleChannelSelect = (
    channelName: string,
    channelColor: string,
    unreadCount: number,
  ) => {
    // Generate IDs using the helper - this runs in event handler, not render
    const ids = generateChannelIds(channelName);

    // Try to find existing channel chat
    let chat = (chats as ChatItem[]).find(
      (c) => c.name === channelName || c.name.includes(channelName),
    );

    // If no channel chat exists, create a proper channel chat
    if (!chat) {
      // Create channel-specific messages with generated IDs
      const channelMessages = [
        {
          id: ids.message1Id,
          chatId: ids.chatId,
          senderId: "system",
          senderName: "System",
          content: `Welcome to the ${channelName} channel!`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "system" as const,
          status: "read" as const,
          isUser: false,
        },
        {
          id: ids.message2Id,
          chatId: ids.chatId,
          senderId: "announcement",
          senderName: "Announcements",
          content: `This channel has ${unreadCount} new messages`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text" as const,
          status: "read" as const,
          isUser: false,
        },
      ];

      chat = {
        id: ids.chatId,
        name: channelName,
        participants: [], // Channels don't have individual participants
        lastMessage: {
          id: ids.lastMessageId,
          chatId: ids.chatId,
          senderId: "system",
          senderName: "System",
          content: `Welcome to ${channelName}`,
          timestamp: "now",
          type: "system",
          status: "read",
          isUser: false,
        },
        timestamp: "now",
        unreadCount: unreadCount,
        initials: channelName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase(),
        messages: channelMessages,
        isGroup: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    if (chat) {
      setSelectedChat(chat);
    }
  };

  return (
    <div className="w-full h-full bg-white">
      {/* Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <h1 className="text-xl font-semibold">Chats</h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearch}
              placeholder="Search chats or channels..."
              className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="Search chats or channels"
            />
            <svg
              className="absolute w-4 h-4 text-gray-400 left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchInput && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-3"
                aria-label="Clear search"
              >
                <svg
                  className="w-4 h-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-3 text-sm font-medium relative ${
              activeTab === "all" ? "text-blue-600" : "text-gray-500"
            }`}
            aria-label="All Chats"
            aria-current={activeTab === "all" ? "page" : undefined}
          >
            All Chats
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("channels")}
            className={`flex-1 py-3 text-sm font-medium relative ${
              activeTab === "channels" ? "text-blue-600" : "text-gray-500"
            }`}
            aria-label="Channels"
            aria-current={activeTab === "channels" ? "page" : undefined}
          >
            Channels
            {activeTab === "channels" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>

        {/* Search Results Count */}
        {searchInput && (
          <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500">
              {`Found ${
                activeTab === "all"
                  ? filteredChats.length
                  : filteredChannels.length
              } results`}
            </p>
          </div>
        )}
      </div>

      {/* Chat List - Scrollable with padding for fixed header */}
      <div className="min-h-screen pt-32 pb-24">
        {activeTab === "all" ? (
          // All Chats View
          filteredChats.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredChats.map((chat: ChatItem) => {
                // FIXED: Properly typed participant
                const otherParticipant = chat.participants?.find(
                  (participant: Participant) => participant.id !== user?.id,
                );
                const initials = getInitials(chat.name);
                const avatarColor = getAvatarColor(chat.name);

                return (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className="flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer active:bg-gray-50"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden`}
                    >
                      {otherParticipant?.avatar ? (
                        // FIXED: Replaced img with Next.js Image
                        <Image
                          src={otherParticipant.avatar}
                          alt={chat.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">
                          {chat.name}
                        </h3>
                        <span className="flex-shrink-0 ml-2 text-xs text-gray-500">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {chat.lastMessage.content}
                      </p>
                    </div>
                    {chat.unreadCount > 0 && (
                      <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 ml-2 bg-blue-600 rounded-full">
                        <span className="text-xs text-white">
                          {chat.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 px-4">
              <svg
                className="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-center text-gray-500">
                {`No chats found matching "${searchInput}"`}
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 text-sm font-medium text-blue-600"
                aria-label="Clear search"
              >
                Clear search
              </button>
            </div>
          )
        ) : // Channels View - FIXED: Now opens correct channel chat
        filteredChannels.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredChannels.map((channel: Channel) => (
              <div
                key={channel.id}
                onClick={() =>
                  handleChannelSelect(
                    channel.name,
                    channel.color,
                    channel.unread,
                  )
                }
                className="flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer active:bg-gray-50"
              >
                {/* FIXED: Replaced inline style with className */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white ${getChannelColorClass(channel.color)}`}
                >
                  {channel.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {channel.name}
                    </h3>
                    <span className="flex-shrink-0 ml-2 text-xs text-gray-500">
                      {channel.unread} new
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">
                    {channel.unread > 0
                      ? `${channel.unread} unread message${channel.unread > 1 ? "s" : ""} in this channel`
                      : "No unread messages"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 px-4">
            <svg
              className="w-16 h-16 mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p className="text-center text-gray-500">
              {`No channels found matching "${searchInput}"`}
            </p>
            <button
              onClick={clearSearch}
              className="mt-4 text-sm font-medium text-blue-600"
              aria-label="Clear search"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
