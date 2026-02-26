// File: src/components/dashboard/ChatList.tsx
"use client";

import React, { useEffect, useState } from "react";
// import Image from "next/image";
import { Comment } from "@/types/navigation.types";
import { fetchComments } from "@/services/api";
import { SkeletonBlock, SkeletonAvatar, SkeletonText } from "@/ui";

interface ChatListProps {
  onSelectChat?: (chat: Comment) => void;
}

// Generate consistent timestamps based on comment id
const getTimestamp = (id: number): string => {
  const hours = (id % 12) + 1;
  const minutes = (id * 3) % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

// Generate consistent avatar color based on name
const getAvatarColor = (name: string): string => {
  const colors = [
    "bg-[#2563EB]", // blue
    "bg-[#7C3AED]", // purple
    "bg-[#DB2777]", // pink
    "bg-[#DC2626]", // red
    "bg-[#EA580C]", // orange
    "bg-[#16A34A]", // green
    "bg-[#0D9488]", // teal
    "bg-[#4F46E5]", // indigo
  ];
  const index = name.length % colors.length;
  return colors[index];
};

// Get initials from name - max 2 letters, capitalized
const getInitials = (name: string): string => {
  // Split the name into words and filter out empty strings
  const words = name.split(" ").filter((word) => word.length > 0);

  if (words.length === 0) return "?";

  // If only one word, take first letter
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  // If more than 2 words, take first letter of first and last word
  if (words.length > 2) {
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  }

  // For 2 words, take first letter of each
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

export const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("Olivia Mckinsey");

  useEffect(() => {
    fetchComments().then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-[320px] border-r border-[#E5E7EB] bg-white">
        <div className="p-4 border-b border-[#E5E7EB]">
          <SkeletonBlock width="w-full" height="h-10" className="mb-3" />
          <div className="flex gap-3">
            <SkeletonBlock width="w-16" height="h-6" />
            <SkeletonBlock width="w-16" height="h-6" />
          </div>
        </div>
        <div className="p-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-3 p-3">
              <SkeletonAvatar size="w-10 h-10" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <SkeletonBlock width="w-24" height="h-4" />
                  <SkeletonBlock width="w-12" height="h-3" />
                </div>
                <SkeletonText lines={1} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[320px] border-r border-[#E5E7EB] bg-white">
      {/* Search */}
      <div className="p-4 border-b border-[#E5E7EB]">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search Chat"
            className="w-full pl-9 pr-4 py-2.5 bg-[#F9FAFB] rounded-[6px] text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
          />
          <svg
            className="absolute left-3 top-3 w-4 h-4 text-[#9CA3AF]"
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-[#111827]">Open</span>
            <svg
              className="w-4 h-4 text-[#6B7280]"
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
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-[#111827]">Newest</span>
            <svg
              className="w-4 h-4 text-[#6B7280]"
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
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Olivia Mckinsey - Active */}
        <div
          onClick={() => {
            setSelected("Olivia Mckinsey");
            onSelectChat?.(comments[0]);
          }}
          className={`flex gap-3 p-4 cursor-pointer border-b border-[#E5E7EB] ${
            selected === "Olivia Mckinsey"
              ? "bg-[#F3F4F6]"
              : "hover:bg-[#F9FAFB]"
          }`}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#2563EB] flex items-center justify-center text-white text-sm font-semibold">
            OM
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-[#111827]">
                Olivia Mckinsey
              </span>
              <span className="text-xs text-[#6B7280]">23:23</span>
            </div>
            <p className="text-xs text-[#6B7280] truncate">
              Oh my god 😭 I&apos;ll try it ASAP, thank...
            </p>
          </div>
        </div>

        {/* Other chats from API */}
        {comments.slice(1).map((comment) => {
          const avatarColor = getAvatarColor(comment.name);
          const initials = getInitials(comment.name);
          const timestamp = getTimestamp(comment.id);

          return (
            <div
              key={comment.id}
              onClick={() => {
                setSelected(comment.name);
                onSelectChat?.(comment);
              }}
              className={`flex gap-3 p-4 cursor-pointer border-b border-[#E5E7EB] ${
                selected === comment.name
                  ? "bg-[#F3F4F6]"
                  : "hover:bg-[#F9FAFB]"
              }`}
            >
              <div
                className={`relative w-10 h-10 rounded-full overflow-hidden shrink-0 ${avatarColor} flex items-center justify-center text-white text-sm font-semibold`}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#111827]">
                    {comment.name}
                  </span>
                  <span className="text-xs text-[#6B7280]">{timestamp}</span>
                </div>
                <p className="text-xs text-[#6B7280] truncate">
                  {comment.body.substring(0, 40)}...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
