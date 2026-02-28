// File: src/app/page.tsx
"use client";

import { ChatWindow } from "@/components/dashboard/ChatWindow";
import { DetailsPanel } from "@/components/dashboard/DetailsPanel";
import { InboxSidebar } from "@/components/dashboard/InboxSidebar";
import { UsersColumn } from "@/components/dashboard/UsersColumn";
import { Header } from "@/components/layout/Header";
import { LoadingSkeleton } from "@/components/layout/LoadingSkeleton";
import { MobileChatList } from "@/components/layout/MobileChatList";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { MobileSettings } from "@/components/layout/MobileSettings";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const { selectedChat } = useChat();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [mobileView, setMobileView] = useState<"chats" | "chat" | "settings">(
    "chats",
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

  // When a chat is selected on mobile, switch to chat view
  useEffect(() => {
    if (selectedChat) {
      // Defer setState to avoid synchronous update in effect
      queueMicrotask(() => setMobileView("chat"));
    }
  }, [selectedChat]);

  if (!user) return null;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* DESKTOP LAYOUT */}
      <div className="hidden w-full pt-20 lg:block">
        <div className="max-w-300 mx-auto px-4">
          <div className="flex gap-4 h-[calc(100vh-120px)]">
            {/* FIRST COLUMN - Inbox Sidebar */}
            <div className="w-65 shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
              <InboxSidebar />
            </div>

            {/* SECOND COLUMN - Users Column */}
            <div className="w-[320px] shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
              <UsersColumn />
            </div>

            {/* THIRD COLUMN - Chat Window */}
            <div className="flex-1 overflow-hidden bg-white rounded-lg shadow-lg">
              <ChatWindow />
            </div>

            {/* FOURTH COLUMN - Details Panel */}
            <div className="w-70-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
              <DetailsPanel />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden">
        {/* Chats List View */}
        {mobileView === "chats" && (
          <div className="fixed inset-0 z-40 pt-16 pb-20 overflow-y-auto bg-white">
            <MobileChatList />
          </div>
        )}

        {/* Chat View - Full screen */}
        {mobileView === "chat" && (
          <div className="fixed inset-0 z-50 bg-white">
            <ChatWindow onBack={() => setMobileView("chats")} />
          </div>
        )}

        {/* Settings View - Full screen */}
        {mobileView === "settings" && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
            <MobileSettings onClose={() => setMobileView("chats")} />
          </div>
        )}

        {/* Bottom Navigation - Only show when not in chat view */}
        {mobileView !== "chat" && (
          <MobileNavigation
            currentView={mobileView}
            onViewChange={setMobileView}
          />
        )}
      </div>
    </div>
  );
}
