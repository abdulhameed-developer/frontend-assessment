// File: src/components/dashboard/DetailsPanel.tsx
"use client";

import React, { useState } from "react";
import { useContact } from "@/context/ContactContext";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";
import { contact as dummyContact } from "@/data/dummyData";

// Define proper interfaces
interface Author {
  id: string;
  name: string;
  avatar?: string;
}

interface Note {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  labels: string[];
}

type TabType = "details" | "activity" | "files";

export const DetailsPanel: React.FC = () => {
  const { selectedContact } = useContact();
  const { selectedChat } = useChat();
  const { user } = useAuth();
  const [newNote, setNewNote] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const [notes, setNotes] = useState<Note[]>(dummyContact.notes);
  const [labels, setLabels] = useState<string[]>(dummyContact.labels);
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const contact: Contact = selectedContact
    ? {
        id: selectedContact.id,
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        email: selectedContact.email,
        phone: selectedContact.phone,
        company: selectedContact.company || "Fit4Life",
        position: selectedContact.position || "Premium Member",
        labels: selectedContact.labels || labels,
      }
    : {
        id: selectedChat?.id || "default",
        firstName: selectedChat?.name.split(" ")[0] || "Olivia",
        lastName: selectedChat?.name.split(" ")[1] || "Mckinsey",
        email: selectedChat?.email || "olivia.mckinsey@gmail.com",
        phone: selectedChat?.phone || "+1 (312) 555-0134",
        company: "Fit4Life",
        position: "Premium Member",
        labels: labels,
      };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newNoteObj: Note = {
        id: Date.now().toString(),
        userId: contact.id,
        content: newNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          id: user?.id || "",
          name: user ? `${user.firstName} ${user.lastName}` : "Michael Johnson",
          avatar: user?.avatar,
        },
      };
      setNotes([newNoteObj, ...notes]);
      setNewNote("");
    }
  };

  const handleAddLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel("");
      setShowLabelInput(false);
    }
  };

  const handleRemoveLabel = (labelToRemove: string): void => {
    setLabels(labels.filter((label: string) => label !== labelToRemove));
  };

  const tabs: TabType[] = ["details", "activity", "files"];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Tabs */}
      <div className="flex px-3 pt-2 border-b border-gray-200">
        {tabs.map((tab: TabType) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 pb-2 text-[11px] font-medium capitalize ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 p-3 overflow-y-auto scrollbar-thin">
        {activeTab === "details" && (
          <>
            {/* Profile Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-xs font-semibold text-white bg-blue-500 rounded-full">
                {contact.firstName[0]}
                {contact.lastName[0]}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-medium text-gray-900 truncate">
                  {contact.firstName} {contact.lastName}
                </h3>
                <p className="text-[10px] text-gray-500 truncate">
                  {contact.email}
                </p>
              </div>
            </div>

            {/* Chat Data */}
            <div className="mb-3">
              <h4 className="text-[9px] font-medium text-gray-500 uppercase mb-1.5">
                Chat Data
              </h4>
              <div className="p-2 space-y-1 rounded bg-gray-50">
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Assignee</span>
                  <span className="text-[10px] font-medium text-gray-900">
                    James West
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Team</span>
                  <span className="text-[10px] font-medium text-gray-900">
                    Sales Team
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Data */}
            <div className="mb-3">
              <h4 className="text-[9px] font-medium text-gray-500 uppercase mb-1.5">
                Contact Data
              </h4>
              <div className="p-2 space-y-1 rounded bg-gray-50">
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">First Name</span>
                  <span className="text-[10px] text-gray-900">
                    {contact.firstName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Last Name</span>
                  <span className="text-[10px] text-gray-900">
                    {contact.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Email</span>
                  <span className="text-[10px] text-gray-900 break-all">
                    {contact.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Phone</span>
                  <span className="text-[10px] text-gray-900">
                    {contact.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Company</span>
                  <span className="text-[10px] text-gray-900">
                    {contact.company}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-500">Position</span>
                  <span className="text-[10px] text-gray-900">
                    {contact.position}
                  </span>
                </div>
              </div>
              <button className="text-[9px] text-blue-600 mt-1">See all</button>
            </div>

            {/* Labels */}
            <div className="mb-3">
              <h4 className="text-[9px] font-medium text-gray-500 uppercase mb-1.5">
                Labels
              </h4>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {labels.map((label: string) => (
                  <span
                    key={label}
                    className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[9px] flex items-center gap-0.5"
                  >
                    {label}
                    <button
                      onClick={() => handleRemoveLabel(label)}
                      className="ml-0.5 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {showLabelInput ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewLabel(e.target.value)
                      }
                      placeholder="New label"
                      className="w-16 px-1.5 py-0.5 text-[9px] border rounded"
                      autoFocus
                    />
                    <button
                      onClick={handleAddLabel}
                      className="px-1.5 py-0.5 bg-green-500 text-white text-[9px] rounded"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowLabelInput(false)}
                      className="px-1.5 py-0.5 bg-gray-300 text-[9px] rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLabelInput(true)}
                    className="px-1.5 py-0.5 border border-dashed border-gray-300 rounded-full text-[9px] text-gray-500 hover:border-blue-500 hover:text-blue-500"
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-3">
              <h4 className="text-[9px] font-medium text-gray-500 uppercase mb-1.5">
                Notes
              </h4>
              <div className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewNote(e.target.value)
                  }
                  placeholder="Add a note..."
                  className="flex-1 px-2 py-1 bg-gray-50 rounded text-[10px] text-gray-900 placeholder-gray-400 outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="px-2 py-1 bg-blue-600 text-white text-[10px] rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1.5">
                {notes.map((note: Note) => (
                  <div key={note.id} className="p-2 rounded bg-gray-50">
                    <p className="text-[10px] text-gray-900">{note.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[8px] text-gray-500">
                        {note.author?.name}
                      </span>
                      <span className="text-[8px] text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Chats */}
            <div>
              <h4 className="text-[9px] font-medium text-gray-500 uppercase mb-1.5">
                Other Chats
              </h4>
              <div className="flex items-center justify-between p-2 rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
                <span className="text-[10px] font-medium text-gray-900">
                  Fit4Life
                </span>
                <span className="text-[8px] text-gray-500">On my way!</span>
              </div>
            </div>
          </>
        )}

        {activeTab === "activity" && (
          <div className="space-y-2">
            <h4 className="text-[9px] font-medium text-gray-500 uppercase mb-1.5">
              Recent Activity
            </h4>
            <div className="space-y-1.5">
              {[1, 2, 3, 4, 5].map((i: number) => (
                <div key={i} className="p-2 rounded bg-gray-50">
                  <p className="text-[10px] text-gray-900">Activity item {i}</p>
                  <span className="text-[8px] text-gray-500">Just now</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div className="space-y-2">
            <h4 className="text-[9px] font-medium text-gray-500 uppercase mb-1.5">
              Shared Files
            </h4>
            <div className="space-y-1.5">
              {[1, 2, 3].map((i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded"
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded">
                    <svg
                      className="w-3 h-3 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-900">
                      File {i}.pdf
                    </p>
                    <p className="text-[8px] text-gray-500">2.4 MB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};