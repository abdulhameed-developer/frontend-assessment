// File: src/components/layout/MobileChatList.tsx
'use client';

import React, { useState } from 'react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { channels } from '@/data/dummyData';

export const MobileChatList: React.FC = () => {
  const { user } = useAuth();
  const { chats, setSelectedChat, searchChats } = useChat();
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'channels'>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    searchChats(e.target.value);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-green-500', 'bg-yellow-500', 'bg-red-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
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
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === 'all' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'
            }`}
          >
            All Chats
          </button>
          <button
            onClick={() => setActiveTab('channels')}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === 'channels' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'
            }`}
          >
            Channels
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="pt-32 pb-20">
        {activeTab === 'all' ? (
          // All Chats View
          <div className="divide-y divide-gray-100">
            {chats.map((chat) => {
              const otherParticipant = chat.participants.find(p => p.id !== user?.id);
              const initials = getInitials(chat.name);
              const avatarColor = getAvatarColor(chat.name);

              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className="flex items-center gap-3 px-4 py-3 active:bg-gray-50 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                    {otherParticipant?.avatar ? (
                      <img src={otherParticipant.avatar} alt={chat.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage.content}</p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{chat.unreadCount}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Channels View
          <div className="divide-y divide-gray-100">
            {channels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => {
                  // Handle channel selection
                  const channelChat = chats.find(c => c.name === channel.name) || {
                    ...chats[0],
                    id: `channel-${Date.now()}`,
                    name: channel.name,
                    initials: channel.name.substring(0, 2).toUpperCase(),
                  };
                  setSelectedChat(channelChat);
                }}
                className="flex items-center gap-3 px-4 py-3 active:bg-gray-50 cursor-pointer"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: channel.color }}
                >
                  {channel.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{channel.name}</h3>
                    <span className="text-xs text-gray-500">{channel.unread} new</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">Channel • {channel.unread} unread messages</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};