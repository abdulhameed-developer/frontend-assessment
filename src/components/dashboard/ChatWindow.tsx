// File: src/components/dashboard/ChatWindow.tsx
"use client";

import React, { useState } from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isUser: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    sender: "Olivia Mckinsey",
    content:
      "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?",
    time: "23:08",
    isUser: false,
  },
  {
    id: 2,
    sender: "Michael",
    content:
      "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
    time: "23:08",
    isUser: true,
  },
  {
    id: 3,
    sender: "Olivia Mckinsey",
    content: "Yes, it's olivia.Mckinsey@gmail.com",
    time: "23:16",
    isUser: false,
  },
  {
    id: 4,
    sender: "Michael",
    content:
      "Thanks! Looks like your reset wasn't completed. I've sent a new link - please check your inbox.",
    time: "23:16",
    isUser: true,
  },
  {
    id: 5,
    sender: "Olivia Mckinsey",
    content: "Don't I'm logged in. Thanks!",
    time: "23:20",
    isUser: false,
  },
  {
    id: 6,
    sender: "Michael",
    content:
      'Perfect! Your plan is ready under "My Programs". Since you\'re starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👇 www.Fit4Life.com/Premium',
    time: "23:20",
    isUser: true,
  },
  {
    id: 7,
    sender: "Olivia Mckinsey",
    content: "Oh my god 😭 I'll try it ASAP, thank you so much!",
    time: "23:23",
    isUser: false,
  },
];

export const ChatWindow: React.FC = () => {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E5E7EB]">
        <h2 className="text-base font-semibold text-[#111827]">
          Olivia McKinsey
        </h2>
        <p className="text-xs text-[#6B7280]">28 August 2025</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isUser ? "flex-row-reverse" : ""}`}
          >
            {!message.isUser && (
              <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                OM
              </div>
            )}
            <div
              className={`flex flex-col ${message.isUser ? "items-end" : ""}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {!message.isUser && (
                  <span className="text-xs font-medium text-[#111827]">
                    {message.sender}
                  </span>
                )}
                <span className="text-xs text-[#6B7280]">{message.time}</span>
              </div>
              <div
                className={`max-w-[70%] p-3 rounded-[8px] text-sm ${
                  message.isUser
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#F3F4F6] text-[#111827]"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type something..."
            className="flex-1 px-4 py-2.5 bg-[#F9FAFB] rounded-[6px] text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
          />
          <button className="w-9 h-9 bg-[#2563EB] rounded-[6px] flex items-center justify-center text-white hover:bg-[#1D4ED8] transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};