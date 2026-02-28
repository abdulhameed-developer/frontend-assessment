// File: src/components/dashboard/UsersColumn.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';

export const UsersColumn: React.FC = () => {
  const { user } = useAuth();
  const { chats, selectedChat, setSelectedChat, searchChats, filterChats, sortChats } = useChat();
  const [searchInput, setSearchInput] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [currentSort, setCurrentSort] = useState<'newest' | 'oldest' | 'unread'>('newest');
  
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    searchChats(e.target.value);
  };

  const handleFilter = (filter: 'open' | 'closed' | 'all') => {
    setCurrentFilter(filter);
    filterChats(filter);
    setFilterOpen(false);
  };

  const handleSort = (sort: 'newest' | 'oldest' | 'unread') => {
    setCurrentSort(sort);
    sortChats(sort);
    setSortOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 
      'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden">
      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search Chat"
            className="w-full pl-8 pr-3 py-1.5 bg-gray-100 rounded text-[11px] text-gray-900 placeholder-gray-400 outline-none"
          />
          <svg className="absolute left-2.5 top-2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mt-2">
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-[11px] hover:bg-gray-200"
            >
              <span>{currentFilter === 'all' ? 'All' : currentFilter === 'open' ? 'Open' : 'Closed'}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {filterOpen && (
              <div className="absolute top-full left-0 mt-1 w-24 bg-white rounded shadow-lg border border-gray-200 z-10">
                <button onClick={() => handleFilter('all')} className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50">All</button>
                <button onClick={() => handleFilter('open')} className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50">Open</button>
                <button onClick={() => handleFilter('closed')} className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50">Closed</button>
              </div>
            )}
          </div>
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-[11px] hover:bg-gray-200"
            >
              <span>{currentSort === 'newest' ? 'Newest' : currentSort === 'oldest' ? 'Oldest' : 'Unread'}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {sortOpen && (
              <div className="absolute top-full right-0 mt-1 w-24 bg-white rounded shadow-lg border border-gray-200 z-10">
                <button onClick={() => handleSort('newest')} className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50">Newest</button>
                <button onClick={() => handleSort('oldest')} className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50">Oldest</button>
                <button onClick={() => handleSort('unread')} className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50">Unread</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {chats.map((chat) => {
          const isActive = selectedChat?.id === chat.id;
          const otherParticipant = chat.participants.find(p => p.id !== user?.id);
          const initials = getInitials(chat.name);
          const avatarColor = getAvatarColor(chat.name);

          return (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center gap-2 p-3 cursor-pointer border-b border-gray-100 transition-colors ${
                isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0`}>
                {otherParticipant?.avatar ? (
                  <img src={otherParticipant.avatar} alt={chat.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-medium text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-[9px] text-gray-500 ml-1">{chat.timestamp}</span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">{chat.lastMessage.content}</p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center ml-1">
                  <span className="text-[8px] text-white">{chat.unreadCount}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};