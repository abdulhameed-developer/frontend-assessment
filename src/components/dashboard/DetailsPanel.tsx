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

  // Determine which contact to show - either selected from contact context or from chat
  const contact = selectedContact || {
    id: selectedChat?.id || 'default',
    firstName: selectedChat?.name.split(' ')[0] || 'Olivia',
    lastName: selectedChat?.name.split(' ')[1] || 'Mckinsey',
    email: selectedChat?.email || 'olivia.mckinsey@gmail.com',
    phone: selectedChat?.phone || '+1 (312) 555-0134',
    company: 'Fit4Life',
    position: 'Premium Member',
    labels: selectedChat?.id ? ['Active', 'Premium'] : ['Closed Won', 'Chicago', 'High Value'],
    notes: dummyContact.notes
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

  const activityItems = [
    { id: '1', content: 'Chat started', time: '23:08', user: contact.firstName },
    { id: '2', content: 'Email confirmation received', time: '23:16', user: 'System' },
    { id: '3', content: 'Password reset link sent', time: '23:17', user: 'System' },
    { id: '4', content: 'User logged in successfully', time: '23:20', user: 'System' },
    { id: '5', content: 'Premium guide link shared', time: '23:24', user: 'Michael' },
    { id: '6', content: 'Note added: Strong potential for future upgrades', time: '23:25', user: 'Michael' },
  ];

  const files = [
    { id: '1', name: 'Premium_Guide.pdf', size: '2.4 MB', date: 'Aug 28' },
    { id: '2', name: 'Workout_Plan.pdf', size: '1.8 MB', date: 'Aug 27' },
    { id: '3', name: 'Welcome_Message.mp4', size: '5.2 MB', date: 'Aug 26' },
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-tr-[11.23px] rounded-br-[11.23px]">
      {/* Tabs */}
      <div className="flex flex-shrink-0 px-4 pt-3 border-b border-gray-200">
        {['details', 'activity', 'files'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 pb-3 text-sm font-medium capitalize relative ${
              activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-y-auto hide-scrollbar">
        {activeTab === 'details' && (
          <>
            {/* Profile Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 overflow-hidden text-lg font-semibold text-white bg-blue-500 rounded-full">
                {contact.avatar ? (
                  <img src={contact.avatar} alt={contact.firstName} className="object-cover w-full h-full" />
                ) : (
                  `${contact.firstName[0]}${contact.lastName[0]}`
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-sf-compact-bold text-[12.63px] text-gray-900 truncate">
                  {contact.firstName} {contact.lastName}
                </h3>
                <p className="font-sf-compact-regular text-[10.73px] text-gray-500 truncate">{contact.email}</p>
              </div>
            </div>

            {/* Chat Data */}
            <div className="mb-4">
              <h4 className="font-sf-compact-medium text-[9.82px] text-gray-500 uppercase mb-2">Chat Data</h4>
              <div className="p-3 space-y-2 rounded-lg bg-gray-50">
                <div className="flex justify-between">
                  <span className="font-sf-compact-regular text-[10.73px] text-gray-500">Assignee</span>
                  <span className="font-sf-compact-medium text-[9.82px] text-gray-900">James West</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sf-compact-regular text-[10.73px] text-gray-500">Team</span>
                  <span className="font-sf-compact-medium text-[9.82px] text-gray-900">Sales Team</span>
                </div>
              </div>
            </div>

            {/* Contact Data */}
            <div className="mb-4">
              <h4 className="font-sf-compact-medium text-[9.82px] text-gray-500 uppercase mb-2">Contact Data</h4>
              <div className="p-3 space-y-2 rounded-lg bg-gray-50">
                <div className="flex justify-between">
                  <span className="font-sf-compact-regular text-[10.73px] text-gray-500">First Name</span>
                  <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{contact.firstName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sf-compact-regular text-[10.73px] text-gray-500">Last Name</span>
                  <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{contact.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sf-compact-regular text-[10.73px] text-gray-500">Email</span>
                  <span className="font-sf-compact-medium text-[9.82px] text-gray-900 break-all">{contact.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sf-compact-regular text-[10.73px] text-gray-500">Phone</span>
                  <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{contact.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sf-compact-regular text-[10.73px] text-gray-500">Company</span>
                  <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{contact.company || 'Fit4Life'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sf-compact-regular text-[10.73px] text-gray-500">Position</span>
                  <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{contact.position || 'Premium Member'}</span>
                </div>
              </div>
              <button className="font-sf-compact-medium text-[9.82px] text-blue-600 mt-1 hover:underline">See all</button>
            </div>

            {/* Labels */}
            <div className="mb-4">
              <h4 className="font-sf-compact-medium text-[9.82px] text-gray-500 uppercase mb-2">Labels</h4>
              <div className="flex flex-wrap gap-2">
                {contact.labels?.map((label) => (
                  <span
                    key={label}
                    className={`px-2 py-1 rounded-full text-xs ${
                      label === 'Closed Won' ? 'bg-green-100 text-green-700' :
                      label === 'Chicago' ? 'bg-blue-100 text-blue-700' :
                      label === 'High Value' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {label}
                  </span>
                ))}
                <button className="px-2 py-1 text-xs text-gray-500 border border-gray-300 border-dashed rounded-full hover:border-blue-500 hover:text-blue-500">
                  + Add
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <h4 className="font-sf-compact-medium text-[9.82px] text-gray-500 uppercase mb-2">Notes</h4>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-3 py-2 bg-gray-50 rounded-lg font-sf-compact-regular text-[10.73px] text-gray-900 placeholder-gray-400 outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="px-3 py-2 bg-blue-600 text-white font-sf-compact-medium text-[9.82px] rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div key={note.id} className="p-3 rounded-lg bg-gray-50">
                    <p className="font-sf-compact-regular text-[10.73px] text-gray-900">{note.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-sf-compact-number text-[8.42px] text-gray-500">{note.author?.name || 'Michael Johnson'}</span>
                      <span className="font-sf-compact-number text-[8.42px] text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Chats */}
            <div>
              <h4 className="font-sf-compact-medium text-[9.82px] text-gray-500 uppercase mb-2">Other Chats</h4>
              <div className="flex items-center justify-between p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <span className="font-sf-compact-medium text-[9.82px] text-gray-900">Fit4Life</span>
                <span className="font-sf-compact-number text-[8.42px] text-gray-500">On my way!</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-3">
            <h4 className="font-sf-compact-medium text-[9.82px] text-gray-500 uppercase mb-2">Recent Activity</h4>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200" />
              {activityItems.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute left-[-16px] top-1 w-2 h-2 rounded-full bg-blue-500" />
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="font-sf-compact-regular text-[10.73px] text-gray-900">{item.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-sf-compact-number text-[8.42px] text-gray-500">{item.user}</span>
                      <span className="font-sf-compact-number text-[8.42px] text-gray-500">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-3">
            <h4 className="font-sf-compact-medium text-[9.82px] text-gray-500 uppercase mb-2">Shared Files</h4>
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-2 transition-colors rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sf-compact-medium text-[9.82px] text-gray-900 truncate">{file.name}</p>
                    <p className="font-sf-compact-number text-[8.42px] text-gray-500">{file.size} • {file.date}</p>
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