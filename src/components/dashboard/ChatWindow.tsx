// File: src/components/dashboard/ChatWindow.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const ChatWindow: React.FC = () => {
  const { selectedChat, messages, sendMessage } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleBack = () => {
    // On mobile, go back to chats list
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      // Use history or state management to go back
      window.history.back();
    }
  };

  if (!selectedChat) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-700">Select a chat</h3>
          <p className="text-sm text-gray-500 mt-1">Choose a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  const otherParticipant = selectedChat.participants.find(p => p.id !== user?.id);

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Chat Header - With Back Button on Mobile */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          {/* Back Button - Mobile Only */}
          <button 
            onClick={handleBack}
            className="lg:hidden p-1 -ml-1 mr-1"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold overflow-hidden">
              {otherParticipant?.avatar ? (
                <img src={otherParticipant.avatar} alt={selectedChat.name} className="w-full h-full object-cover" />
              ) : (
                selectedChat.initials
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-gray-900 truncate">{selectedChat.name}</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {messages.map((message, index) => {
          const isUser = message.senderId === user?.id;
          const showDate = index === 0 || 
            new Date(message.timestamp).getDate() !== new Date(messages[index - 1].timestamp).getDate();

          return (
            <React.Fragment key={message.id}>
              {showDate && (
                <div className="flex justify-center my-4">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                    {new Date(message.timestamp).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
              
              <div className={`flex gap-2 ${isUser ? 'justify-end' : ''}`}>
                {!isUser && (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 overflow-hidden">
                    {selectedChat.initials}
                  </div>
                )}
                <div className={`max-w-[70%] ${isUser ? 'items-end' : ''}`}>
                  <div className={`p-2 rounded-lg text-sm break-words ${
                    isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.content}
                  </div>
                  <div className={`flex items-center gap-1 mt-1 text-xs text-gray-400 ${isUser ? 'justify-end' : ''}`}>
                    <span>{message.timestamp}</span>
                    {isUser && message.status === 'sent' && <span>✓</span>}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 flex-shrink-0"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};