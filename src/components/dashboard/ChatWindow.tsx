// File: src/components/dashboard/ChatWindow.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";

export const ChatWindow: React.FC = () => {
  const { selectedChat, messages, sendMessage } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && selectedChat) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages, selectedChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-white">
      {!selectedChat ? (
        /* Empty State - No Chat Selected */
        <div className="flex items-center justify-center w-full h-full">
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
            <h3 className="text-base font-medium text-gray-700">
              Select a chat
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose a conversation to start messaging
            </p>
          </div>
        </div>
      ) : (
        /* Chat Selected - Show Messages */
        <>
          {/* Chat Header */}
          <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 overflow-hidden font-semibold text-white bg-blue-500 rounded-full">
                  {selectedChat.avatar ? (
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    selectedChat.initials
                  )}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-gray-900 truncate">
                  {selectedChat.name}
                </h2>
                <p className="text-xs text-gray-500 truncate">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto hide-scrollbar">
            {messages.map((message, index) => {
              const isUser = message.senderId === user?.id;

              return (
                <div
                  key={message.id}
                  className={`flex gap-2 ${isUser ? "justify-end" : ""}`}
                >
                  {!isUser && (
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 overflow-hidden text-xs font-semibold text-white bg-blue-500 rounded-full">
                      {selectedChat.initials}
                    </div>
                  )}
                  <div className={`max-w-[70%] ${isUser ? "items-end" : ""}`}>
                    <div
                      className={`p-2 rounded-lg text-sm break-words ${
                        isUser
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs text-gray-400 ${isUser ? "justify-end" : ""}`}
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
          <div className="flex-shrink-0 p-3 bg-white border-t border-gray-200">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="flex-shrink-0 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
