// File: src/components/dashboard/DetailsPanel.tsx
'use client';

import React, { useState } from 'react';
import { useContact } from '@/context/ContactContext';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { contact as dummyContact } from '@/data/dummyData';

export const DetailsPanel: React.FC = () => {
  const { selectedContact } = useContact();
  const { selectedChat } = useChat();
  const { user } = useAuth();
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'activity' | 'files'>('details');
  const [notes, setNotes] = useState(dummyContact.notes);
  const [labels, setLabels] = useState(dummyContact.labels);
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  const contact = selectedContact || {
    id: selectedChat?.id || 'default',
    firstName: selectedChat?.name.split(' ')[0] || 'Olivia',
    lastName: selectedChat?.name.split(' ')[1] || 'Mckinsey',
    email: selectedChat?.email || 'olivia.mckinsey@gmail.com',
    phone: selectedChat?.phone || '+1 (312) 555-0134',
    company: 'Fit4Life',
    position: 'Premium Member',
    labels: labels
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newNoteObj = {
        id: Date.now().toString(),
        userId: contact.id,
        content: newNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          id: user?.id || '',
          name: user ? `${user.firstName} ${user.lastName}` : 'Michael Johnson',
          avatar: user?.avatar
        }
      };
      setNotes([newNoteObj, ...notes]);
      setNewNote('');
    }
  };

  const handleAddLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel('');
      setShowLabelInput(false);
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    setLabels(labels.filter(label => label !== labelToRemove));
  };

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-4 pt-3">
        {['details', 'activity', 'files'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 pb-3 text-sm font-medium capitalize ${
              activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'details' && (
          <>
            {/* Profile Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {contact.firstName[0]}{contact.lastName[0]}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{contact.firstName} {contact.lastName}</h3>
                <p className="text-sm text-gray-500">{contact.email}</p>
              </div>
            </div>

            {/* Chat Data */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Chat Data</h4>
              <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Assignee</span>
                  <span className="text-sm font-medium text-gray-900">James West</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Team</span>
                  <span className="text-sm font-medium text-gray-900">Sales Team</span>
                </div>
              </div>
            </div>

            {/* Contact Data */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Contact Data</h4>
              <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">First Name</span>
                  <span className="text-sm text-gray-900">{contact.firstName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Name</span>
                  <span className="text-sm text-gray-900">{contact.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm text-gray-900 break-all">{contact.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Phone</span>
                  <span className="text-sm text-gray-900">{contact.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Company</span>
                  <span className="text-sm text-gray-900">{contact.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Position</span>
                  <span className="text-sm text-gray-900">{contact.position}</span>
                </div>
              </div>
              <button className="text-sm text-blue-600 mt-1">See all</button>
            </div>

            {/* Labels */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Labels</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {labels.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1"
                  >
                    {label}
                    <button onClick={() => handleRemoveLabel(label)} className="ml-1 hover:text-blue-900">×</button>
                  </span>
                ))}
                {showLabelInput ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="New label"
                      className="w-20 px-2 py-1 text-xs border rounded"
                      autoFocus
                    />
                    <button onClick={handleAddLabel} className="px-2 py-1 bg-green-500 text-white text-xs rounded">Add</button>
                    <button onClick={() => setShowLabelInput(false)} className="px-2 py-1 bg-gray-300 text-xs rounded">Cancel</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLabelInput(true)}
                    className="px-2 py-1 border border-dashed border-gray-300 rounded-full text-xs text-gray-500 hover:border-blue-500 hover:text-blue-500"
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Notes</h4>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">{note.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{note.author?.name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Chats */}
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Other Chats</h4>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100">
                <span className="text-sm font-medium text-gray-900">Fit4Life</span>
                <span className="text-xs text-gray-500">On my way!</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Recent Activity</h4>
            <div className="space-y-2">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900">Activity item {i}</p>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Shared Files</h4>
            <div className="space-y-2">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">File {i}.pdf</p>
                    <p className="text-xs text-gray-500">2.4 MB</p>
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