// File: src/components/dashboard/InboxSidebar.tsx
"use client";

import React, { useState } from "react";
import { useChat } from "@/context/ChatContext";
import { teamMembers, stats, channels } from "@/data/dummyData";

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
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 transition-colors rounded-lg hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-[3.85px] h-[6.54px] text-[#000000] transition-transform ${isOpen ? "rotate-90" : ""}`}
            viewBox="0 0 4 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 0.5L3.5 3.5L0.5 6.5"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-sf-compact-channel text-[#000000]">
            {title}
          </span>
        </div>
        {badge !== undefined && (
          <span className="font-sf-compact-number text-[#222222]">{badge}</span>
        )}
      </button>
      {isOpen && <div className="mt-1 space-y-0.5">{children}</div>}
    </div>
  );
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

  const handleChannelSelect = (channelName: string) => {
    setSelected(channelName);

    let chat = filteredChats.find(
      (c) => c.name.includes(channelName) || c.name === channelName,
    );

    if (!chat && filteredChats.length > 0) {
      chat = {
        ...filteredChats[0],
        id: `channel-${Date.now()}`,
        name: channelName,
        initials: channelName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase(),
        isGroup: true,
      };
    }

    if (chat) {
      setSelectedChat(chat);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden bg-white">
      <div className="h-full p-3 overflow-y-auto hide-scrollbar">
        {/* Inbox Title */}
        <h2 className="font-sf-compact-bold text-[#000000] mb-4">Inbox</h2>

        {/* My Inbox Section */}
        <CollapsibleSection title="My Inbox" badge={stats.all}>
          <div
            onClick={() => {
              setSelected("All");
              setFilterType("all");
            }}
            className={`flex items-center justify-between py-1.5 px-3 rounded-lg cursor-pointer ${
              selected === "All" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <span className="font-sf-compact-regular text-[#000000]">All</span>
            <span className="font-sf-compact-number text-[#222222]">
              {stats.all}
            </span>
          </div>
          <div
            onClick={() => {
              setSelected("Unassigned");
              setFilterType("unread");
            }}
            className={`flex items-center justify-between py-1.5 px-3 rounded-lg cursor-pointer ${
              selected === "Unassigned" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <span className="font-sf-compact-regular text-[#000000]">
              Unassigned
            </span>
            <span className="text-red-500 font-sf-compact-number">
              {stats.unassigned}
            </span>
          </div>
        </CollapsibleSection>

        {/* Teams Section */}
        <CollapsibleSection title="Teams">
          <div
            onClick={() => {
              setSelected("Sales");
              setFilterType("all");
            }}
            className={`flex items-center justify-between py-1.5 px-3 rounded-lg cursor-pointer ${
              selected === "Sales" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <span className="font-sf-compact-regular text-[#000000]">
              Sales
            </span>
            <span className="font-sf-compact-number text-[#222222]">
              {stats.sales}
            </span>
          </div>
          <div
            onClick={() => {
              setSelected("Customer Support");
              setFilterType("all");
            }}
            className={`flex items-center justify-between py-1.5 px-3 rounded-lg cursor-pointer ${
              selected === "Customer Support"
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            <span className="font-sf-compact-regular text-[#000000]">
              Customer Support
            </span>
            <span className="font-sf-compact-number text-[#222222]">
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
              className={`flex items-center justify-between py-1.5 px-3 rounded-lg cursor-pointer ${
                selected === member.name ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="flex items-center justify-center w-5 h-5 text-white bg-blue-500 rounded-full">
                    <span className="text-white font-sf-compact-number">
                      {member.initials}
                    </span>
                  </div>
                  {member.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full border border-white"></span>
                  )}
                </div>
                <span className="font-sf-compact-regular text-[#000000]">
                  {member.name}
                </span>
              </div>
              {member.unreadCount > 0 && (
                <span className="font-sf-compact-number text-[#222222]">
                  {member.unreadCount}
                </span>
              )}
            </div>
          ))}
        </CollapsibleSection>

        {/* Channels Section */}
        <CollapsibleSection title="Channels">
          {channels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => handleChannelSelect(channel.name)}
              className={`flex items-center gap-2 py-1.5 px-3 rounded-lg cursor-pointer ${
                selected === channel.name ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div
                className="w-[9.35px] h-[9.35px] rounded-full flex-shrink-0"
                style={{ backgroundColor: channel.color }}
              />
              <span className="flex-1 font-sf-compact-channel-text text-[#000000]">
                {channel.name}
              </span>
              {channel.unread > 0 && (
                <span className="font-sf-compact-number text-[#222222]">
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
