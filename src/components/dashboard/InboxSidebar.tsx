// File: src/components/dashboard/InboxSidebar.tsx
"use client";

import { useChat } from "@/context/ChatContext";
import { channels, stats, teamMembers } from "@/data/dummyData";
import React, { useState, useCallback } from "react";

// Define types for better type safety
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = true,
  badge,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <svg
            className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-[11px] font-medium text-gray-600 uppercase tracking-wider">
            {title}
          </span>
        </div>
        {badge !== undefined && (
          <span className="text-[10px] text-gray-500">{badge}</span>
        )}
      </button>
      {isOpen && <div className="mt-1 space-y-0.5">{children}</div>}
    </div>
  );
};

// Color mapping to avoid inline styles
const getChannelColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    "#10B981": "bg-emerald-500",
    "#F59E0B": "bg-amber-500",
    "#8B5CF6": "bg-purple-500",
    "#EC4899": "bg-pink-500",
  };
  return colorMap[color] || "bg-gray-500";
};

export const InboxSidebar: React.FC = () => {
  const { filteredChats, setFilterType, setSelectedChat } = useChat();
  const [selected, setSelected] = useState("All");

  const handleUserSelect = (userName: string) => {
    setSelected(userName);
    const chat = filteredChats.find((c) => c.name === userName);
    if (chat) {
      setSelectedChat(chat);
    }
  };

  // FIXED: Use useCallback to create a stable reference to the event handler
  // This tells React and the linter that this function is memoized and stable
  const handleChannelClick = useCallback(
    (channelName: string) => {
      setSelected(channelName);

      // Use setTimeout to defer the impure operations
      // This moves them completely out of the event handler's synchronous execution
      // and into a macrotask, which definitely doesn't run during render
      setTimeout(() => {
        // Try to find existing channel chat
        const existingChat = filteredChats.find(
          (c) => c.name === channelName || c.name.includes(channelName),
        );

        if (existingChat) {
          setSelectedChat(existingChat);
          return;
        }

        // Generate unique identifiers - now in a setTimeout callback
        // This is guaranteed to not run during render
        const timestamp = Date.now();
        const uniqueSuffix = Math.random().toString(36).substring(2, 7);

        // Create messages
        const messages = [
          {
            id: `channel-${channelName}-${timestamp}-1-${uniqueSuffix}`,
            chatId: `channel-${channelName}-${timestamp}-${uniqueSuffix}`,
            senderId: "system",
            senderName: "System",
            content: `Welcome to the ${channelName} channel!`,
            timestamp: new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: "system" as const,
            status: "read" as const,
            isUser: false,
          },
          {
            id: `channel-${channelName}-${timestamp}-2-${uniqueSuffix}`,
            chatId: `channel-${channelName}-${timestamp}-${uniqueSuffix}`,
            senderId: "announcement",
            senderName: "Announcements",
            content: `This channel has ${channelName === "Fit4Life" ? "3" : channelName === "Fit4Life Support" ? "2" : channelName === "Premium Members" ? "5" : "1"} new messages`,
            timestamp: new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: "text" as const,
            status: "read" as const,
            isUser: false,
          },
        ];

        const chatId = `channel-${channelName}-${timestamp}-${uniqueSuffix}`;
        const lastMessageId = `last-${channelName}-${timestamp}-${uniqueSuffix}`;

        const newChat = {
          id: chatId,
          name: channelName,
          participants: [],
          lastMessage: {
            id: lastMessageId,
            chatId: chatId,
            senderId: "system",
            senderName: "System",
            content: `Welcome to ${channelName}`,
            timestamp: "now",
            type: "system",
            status: "read",
            isUser: false,
          },
          timestamp: "now",
          unreadCount:
            channels.find((c) => c.name === channelName)?.unread || 0,
          initials: channelName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase(),
          messages: messages,
          isGroup: true,
          createdAt: new Date(timestamp).toISOString(),
          updatedAt: new Date(timestamp).toISOString(),
        };

        setSelectedChat(newChat);
      }, 0);
    },
    [filteredChats, setSelectedChat],
  ); // Add dependencies

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="flex-1 px-3 py-3 overflow-y-auto scrollbar-thin">
        {/* Inbox Title */}
        <h2 className="text-[13px] font-semibold text-gray-900 mb-3">Inbox</h2>

        {/* My Inbox Section */}
        <CollapsibleSection title="My Inbox">
          <div
            onClick={() => {
              setSelected("All");
              setFilterType("all");
            }}
            className={`flex items-center justify-between py-1.5 px-3 rounded cursor-pointer ${
              selected === "All" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <span className="text-[11px] text-gray-700">All</span>
            <span className="text-[10px] text-gray-500">{stats.all}</span>
          </div>
          <div
            onClick={() => {
              setSelected("Unassigned");
              setFilterType("unread");
            }}
            className={`flex items-center justify-between py-1.5 px-3 rounded cursor-pointer ${
              selected === "Unassigned" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <span className="text-[11px] text-gray-700">Unassigned</span>
            <span className="text-[10px] text-red-500 font-medium">
              {stats.unassigned}
            </span>
          </div>
        </CollapsibleSection>

        {/* Teams Section */}
        <CollapsibleSection title="Teams">
          <div className="flex items-center justify-between py-1.5 px-3">
            <span className="text-[11px] text-gray-700">Sales</span>
            <span className="text-[10px] text-gray-500">{stats.sales}</span>
          </div>
          <div className="flex items-center justify-between py-1.5 px-3">
            <span className="text-[11px] text-gray-700">Customer Support</span>
            <span className="text-[10px] text-gray-500">
              {stats.customerSupport}
            </span>
          </div>
        </CollapsibleSection>

        {/* Users Section */}
        <CollapsibleSection title="Users" badge={teamMembers.length}>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => handleUserSelect(member.name)}
              className={`flex items-center justify-between py-1.5 px-3 rounded cursor-pointer ${
                selected === member.name ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[9px] font-medium">
                    {member.initials}
                  </div>
                  {member.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full border border-white"></span>
                  )}
                </div>
                <span className="text-[11px] text-gray-700">{member.name}</span>
              </div>
              {member.unreadCount > 0 && (
                <span className="text-[10px] text-gray-500">
                  {member.unreadCount}
                </span>
              )}
            </div>
          ))}
        </CollapsibleSection>

        {/* Channels Section */}
        <CollapsibleSection title="Channels" badge={channels.length}>
          {channels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => handleChannelClick(channel.name)}
              className={`flex items-center justify-between py-1.5 px-3 rounded cursor-pointer ${
                selected === channel.name ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-medium ${getChannelColorClass(channel.color)}`}
                >
                  {channel.name[0]}
                </div>
                <span className="text-[11px] text-gray-700">
                  {channel.name}
                </span>
              </div>
              {channel.unread > 0 && (
                <span className="text-[10px] text-gray-500">
                  {channel.unread}
                </span>
              )}
            </div>
          ))}
        </CollapsibleSection>
      </div>
    </div>
  );
};
