// File: src/components/dashboard/DashboardContainer.tsx
'use client';

import React from 'react';
import { useDelayedRender } from '@/hooks/useDelayedRender';
import { SkeletonBlock } from '@/ui/SkeletonBlock';
import { SkeletonText } from '@/ui/SkeletonText';
import { SkeletonAvatar } from '@/ui/SkeletonAvatar';
import { classNames } from '@/utils/classNames';

interface MessageProps {
  sender: string;
  content: string;
  time: string;
  isUser?: boolean;
}

const Message: React.FC<MessageProps> = ({ sender, content, time, isUser }) => {
  return (
    <div className={classNames('flex gap-3 mb-4', isUser ? 'flex-row-reverse' : '')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#007AEC] flex items-center justify-center text-white text-xs font-semibold">
          {sender[0]}
        </div>
      )}
      <div className={classNames('max-w-[70%]', isUser ? 'items-end' : '')}>
        <div className="flex items-center gap-2 mb-1">
          {!isUser && <span className="text-[12px] font-['Inter'] text-[#1A1A1A] font-medium">{sender}</span>}
          <span className="text-[9.82px] font-['Inter'] text-[#90909B]">{time}</span>
        </div>
        <div className={classNames(
          'p-3 rounded-[11.23px] text-[12.63px] font-["Inter"]',
          isUser 
            ? 'bg-[#007AEC] text-white' 
            : 'bg-[#EFF2F2] text-[#1A1A1A]'
        )}>
          {content}
        </div>
      </div>
    </div>
  );
};

export const DashboardContainer: React.FC = () => {
  const isReady = useDelayedRender(2000);
  const [selectedChat, setSelectedChat] = React.useState('olivia');

  const messages = [
    { sender: 'Olivia McKinsey', content: 'Hi, I recently joined Fit4Life and I\'m trying to access my workout plan, but I can\'t login. Can you help?', time: '23:08', isUser: false },
    { sender: 'Michael', content: 'Hello Olivia 👋 I\'m Michael, your AI customer support assistant. Let\'s fix this quickly. Could you confirm the email address?', time: '23:08', isUser: true },
    { sender: 'Olivia McKinsey', content: 'Yes, it\'s olivia.Mckinsey@gmail.com', time: '23:16', isUser: false },
    { sender: 'Michael', content: 'I see it. resetting now...', time: '23:17', isUser: true },
    { sender: 'Olivia McKinsey', content: 'Done! I\'m logged in. Thanks!', time: '23:20', isUser: false },
    { sender: 'Michael', content: 'Perfect 🏃 Your plan is ready under "My Programs". Since you\'re starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👇 www.Fit4Life.com/Premium', time: '23:24', isUser: true },
    { sender: 'Olivia McKinsey', content: 'Oh my god 😂 I\'ll try it ASAP, thank you so much!!', time: '23:25', isUser: false },
  ];

  if (!isReady) {
    return (
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar Skeleton */}
        <div className="w-70 border-r border-[#D8DEE4] p-6">
          <SkeletonBlock width="w-full" height="h-[40px]" className="mb-6" />
          <SkeletonBlock width="w-full" height="h-[32px]" className="mb-4" />
          <SkeletonBlock width="w-full" height="h-[32px]" className="mb-4" />
          <SkeletonBlock width="w-full" height="h-[32px]" className="mb-4" />
          <div className="space-y-3 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonAvatar size="w-8 h-8" />
                <SkeletonText lines={1} className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex">
          <div className="w-100 border-r border-[#D8DEE4] p-6">
            <SkeletonBlock width="w-full" height="h-[48px]" className="mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <SkeletonAvatar size="w-10 h-10" />
                  <div className="flex-1">
                    <SkeletonText lines={2} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <SkeletonBlock width="w-[60%]" height="h-[32px]" className="mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <SkeletonAvatar size="w-8 h-8" />
                  <div className="flex-1">
                    <SkeletonText lines={3} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel Skeleton */}
          <div className="w-[320px] border-l border-[#D8DEE4] p-6">
            <SkeletonBlock width="w-full" height="h-[200px]" className="mb-6" />
            <SkeletonBlock width="w-full" height="h-[150px]" className="mb-6" />
            <SkeletonBlock width="w-full" height="h-[100px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Left Sidebar */}
      <div className="w-70 border-r border-[#D8DEE4] bg-white">
        <div className="p-6">
          <h2 className="text-[14px] font-['Inter'] font-semibold text-[#1A1A1A] mb-4">My Inbox</h2>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-2 px-3 bg-[#EFF2F2] rounded-[5.61px]">
              <span className="text-[12.63px] font-['Inter'] text-[#1A1A1A]">All</span>
              <span className="text-[9.82px] font-['Inter'] text-[#90909B]">28</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3">
              <span className="text-[12.63px] font-['Inter'] text-[#1A1A1A]">Unassigned</span>
              <span className="text-[9.82px] font-['Inter'] text-[#FE3265] font-medium">5</span>
            </div>
          </div>

          <h3 className="text-[12.63px] font-['Inter'] font-medium text-[#90909B] mt-6 mb-3">Teams</h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-2 px-3">
              <span className="text-[12.63px] font-['Inter'] text-[#1A1A1A]">Sales</span>
              <span className="text-[9.82px] font-['Inter'] text-[#90909B]">7</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3">
              <span className="text-[12.63px] font-['Inter'] text-[#1A1A1A]">Customer Support</span>
              <span className="text-[9.82px] font-['Inter'] text-[#90909B]">16</span>
            </div>
          </div>

          <h3 className="text-[12.63px] font-['Inter'] font-medium text-[#90909B] mt-6 mb-3">Users</h3>
          <div className="space-y-1 max-h-75 overflow-y-auto">
            {['Sarah Williams', 'Michael Johnson', 'Emily Davis', 'Christopher Miller', 'Amanda Garcia'].map((user, i) => (
              <div key={user} className="flex items-center justify-between py-2 px-3 hover:bg-[#EFF2F2] rounded-[5.61px] cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#007AEC] bg-opacity-10 flex items-center justify-center text-[#007AEC] text-[9.82px] font-semibold">
                    {user[0]}
                  </div>
                  <span className="text-[12.63px] font-['Inter'] text-[#1A1A1A]">{user}</span>
                </div>
                <span className="text-[9.82px] font-['Inter'] text-[#90909B]">{i === 1 ? 11 : i * 2 + 2}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="w-100 border-r border-[#D8DEE4] bg-white">
        <div className="p-4 border-b border-[#D8DEE4]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Chat"
              className="w-full pl-10 pr-4 py-3 bg-[#EFF2F2] rounded-[11.23px] text-[12.63px] font-['Inter'] text-[#1A1A1A] placeholder-[#90909B] outline-none"
            />
            <svg className="absolute left-3 top-3.5 w-4 h-4 text-[#90909B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-[12.63px] font-['Inter'] text-[#1A1A1A] font-medium">Open</span>
              <svg className="w-4 h-4 text-[#90909B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12.63px] font-['Inter'] text-[#1A1A1A] font-medium">Newest</span>
              <svg className="w-4 h-4 text-[#90909B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {[
            { name: 'Olivia McKinsey', preview: 'Oh my god 😂 I\'ll try it ASAP, thank...', time: '23:25', active: true },
            { name: 'Sara Williams', preview: 'Good Evening, Emily! Hope you are...', time: '23:15' },
            { name: 'Frank Thompson', preview: 'Thank you for signing up Frank! If t...', time: '22:58' },
            { name: 'Grace Lee', preview: 'I am sending you the report right a...', time: '22:42' },
            { name: 'Henry Adams', preview: 'Thank you for filling out our survey!', time: '22:18' },
            { name: 'Isabella Martinez', preview: 'I will update you soon Isabella!', time: '21:55' },
            { name: 'James Brown', preview: 'Hello James! Let\'s collaborate on...', time: '21:30' },
            { name: 'Katherine White', preview: 'Hi Katherine, looking forward to our...', time: '20:45' },
          ].map((chat) => (
            <div
              key={chat.name}
              onClick={() => setSelectedChat(chat.name.toLowerCase().replace(' ', ''))}
              className={classNames(
                'p-4 border-b border-[#D8DEE4] cursor-pointer transition-colors',
                chat.active ? 'bg-[#EFF2F2]' : 'hover:bg-[#EFF2F2]'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#007AEC] flex items-center justify-center text-white text-xs font-semibold">
                  {chat.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12.63px] font-['Inter'] font-medium text-[#1A1A1A]">{chat.name}</span>
                    <span className="text-[9.82px] font-['Inter'] text-[#90909B]">{chat.time}</span>
                  </div>
                  <p className="text-[11.23px] font-['Inter'] text-[#90909B] truncate">{chat.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="p-6 border-b border-[#D8DEE4]">
          <h2 className="text-[16.84px] font-['Inter'] font-semibold text-[#1A1A1A]">Olivia McKinsey</h2>
          <p className="text-[11.23px] font-['Inter'] text-[#90909B]">28 August 2025</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {messages.map((msg, i) => (
            <Message key={i} {...msg} />
          ))}
        </div>

        <div className="p-4 border-t border-[#D8DEE4]">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type something..."
              className="flex-1 px-4 py-3 bg-[#EFF2F2] rounded-[11.23px] text-[12.63px] font-['Inter'] text-[#1A1A1A] placeholder-[#90909B] outline-none"
            />
            <button className="w-10 h-10 bg-[#007AEC] rounded-[11.23px] flex items-center justify-center text-white hover:bg-[#0056A3] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[320px] border-l border-[#D8DEE4] bg-white p-6">
        <h3 className="text-[14px] font-['Inter'] font-semibold text-[#1A1A1A] mb-4">Details</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-[11.23px] font-['Inter'] font-medium text-[#90909B] mb-3">Chat Data</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[11.23px] font-['Inter'] text-[#90909B]">Assignee</span>
                <span className="text-[11.23px] font-['Inter'] text-[#1A1A1A] font-medium">James West</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11.23px] font-['Inter'] text-[#90909B]">Team</span>
                <span className="text-[11.23px] font-['Inter'] text-[#1A1A1A] font-medium">Sales Team</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[11.23px] font-['Inter'] font-medium text-[#90909B] mb-3">Contact Data</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[11.23px] font-['Inter'] text-[#90909B]">First Name</span>
                <span className="text-[11.23px] font-['Inter'] text-[#1A1A1A]">Olivia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11.23px] font-['Inter'] text-[#90909B]">Last Name</span>
                <span className="text-[11.23px] font-['Inter'] text-[#1A1A1A]">McKinsey</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11.23px] font-['Inter'] text-[#90909B]">Phone number</span>
                <span className="text-[11.23px] font-['Inter'] text-[#1A1A1A]">+1 (312) 555-0134</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11.23px] font-['Inter'] text-[#90909B]">Email</span>
                <span className="text-[11.23px] font-['Inter'] text-[#1A1A1A]">olivia.Mckinsey@gmail.com</span>
              </div>
            </div>
            <button className="text-[11.23px] font-['Inter'] text-[#007AEC] mt-2">See all</button>
          </div>

          <div>
            <h4 className="text-[11.23px] font-['Inter'] font-medium text-[#90909B] mb-3">Contact Labels</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#EFF2F2] rounded-[5.61px] text-[9.82px] font-['Inter'] text-[#1A1A1A]">Closed Won</span>
              <span className="px-3 py-1 bg-[#EFF2F2] rounded-[5.61px] text-[9.82px] font-['Inter'] text-[#1A1A1A]">Chicago</span>
            </div>
          </div>

          <div>
            <h4 className="text-[11.23px] font-['Inter'] font-medium text-[#90909B] mb-3">Notes</h4>
            <button className="w-full text-left px-3 py-2 bg-[#EFF2F2] rounded-[5.61px] text-[11.23px] font-['Inter'] text-[#90909B] mb-2">
              Add a note
            </button>
            <div className="p-3 bg-[#EFF2F2] rounded-[5.61px]">
              <p className="text-[11.23px] font-['Inter'] text-[#1A1A1A]">Strong potential for future upgrades</p>
            </div>
          </div>

          <div>
            <h4 className="text-[11.23px] font-['Inter'] font-medium text-[#90909B] mb-3">Other Chats</h4>
            <div className="p-3 bg-[#EFF2F2] rounded-[5.61px] flex items-center justify-between">
              <span className="text-[11.23px] font-['Inter'] text-[#1A1A1A]">Fit4Life</span>
              <span className="text-[9.82px] font-['Inter'] text-[#90909B]">On my way!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};