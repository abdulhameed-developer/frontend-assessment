// File: src/components/dashboard/UsersColumn.tsx
"use client";

import React, { useState } from "react";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";

export const UsersColumn: React.FC = () => {
  const { user } = useAuth();
  const {
    chats,
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
  const [usersCollapsed, setUsersCollapsed] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    searchChats(e.target.value);
  };

  const handleFilter = (filter: "open" | "closed" | "all") => {
    setCurrentFilter(filter);
    filterChats(filter);
    setFilterOpen(false);
  };

  const handleSort = (sort: "newest" | "oldest" | "unread") => {
    setCurrentSort(sort);
    sortChats(sort);
    setSortOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="w-full h-full bg-white bg-opacity-70 flex flex-col overflow-hidden rounded-tr-[8.42px] rounded-br-[8.42px]">
      {/* Top Header Row */}
      <div className="flex-shrink-0 w-full h-[42.11px] py-[5.61px] px-[11.23px] border-b-[0.7px] border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-[8.42px] min-w-0">
          {/* Collapse/Expand Icon Container */}
          <button
            onClick={() => setUsersCollapsed(!usersCollapsed)}
            className="w-[22.46px] h-[22.46px] p-[4.21px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <div className="w-[14.04px] h-[14.04px] relative">
              <svg
                width="10.53"
                height="10.53"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-[1.75px] left-[1.75px] transition-transform ${usersCollapsed ? "" : "rotate-90"}`}
              >
                <path
                  d="M2 2L6 6L2 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          {/* Username */}
          <span className="font-sf-compact-bold text-[12.63px] text-[#000000] truncate">
            {user?.firstName} {user?.lastName}
          </span>
        </div>

        {/* Edit/Pen Icon Container */}
        <button
          onClick={() => {
            document.dispatchEvent(new CustomEvent("openProfileEdit"));
          }}
          className="w-[22.46px] h-[22.46px] p-[4.21px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors group flex-shrink-0"
        >
          <div className="w-[14.04px] h-[14.04px] relative">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 text-gray-600 transition-colors group-hover:text-blue-600"
            >
              <path
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Search Bar Row - Hidden when collapsed */}
      {!usersCollapsed && (
        <>
          <div className="flex-shrink-0 w-full h-[75.09px] pt-[5.61px] px-[8.42px] pb-[5.61px]">
            <div className="w-full h-[42.11px] py-[5.61px] px-[8.42px] flex items-center gap-[8.42px]">
              {/* Search Input Container */}
              <div className="flex-1 min-w-0 h-[14.04px] flex items-center gap-[8.42px] px-[8.42px]">
                {/* Search Icon */}
                <div className="w-[14.04px] h-[14.04px] relative flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 text-gray-500"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16 16L21 21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="w-full font-sf-compact-medium text-[9.82px] text-gray-900 placeholder-gray-400 bg-transparent outline-none"
                />
              </div>

              {/* Filter Icon Container */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="w-[22.46px] h-[22.46px] p-[4.21px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="w-[14.04px] h-[14.04px] relative">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 left-0 text-gray-600 transition-colors group-hover:text-blue-600"
                    >
                      <path
                        d="M3 4H21M6 12H18M10 20H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Filter Dropdown */}
                {filterOpen && (
                  <div className="absolute left-0 z-10 w-32 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                    <button
                      onClick={() => handleFilter("all")}
                      className={`w-full text-left px-4 py-2 font-sf-compact-medium text-[9.82px] hover:bg-gray-50 ${
                        currentFilter === "all"
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleFilter("open")}
                      className={`w-full text-left px-4 py-2 font-sf-compact-medium text-[9.82px] hover:bg-gray-50 ${
                        currentFilter === "open"
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleFilter("closed")}
                      className={`w-full text-left px-4 py-2 font-sf-compact-medium text-[9.82px] hover:bg-gray-50 ${
                        currentFilter === "closed"
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                    >
                      Closed
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Open & Newest Row */}
          <div className="flex-shrink-0 w-full h-[32.98px] py-[5.61px] px-[11.23px] flex items-center justify-between border-b-[0.7px] border-gray-200">
            {/* Open Button */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-[8.42px] hover:bg-gray-50"
              >
                <span className="font-sf-compact-semibold text-[9.82px] text-[#000000]">
                  {currentSort === "newest"
                    ? "Newest"
                    : currentSort === "oldest"
                      ? "Oldest"
                      : "Unread"}
                </span>
                <div className="w-[14.04px] h-[14.04px] relative ml-1">
                  <svg
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[4.87px] left-0"
                  >
                    <path
                      d="M1 1L4 4L7 1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* Sort Dropdown */}
              {sortOpen && (
                <div className="absolute left-0 z-10 w-32 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                  <button
                    onClick={() => handleSort("newest")}
                    className={`w-full text-left px-4 py-2 font-sf-compact-medium text-[9.82px] hover:bg-gray-50 ${
                      currentSort === "newest" ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => handleSort("oldest")}
                    className={`w-full text-left px-4 py-2 font-sf-compact-medium text-[9.82px] hover:bg-gray-50 ${
                      currentSort === "oldest" ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    Oldest
                  </button>
                  <button
                    onClick={() => handleSort("unread")}
                    className={`w-full text-left px-4 py-2 font-sf-compact-medium text-[9.82px] hover:bg-gray-50 ${
                      currentSort === "unread" ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    Unread
                  </button>
                </div>
              )}
            </div>

            {/* Newest Button */}
            <button
              onClick={() => handleSort("newest")}
              className="flex items-center gap-1 px-2 py-1 rounded-[8.42px] hover:bg-gray-50"
            >
              <span className="font-sf-compact-semibold text-[9.82px] text-[#000000]">
                Newest
              </span>
              <div className="w-[14.04px] h-[14.04px] relative ml-1">
                <svg
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[4.87px] left-0"
                >
                  <path
                    d="M1 1L4 4L7 1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Users Chats List */}
          <div className="flex-1 w-full min-h-0 overflow-y-auto hide-scrollbar">
            <div className="py-[5.61px] px-[8.42px] space-y-[2.81px]">
              {chats.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-500 font-sf-compact-regular text-[9.82px]">
                  No chats found
                </div>
              ) : (
                chats.map((chat) => {
                  const isActive = selectedChat?.id === chat.id;
                  const otherParticipant = chat.participants.find(
                    (p) => p.id !== user?.id,
                  );
                  const initials = getInitials(chat.name);

                  return (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full rounded-[5.61px] py-[5.61px] px-[8.42px] cursor-pointer transition-all ${
                        isActive
                          ? "bg-white border-[0.7px] border-gray-200 shadow-[0px_2.81px_8.42px_0px_rgba(0,0,0,0.06)]"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-[5.61px]">
                        {/* User DP Container */}
                        <div className="w-[19.65px] h-[19.65px] rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 overflow-hidden">
                          {otherParticipant?.avatar ? (
                            <img
                              src={otherParticipant.avatar}
                              alt={chat.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="font-sf-compact-medium text-[9.82px] text-center text-white">
                              {initials}
                            </span>
                          )}
                        </div>

                        {/* User Content Container */}
                        <div className="flex-1 min-w-0">
                          {/* Username and Time Row */}
                          <div className="flex items-center justify-between">
                            <span className="font-sf-compact-medium text-[9.82px] text-[#000000] truncate pr-2">
                              {chat.name}
                            </span>
                            <span className="font-sf-compact-medium text-[7.72px] text-[#000000CC] flex-shrink-0">
                              {chat.timestamp}
                            </span>
                          </div>

                          {/* Last Message */}
                          <p className="font-sf-compact-regular text-[9.82px] text-[#00000080] truncate">
                            {chat.lastMessage.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
