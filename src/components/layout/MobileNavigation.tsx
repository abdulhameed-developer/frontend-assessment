// File: src/components/layout/MobileNavigation.tsx
"use client";

import { motion, PanInfo, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

import { ChatWindow } from "../dashboard/ChatWindow";
import { DetailsPanel } from "../dashboard/DetailsPanel";
import { InboxSidebar } from "../dashboard/InboxSidebar";

interface MobileNavigationProps {
  currentView: "inbox" | "chat" | "details";
  onViewChange: (view: "inbox" | "chat" | "details") => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  const [startX, setStartX] = useState(0);
  const controls = useAnimation();

  const handleDragStart = (event: any, info: PanInfo) => {
    setStartX(info.point.x);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    const deltaX = info.point.x - startX;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0 && currentView !== "inbox") {
        // Swipe right - go to previous view
        if (currentView === "details") onViewChange("chat");
        else if (currentView === "chat") onViewChange("inbox");
      } else if (deltaX < 0 && currentView !== "details") {
        // Swipe left - go to next view
        if (currentView === "inbox") onViewChange("chat");
        else if (currentView === "chat") onViewChange("details");
      }
    }

    // Reset position
    controls.start({
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".profile-dropdown") &&
        !target.closest(".profile-button")
      ) {
        // Close any open dropdowns - you'll need to manage this state in a parent component
        document.dispatchEvent(new CustomEvent("closeAllDropdowns"));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getViewTitle = () => {
    switch (currentView) {
      case "inbox":
        return "Inbox";
      case "chat":
        return "Chat";
      case "details":
        return "Details";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Top Header with View Title and Back Button */}
      <div className="fixed left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 lg:hidden top-16">
        <div className="flex items-center gap-3">
          {currentView !== "inbox" && (
            <button
              onClick={() => {
                if (currentView === "chat") onViewChange("inbox");
                if (currentView === "details") onViewChange("chat");
              }}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100"
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
          )}
          <h2 className="text-lg font-semibold text-gray-900">
            {getViewTitle()}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {currentView === "inbox"
              ? "1/3"
              : currentView === "chat"
                ? "2/3"
                : "3/3"}
          </span>
        </div>
      </div>

      {/* Swipeable Content Container */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="h-full lg:hidden touch-pan-y"
        style={{
          width: "300%",
          display: "flex",
          x:
            currentView === "inbox"
              ? "0%"
              : currentView === "chat"
                ? "-100%"
                : "-200%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Inbox View */}
        <div className="w-1/3 h-full pb-24 overflow-y-auto">
          <div className="p-4">
            <InboxSidebar />
          </div>
        </div>

        {/* Chat View */}
        <div className="w-1/3 h-full pb-24 overflow-hidden">
          <ChatWindow />
        </div>

        {/* Details View */}
        <div className="w-1/3 h-full pb-24 overflow-y-auto">
          <div className="p-4">
            <DetailsPanel />
          </div>
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          <button
            onClick={() => onViewChange("inbox")}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors relative ${
              currentView === "inbox" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="mt-1 text-xs">Inbox</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <button
            onClick={() => onViewChange("chat")}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === "chat" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="mt-1 text-xs">Chat</span>
          </button>

          <button
            onClick={() => onViewChange("details")}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === "details" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="mt-1 text-xs">Profile</span>
          </button>

          <button className="flex flex-col items-center p-2 text-gray-500 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="mt-1 text-xs">New</span>
          </button>
        </div>
      </div>

      {/* Add padding to bottom of main content */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          .pb-20 {
            padding-bottom: 80px;
          }
        }
      `}</style>
    </>
  );
};