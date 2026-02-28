// File: src/components/dashboard/InboxSidebar.tsx
'use client';

import React, { useState } from 'react';
import { useChat } from '@/context/ChatContext';
import { teamMembers, stats, channels } from '@/data/dummyData';

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
  badge
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
            className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[11px] font-medium text-gray-600 uppercase tracking-wider">{title}</span>
        </div>
        {badge !== undefined && (
          <span className="text-[10px] text-gray-500">{badge}</span>
        )}
      </button>
      {isOpen && <div className="mt-1 space-y-0.5">{children}</div>}
    </div>
  );
};

export const InboxSidebar: React.FC = () => {
  const { filteredChats, setFilterType, setSelectedChat } = useChat();
  const [selected, setSelected] = useState('All');

  const handleUserSelect = (userName: string) => {
    setSelected(userName);
    const chat = filteredChats.find(c => c.name === userName);
    if (chat) {
      setSelectedChat(chat);
    }
  };

  const handleChannelSelect = (channelName: string) => {
    setSelected(channelName);
    const chat = filteredChats.find(c => c.name.includes(channelName));
    if (chat) {
      setSelectedChat(chat);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3">
        {/* Inbox Title */}
        <h2 className="text-[13px] font-semibold text-gray-900 mb-3">Inbox</h2>
        
        {/* My Inbox Section */}
        <CollapsibleSection title="My Inbox">
          <div 
            onClick={() => {
              setSelected('All');
              setFilterType('all');
            }}
            className={`flex items-center justify-between py-1.5 px-3 rounded cursor-pointer ${
              selected === 'All' ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <span className="text-[11px] text-gray-700">All</span>
            <span className="text-[10px] text-gray-500">{stats.all}</span>
          </div>
          <div 
            onClick={() => {
              setSelected('Unassigned');
              setFilterType('unread');
            }}
            className={`flex items-center justify-between py-1.5 px-3 rounded cursor-pointer ${
              selected === 'Unassigned' ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <span className="text-[11px] text-gray-700">Unassigned</span>
            <span className="text-[10px] text-red-500 font-medium">{stats.unassigned}</span>
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
            <span className="text-[10px] text-gray-500">{stats.customerSupport}</span>
          </div>
        </CollapsibleSection>

        {/* Users Section */}
        <CollapsibleSection title="Users" badge={teamMembers.length}>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => handleUserSelect(member.name)}
              className={`flex items-center justify-between py-1.5 px-3 rounded cursor-pointer ${
                selected === member.name ? 'bg-blue-50' : 'hover:bg-gray-50'
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
                <span className="text-[10px] text-gray-500">{member.unreadCount}</span>
              )}
            </div>
          ))}
        </CollapsibleSection>

        {/* Channels Section */}
        <CollapsibleSection title="Channels" badge={channels.length}>
          {channels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => handleChannelSelect(channel.name)}
              className={`flex items-center justify-between py-1.5 px-3 rounded cursor-pointer ${
                selected === channel.name ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-medium"
                  style={{ backgroundColor: channel.color }}
                >
                  {channel.name[0]}
                </div>
                <span className="text-[11px] text-gray-700">{channel.name}</span>
              </div>
              {channel.unread > 0 && (
                <span className="text-[10px] text-gray-500">{channel.unread}</span>
              )}
            </div>
          ))}
        </CollapsibleSection>
      </div>
    </div>
  );
};