// File: src/components/dashboard/ChatWindow.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ChatWindowProps {
  onBack?: () => void;
}

// Define Participant interface
interface Participant {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  status?: "online" | "offline" | "away";
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onBack }) => {
  const { selectedChat, messages, sendMessage } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleBack = () => {
    if (onBack) {
      onBack(); // This will set mobileView back to 'chats'
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-white">
        <div className="px-4 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h3 className="text-sm font-medium text-gray-700">Select a chat</h3>
          <p className="mt-1 text-xs text-gray-500">
            Choose a conversation to start messaging
          </p>
        </div>
      </div>
    );
  }

  // FIXED: Properly typed participant parameter
  const otherParticipant = selectedChat.participants.find(
    (participant: Participant): boolean => participant.id !== user?.id,
  );

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-white">
      {/* Chat Header */}
      <div className="flex-shrink-0 px-3 py-2 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          {/* Back Button - Only on mobile */}
          <button
            onClick={handleBack}
            className="p-1 mr-1 -ml-1 transition-colors rounded-full lg:hidden hover:bg-gray-100"
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="relative flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 overflow-hidden text-xs font-semibold text-white bg-blue-500 rounded-full">
              {otherParticipant?.avatar ? (
                <Image
                  src={otherParticipant.avatar}
                  alt={selectedChat.name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                selectedChat.initials
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xs font-semibold text-gray-900 truncate">
              {selectedChat.name}
            </h2>
            <p className="text-[10px] text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-thin">
        {messages.map((message) => {
          const isUser = message.senderId === user?.id;

          return (
            <div
              key={message.id}
              className={`flex gap-2 ${isUser ? "justify-end" : ""}`}
            >
              {!isUser && (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[9px] font-semibold flex-shrink-0 overflow-hidden">
                  {selectedChat.initials}
                </div>
              )}
              <div className={`max-w-[70%] ${isUser ? "items-end" : ""}`}>
                <div
                  className={`p-2 rounded-lg text-xs break-words ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
                <div
                  className={`flex items-center gap-1 mt-1 text-[9px] text-gray-400 ${isUser ? "justify-end" : ""}`}
                >
                  <span>{message.timestamp}</span>
                  {isUser && message.status === "sent" && <span>✓</span>}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 p-2 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-900 placeholder-gray-400 outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 disabled:opacity-50 flex-shrink-0"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
