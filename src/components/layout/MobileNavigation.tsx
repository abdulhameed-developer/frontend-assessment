// File: src/components/layout/MobileNavigation.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { users } from "@/data/dummyData";
import Image from "next/image";
import React, { useCallback, useState } from "react";

interface MobileNavigationProps {
  currentView: "chats" | "chat" | "settings";
  onViewChange: (view: "chats" | "chat" | "settings") => void;
}

// Define interface for the selected user
interface SelectedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  const { user } = useAuth();
  const { setSelectedChat } = useChat();
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // New user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  // FIXED: Generate unique ID helper - moved to useCallback
  const generateId = useCallback((prefix: string): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter(
    (u) =>
      u.id !== user?.id && // Exclude current user
      (u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // FIXED: Properly typed selectedUser parameter
  const handleSelectUser = (selectedUser: SelectedUser) => {
    // Generate unique ID using helper
    const chatId = generateId("chat");

    // Create a chat with selected user
    const newChat = {
      id: chatId,
      name: `${selectedUser.firstName} ${selectedUser.lastName}`,
      participants: [user, selectedUser],
      lastMessage: {
        content: "Start a conversation",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        senderId: user?.id,
      },
      timestamp: "now",
      unreadCount: 0,
      initials: `${selectedUser.firstName[0]}${selectedUser.lastName[0]}`,
      messages: [],
      isGroup: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSelectedChat(newChat);
    setShowNewChatModal(false);
    setSearchQuery("");
    onViewChange("chat");
  };

  const handleAddNewUser = () => {
    if (newUser.name && newUser.email) {
      // Generate unique IDs using helper
      const userId = generateId("user");
      const chatId = generateId("chat");

      // Create new user
      const newUserObj = {
        id: userId,
        firstName: newUser.name.split(" ")[0] || newUser.name,
        lastName: newUser.name.split(" ")[1] || "",
        email: newUser.email,
        phone: newUser.phone || "",
        bio: newUser.bio || "New user",
        avatar: "",
        status: "online" as const,
        lastSeen: "now",
        role: "Member",
        department: "General",
        location: "Not specified",
        timezone: "UTC",
        labels: ["New"],
      };

      // Create chat with new user
      const newChat = {
        id: chatId,
        name: newUserObj.firstName + " " + newUserObj.lastName,
        participants: [user, newUserObj],
        lastMessage: {
          content: "New contact added",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderId: user?.id,
        },
        timestamp: "now",
        unreadCount: 0,
        initials: `${newUserObj.firstName[0]}${newUserObj.lastName[0]}`,
        messages: [],
        isGroup: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setSelectedChat(newChat);
      setShowAddUserForm(false);
      setShowNewChatModal(false);
      setNewUser({ name: "", email: "", phone: "", bio: "" });
      onViewChange("chat");
    }
  };

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {/* Chats Tab */}
          <button
            onClick={() => onViewChange("chats")}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === "chats" ? "text-blue-600" : "text-gray-500"
            }`}
            aria-label="Chats"
            aria-current={currentView === "chats" ? "page" : undefined}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
              />
            </svg>
            <span className="mt-1 text-xs">Chats</span>
          </button>

          {/* New Chat Tab */}
          <button
            onClick={() => {
              setShowNewChatModal(true);
              setShowAddUserForm(false);
              setSearchQuery("");
            }}
            className="flex flex-col items-center p-2 text-gray-500 rounded-lg"
            aria-label="New chat"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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

          {/* Settings Tab */}
          <button
            onClick={() => onViewChange("settings")}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === "settings" ? "text-blue-600" : "text-gray-500"
            }`}
            aria-label="Settings"
            aria-current={currentView === "settings" ? "page" : undefined}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span className="mt-1 text-xs">Settings</span>
          </button>
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => {
              setShowNewChatModal(false);
              setShowAddUserForm(false);
              setSearchQuery("");
            }}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-4 animate-slideUp max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {showAddUserForm ? "Add New Contact" : "New Chat"}
              </h3>
              <button
                onClick={() => {
                  setShowNewChatModal(false);
                  setShowAddUserForm(false);
                  setSearchQuery("");
                }}
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {!showAddUserForm ? (
              <>
                {/* Search Users */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search users..."
                  className="w-full px-4 py-3 mb-4 text-sm bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label="Search users"
                  autoFocus
                />

                {/* User List */}
                <div className="mb-4 space-y-2 overflow-y-auto max-h-60">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => handleSelectUser(u)}
                        className="flex items-center w-full gap-3 p-3 transition-colors rounded-lg hover:bg-gray-50"
                        aria-label={`Select ${u.firstName} ${u.lastName}`}
                      >
                        <div className="flex items-center justify-center w-10 h-10 overflow-hidden text-sm font-semibold text-white bg-blue-500 rounded-full">
                          {u.avatar ? (
                            // FIXED: Replaced img with Next.js Image
                            <Image
                              src={u.avatar}
                              alt={u.firstName}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full rounded-full"
                            />
                          ) : (
                            <span>{`${u.firstName[0]}${u.lastName[0]}`}</span>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">
                            {u.firstName} {u.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="py-4 text-sm text-center text-gray-500">
                      No users found
                    </p>
                  )}
                </div>

                {/* Add New Contact Button */}
                <button
                  onClick={() => setShowAddUserForm(true)}
                  className="w-full py-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-lg hover:bg-gray-50"
                  aria-label="Add new contact"
                >
                  + Add new contact
                </button>
              </>
            ) : (
              /* Add New User Form */
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="full-name"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    autoFocus
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={newUser.bio}
                    onChange={(e) =>
                      setNewUser({ ...newUser, bio: e.target.value })
                    }
                    placeholder="Short description..."
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows={2}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={handleAddNewUser}
                    disabled={!newUser.name || !newUser.email}
                    className="flex-1 py-3 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                    aria-label="Add contact"
                  >
                    Add Contact
                  </button>
                  <button
                    onClick={() => {
                      setShowAddUserForm(false);
                      setNewUser({ name: "", email: "", phone: "", bio: "" });
                    }}
                    className="flex-1 py-3 text-sm font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                    aria-label="Cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
