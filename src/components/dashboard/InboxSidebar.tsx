// File: src/components/dashboard/InboxSidebar.tsx
"use client";

import React, { useEffect, useState } from "react";
// import User from "@/types/navigation.types";
import { fetchAllUsers } from "@/services/api";
import { SkeletonBlock, SkeletonText, SkeletonAvatar } from "@/ui";

interface InboxSidebarProps {
  onSelectUser?: (user: any) => void;
}

export const InboxSidebar: React.FC<InboxSidebarProps> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("All");

  useEffect(() => {
    fetchAllUsers().then((data) => {
      setUsers(data.slice(0, 9)); // Get first 9 users
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-[260px] border-r border-[#E5E7EB] bg-white p-4">
        <SkeletonBlock width="w-full" height="h-10" className="mb-4" />
        <SkeletonBlock width="w-full" height="h-8" className="mb-2" />
        <SkeletonBlock width="w-full" height="h-8" className="mb-4" />
        <SkeletonText lines={1} className="mb-3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <SkeletonAvatar size="w-6 h-6" />
              <SkeletonBlock width="w-20" height="h-3" />
            </div>
            <SkeletonBlock width="w-4" height="h-3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-[168.42px] h-fit rounded-l-[11.23px] border-r border-[#E5E7EB] bg-white p-4">
      <h2 className="text-[12.63px]] font-[790] text-[#000] tracking-wider mb-4">
        Inbox
      </h2>

      {/* My Inbox */}
      <div className="mb-4">
        <div className="flex items-center justify-start gap-[2px] py-[8px] px-[12px] rounded-[4px] cursor-pointer transition-colors h-fit">
          {/* SVG Wrapper to ensure alignment */}
          <div className="flex items-center justify-center shrink-0">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>

          <span className="text-[10.73px] text-[#000] leading-none antialiased">
            My Inbox
          </span>
        </div>

        <div
          onClick={() => setSelected("All")}
          className={`flex items-center justify-between py-2 px-3 rounded-[4px] cursor-pointer ${
            selected === "All" ? "bg-[#F3F4F6]" : "hover:bg-[#F9FAFB]"
          }`}
        >
          <div className="flex items-center justify-center gap-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path
                fill-rule="evenodd"
                d="M3.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
              />
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>

            <span className="text-[10.73px] text-[#000]">All</span>
          </div>
          <span className="text-[8.42px] text-[#000]">28</span>
        </div>
        <div
          onClick={() => setSelected("Unassigned")}
          className={`flex items-center justify-between py-2 px-3 rounded-[4px] cursor-pointer ${
            selected === "Unassigned" ? "bg-[#F3F4F6]" : "hover:bg-[#F9FAFB]"
          }`}
        >
          <div className="flex items-center justify-center gap-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v7h-2z" />
            </svg>

            <span className="text-[10.73px] text-[#000]">Unassigned</span>
          </div>
          <span className="text-[8.42px] text-[#000] font-medium">5</span>
        </div>
      </div>

      {/* Teams */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-[#6B7280] uppercase mb-2">
          Teams
        </h3>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm text-[#111827]">Sales</span>
          <span className="text-xs text-[#6B7280]">7</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm text-[#111827]">Customer Support</span>
          <span className="text-xs text-[#6B7280]">16</span>
        </div>
      </div>

      {/* Users */}
      <div>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase mb-2">
          Users
        </h3>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              setSelected(user.firstName);
              onSelectUser?.(user);
            }}
            className={`flex items-center justify-between py-2 px-3 rounded-[4px] cursor-pointer ${
              selected === user.firstName
                ? "bg-[#F3F4F6]"
                : "hover:bg-[#F9FAFB]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2563EB] bg-opacity-10 flex items-center justify-center">
                <span className="text-xs font-medium text-[#2563EB]">
                  {user.firstName[0]}
                </span>
              </div>
              <span className="text-sm text-[#111827]">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <span className="text-xs text-[#6B7280]">
              {/* {Math.floor(Math.random() * 5) + 1} */}
            </span>
          </div>
        ))}
      </div>

      {/* Channels */}
      <div className="mt-6">
        <h3 className="text-xs font-medium text-[#6B7280] uppercase mb-2">
          Channels
        </h3>
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-2 h-2 bg-[#10B981] rounded-full" />
          <span className="text-sm text-[#111827]">Fit4Life</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-2 h-2 bg-[#F59E0B] rounded-full" />
          <span className="text-sm text-[#111827]">Fit4Life</span>
        </div>
      </div>
    </div>
  );
};