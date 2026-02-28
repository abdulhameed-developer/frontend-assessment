// File: src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';
import { Header } from '@/components/layout/Header';
import { InboxSidebar } from '@/components/dashboard/InboxSidebar';
import { UsersColumn } from '@/components/dashboard/UsersColumn';
import { ChatWindow } from '@/components/dashboard/ChatWindow';
import { DetailsPanel } from '@/components/dashboard/DetailsPanel';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { MobileChatList } from '@/components/layout/MobileChatList';
import { MobileSettings } from '@/components/layout/MobileSettings';
import { LoadingSkeleton } from '@/components/layout/LoadingSkeleton';

export default function Home() {
  const { user } = useAuth();
  const { selectedChat } = useChat();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [mobileView, setMobileView] = useState<'chats' | 'chat' | 'settings'>('chats');

  useEffect(() => {
    if (!user) {
      router.push('/login');
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
      setMobileView('chat');
    }
  }, [selectedChat]);

  if (!user) return null;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* DESKTOP LAYOUT - EXACTLY AS INBOX DASHBOARD 2.PNG */}
      <div className="hidden lg:block w-full pt-15">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex gap-4 h-[calc(100vh-120px)]">
            {/* FIRST COLUMN - Inbox Sidebar */}
            <div className="w-[260px] flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
              <InboxSidebar />
            </div>
            
            {/* SECOND COLUMN - Users Column */}
            <div className="w-[320px] flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
              <UsersColumn />
            </div>
            
            {/* THIRD COLUMN - Chat Window */}
            <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
              <ChatWindow />
            </div>
            
            {/* FOURTH COLUMN - Details Panel */}
            <div className="w-[280px] flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
              <DetailsPanel />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden">
        {mobileView === 'chats' && (
          <div className="fixed inset-0 bg-white pt-16 pb-20 overflow-y-auto">
            <MobileChatList />
          </div>
        )}
        {mobileView === 'chat' && (
          <div className="fixed inset-0 z-50 bg-white">
            <ChatWindow />
          </div>
        )}
        {mobileView === 'settings' && (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <MobileSettings onClose={() => setMobileView('chats')} />
          </div>
        )}
        <MobileNavigation currentView={mobileView} onViewChange={setMobileView} />
      </div>
    </div>
  );
}