// File: src/components/dashboard/LeftColumnsContainer.tsx
"use client";

import React from "react";
import { InboxSidebar } from "./InboxSidebar";
import { UsersColumn } from "./UsersColumn";

export const LeftColumnsContainer: React.FC = () => {
  // EXACT FIXED DIMENSIONS
  const containerStyle = {
    width: "417.54px", // 168.42 + 249.12
    height: "609.82px",
    display: "flex",
    backgroundColor: "#FAFAF8",
    borderRadius: "8.42px",
    overflow: "hidden" as const,
  };

  const firstColStyle = {
    width: "168.42px",
    height: "609.82px",
    borderTopLeftRadius: "11.23px",
    borderBottomLeftRadius: "11.23px",
    borderBottomWidth: "0.7px",
    overflow: "hidden" as const,
    backgroundColor: "#FFFFFF",
    flexShrink: 0,
  };

  const secondColStyle = {
    width: "249.12px",
    height: "609.82px",
    borderTopRightRadius: "8.42px",
    borderBottomRightRadius: "8.42px",
    borderLeftWidth: "0.7px",
    borderLeft: "0.7px solid rgba(0,0,0,0.24)",
    overflow: "hidden" as const,
    backgroundColor: "#FFFFFFB2",
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      {/* First Column - Inbox Sidebar */}
      <div style={firstColStyle}>
        <InboxSidebar />
      </div>

      {/* Second Column - Users Column */}
      <div style={secondColStyle}>
        <UsersColumn />
      </div>
    </div>
  );
};
