// File: src/app/page.tsx
"use client";

import { ChatList } from "@/components/dashboard/ChatList";
import { ChatWindow } from "@/components/dashboard/ChatWindow";
import { DetailsPanel } from "@/components/dashboard/DetailsPanel";
import { InboxSidebar } from "@/components/dashboard/InboxSidebar";
import { Header } from "@/components/layout/Header";
import SkeletonBlock from "@/ui/SkeletonBlock";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="flex w-[1200px]">
          <SkeletonBlock width="w-[168.42px]" height="h-[calc(100vh-64px)]" />
          <SkeletonBlock width="w-[320px]" height="h-[calc(100vh-64px)]" />
          <SkeletonBlock width="flex-1" height="h-[calc(100vh-64px)]" />
          <SkeletonBlock width="w-[280px]" height="h-[calc(100vh-64px)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[1200px] bg-[#EFF0EB] p-1">
      <Header />
      <div className="flex mt-1">
        <InboxSidebar />
        <ChatList />
        <ChatWindow />
        <DetailsPanel />
      </div>
    </div>
  );
}
