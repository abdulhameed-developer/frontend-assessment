// File: src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { Header } from "@/components/layout/Header";
import { InboxSidebar } from "@/components/dashboard/InboxSidebar";
import { UsersColumn } from "@/components/dashboard/UsersColumn";
import { ChatWindow } from "@/components/dashboard/ChatWindow";
import { DetailsPanel } from "@/components/dashboard/DetailsPanel";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { LoadingSkeleton } from "@/components/layout/LoadingSkeleton";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [mobileView, setMobileView] = useState<"inbox" | "chat" | "details">(
    "inbox",
  );

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, router]);

  if (!user) return null;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // EXACT FIXED DIMENSIONS - NO FLEX, NO AUTO
  const containerStyle = {
    height: "609.82px",
    // margin: "0 auto",
    display: "flex",
    position: "relative" as const,
    top: "80px",
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

  const thirdColStyle = {
    width: "464.56px",
    height: "609.82px",
    borderRadius: "8.42px",
    overflow: "hidden" as const,
    backgroundColor: "#FFFFFF",
    flexShrink: 0,
    marginLeft: "0px",
  };

  const fourthColStyle = {
    width: "294.04px",
    height: "609.82px",
    borderRadius: "8.42px",
    gap: "7.02px",
    overflow: "hidden" as const,
    backgroundColor: "#FFFFFF",
    flexShrink: 0,
    marginLeft: "0px",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Container - EXACT 1200px width */}
      <div className="flex justify-center w-full">
        <div
          style={containerStyle}
          className="shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]"
        >
          {/* FIRST COLUMN - Inbox Sidebar - EXACT 168.42px */}
          <div style={firstColStyle}>
            <InboxSidebar />
          </div>

          {/* SECOND COLUMN - Users Column - EXACT 249.12px */}
          <div style={secondColStyle}>
            <UsersColumn />
          </div>

          {/* THIRD COLUMN - Chat Window - EXACT 464.56px */}
          <div style={thirdColStyle}>
            <ChatWindow />
          </div>

          {/* FOURTH COLUMN - Details Panel - EXACT 294.04px */}
          <div style={fourthColStyle}>
            <DetailsPanel />
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only visible on mobile */}
      <div className="lg:hidden">
        <MobileNavigation
          currentView={mobileView}
          onViewChange={setMobileView}
        />
      </div>
    </div>
  );
}
