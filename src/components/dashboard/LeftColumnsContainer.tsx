// File: src/components/dashboard/LeftColumnsContainer.tsx
"use client";

import React from "react";
import { InboxSidebar } from "./InboxSidebar";
import { UsersColumn } from "./UsersColumn";

export const LeftColumnsContainer: React.FC = () => {
  return (
    <div className="w-[417.54px] h-[609.82px] flex bg-[#FAFAF8] rounded-[8.42px] overflow-hidden shrink-0">
      {/* First Column - Inbox Sidebar */}
      <div className="w-[168.42px] h-[609.82px] rounded-tl-[11.23px] rounded-bl-[11.23px] border-b-[0.7px] border-gray-200 overflow-hidden bg-white shrink-0">
        <InboxSidebar />
      </div>

      {/* Second Column - Users Column */}
      <div className="w-[249.12px] h-[609.82px] rounded-tr-[8.42px] rounded-br-[8.42px] border-l-[0.7px] border-l-black/24 overflow-hidden bg-white/70 shrink-0">
        <UsersColumn />
      </div>
    </div>
  );
};