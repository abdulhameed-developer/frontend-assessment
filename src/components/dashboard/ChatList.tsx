// File: src/components/dashboard/ChatList.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import React, { useMemo, useState } from "react";

export const ChatList: React.FC = () => {
  const {
    filteredChats,
    selectedChat,
    setSelectedChat,
    searchChats,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
  } = useChat();
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    searchChats(e.target.value);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const unreadCount = useMemo(() => {
    return filteredChats.reduce((acc, chat) => acc + chat.unreadCount, 0);
  }, [filteredChats]);

  return (
    <div className="w-[320px] h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-3">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute w-4 h-4 text-gray-400 left-3 top-3"
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

        {/* Filter Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterType === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({filteredChats.length})
            </button>
            <button
              onClick={() => setFilterType("unread")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterType === "unread"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilterType("groups")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterType === "groups"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Groups
            </button>
          </div>

          {/* Sort Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
            </button>

            {showFilters && (
              <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-2">
                  <button
                    onClick={() => {
                      setSortBy("recent");
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg ${
                      sortBy === "recent"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Recent
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("unread");
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg ${
                      sortBy === "unread"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Most Unread
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("alphabetical");
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg ${
                      sortBy === "alphabetical"
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Alphabetical
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <p className="text-sm">No chats found</p>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const isSelected = selectedChat?.id === chat.id;
            const otherParticipant = chat.participants.find(
              (p) => p.id !== user?.id,
            );
            const avatarColor = getAvatarColor(chat.name);

            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex gap-3 p-4 cursor-pointer border-b border-gray-100 transition-colors ${
                  isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold`}
                  >
                    {otherParticipant?.avatar ? (
                      <img
                        src={otherParticipant.avatar}
                        alt={chat.name}
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      getInitials(chat.name)
                    )}
                  </div>
                  {otherParticipant?.status === "online" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                  {chat.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center px-1">
                      {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.lastMessage.senderId === user?.id ? "You: " : ""}
                    {chat.lastMessage.content}
                  </p>
                  {chat.lastMessage.attachments && (
                    <div className="flex items-center gap-1 mt-1">
                      <svg
                        className="w-3 h-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      <span className="text-xs text-gray-400">Attachment</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Chat
        </button>
      </div>
    </div>
  );
};
