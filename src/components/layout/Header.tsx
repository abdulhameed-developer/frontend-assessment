// File: src/components/layout/Header.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const Header: React.FC = () => {
  const { user, logout, updateUser, uploadAvatar } = useAuth();
  const { setFilterType, setSortBy } = useChat();
  const [activeNav, setActiveNav] = useState('Inbox');
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
        setEditMode(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleCloseDropdowns = () => {
      setProfileOpen(false);
      setEditMode(false);
    };

    document.addEventListener('closeAllDropdowns', handleCloseDropdowns);
    return () => document.removeEventListener('closeAllDropdowns', handleCloseDropdowns);
  }, []);

  if (!user) return null;

  const navItems: NavItem[] = [
    {
      id: 'Inbox',
      label: 'Inbox',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12H2M5.5 12H2L8 20h8l6-8h-3.5M16 4l-4-4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'Contacts',
      label: 'Contacts',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      id: 'AI Employees',
      label: 'AI Employees',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8M8 12h8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'Workflows',
      label: 'Workflows',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4v16h16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 16l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'Campaigns',
      label: 'Campaigns',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round"/>
          <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <header className="fixed z-50 w-full top-1">
        <div className="w-full lg:w-[1188.77px] lg:mx-auto px-4 lg:px-0">
          {/* Main Header Container - Exact dimensions */}
          <div 
            className="w-full lg:w-[1188.77px] h-[39.3px] bg-white rounded-[11.23px] py-[7.02px] px-[11.23px] flex items-center justify-between gap-[5.61px] mx-auto"
            style={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}
          >
            {/* Left Section with Logo and Navigation */}
            <div className="flex items-center gap-[5.61px] flex-1">
              {/* Logo with Mobile Menu Toggle */}
              <div className="flex items-center gap-2">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[5.61px] hover:bg-gray-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Logo - Poppins Bold 12.63px */}
                <span className="font-poppins-bold text-[#1A1D1F]">
                  BOX<span className="text-blue-600">pad</span>
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-[5.61px] ml-[5.61px]">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveNav(item.id);
                      if (item.id === 'Inbox') setFilterType('all');
                      else if (item.id === 'Contacts') setFilterType('unread');
                      else if (item.id === 'Workflows') setSortBy('unread');
                    }}
                    className={`flex items-center gap-[5.61px] px-[7.02px] py-0 h-[23.86px] rounded-[5.61px] transition-colors ${
                      activeNav === item.id
                        ? 'bg-gray-100 border-[0.7px] border-gray-300'
                        : 'bg-transparent border-[0.7px] border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-[14.04px] h-[14.04px] flex items-center justify-center ${
                      activeNav === item.id ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="font-sf-compact-medium text-[9.82px] leading-[100%] text-[#000000]">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-[5.61px]">
              {/* Settings Icon - Double Border */}
              <button className="relative w-[29.47px] h-[25.26px] group">
                {/* Outer Border */}
                <div className="absolute inset-0 border border-gray-300 rounded-[5.61px] group-hover:border-blue-600 transition-colors" />
                {/* Inner Border */}
                <div className="absolute inset-[3px] border border-gray-400 rounded-[4px] flex items-center justify-center group-hover:border-blue-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="1.5" fill="#1F2937"/>
                    <circle cx="10" cy="4" r="1.5" fill="#1F2937"/>
                    <circle cx="10" cy="16" r="1.5" fill="#1F2937"/>
                    <circle cx="16" cy="10" r="1.5" fill="#1F2937"/>
                    <circle cx="4" cy="10" r="1.5" fill="#1F2937"/>
                    <circle cx="14" cy="6" r="1.5" fill="#1F2937"/>
                    <circle cx="6" cy="14" r="1.5" fill="#1F2937"/>
                    <circle cx="14" cy="14" r="1.5" fill="#1F2937"/>
                    <circle cx="6" cy="6" r="1.5" fill="#1F2937"/>
                  </svg>
                </div>
              </button>

              {/* User Profile */}
              <div className="relative profile-container" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-[5.61px] focus:outline-none profile-button px-[8.42px] py-0 h-[25.26px] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {/* Avatar Container */}
                  <div className="relative w-[19.65px] h-[19.65px]">
                    {/* Background Circle */}
                    <div className="absolute inset-0 bg-pink-500 rounded-full" />
                    {/* Avatar or Initials */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.firstName}
                          width={19.65}
                          height={19.65}
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <span className="font-sf-compact-medium text-[9.82px] leading-[100%] text-white">
                          {user.firstName[0]}{user.lastName[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Username - Inter Semi Bold 9.82px */}
                  <span className="hidden lg:block font-inter-semibold text-[9.82px] leading-[100%] text-[#000000]">
                    {user.firstName} {user.lastName}
                  </span>

                  {/* Dropdown Arrow */}
                  <svg className="hidden w-3 h-3 text-gray-400 lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-80 animate-fadeIn profile-dropdown">
                    {editMode ? (
                      <div className="p-4 max-h-[80vh] overflow-y-auto">
                        <h3 className="font-sf-compact-bold text-[12.63px] mb-4">Edit Profile</h3>
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <div className="relative">
                              <div className="w-24 h-24 overflow-hidden bg-pink-500 rounded-full">
                                {avatarFile ? (
                                  <Image
                                    src={URL.createObjectURL(avatarFile)}
                                    alt="Preview"
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                  />
                                ) : user.avatar ? (
                                  <Image
                                    src={user.avatar}
                                    alt={user.firstName}
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-white font-sf-compact-medium text-[12px]">
                                    {user.firstName[0]}{user.lastName[0]}
                                  </div>
                                )}
                              </div>
                              <label className="absolute bottom-0 right-0 p-2 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setAvatarFile(e.target.files[0]);
                                    }
                                  }}
                                />
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </label>
                            </div>
                          </div>
                          <input
                            type="text"
                            value={editedUser?.firstName || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, firstName: e.target.value } : prev)}
                            className="w-full px-3 py-2 border rounded-lg font-sf-compact-regular text-[10.73px]"
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            value={editedUser?.lastName || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, lastName: e.target.value } : prev)}
                            className="w-full px-3 py-2 border rounded-lg font-sf-compact-regular text-[10.73px]"
                            placeholder="Last Name"
                          />
                          <input
                            type="email"
                            value={editedUser?.email || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, email: e.target.value } : prev)}
                            className="w-full px-3 py-2 border rounded-lg font-sf-compact-regular text-[10.73px]"
                            placeholder="Email"
                          />
                          <input
                            type="tel"
                            value={editedUser?.phone || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, phone: e.target.value } : prev)}
                            className="w-full px-3 py-2 border rounded-lg font-sf-compact-regular text-[10.73px]"
                            placeholder="Phone"
                          />
                          <textarea
                            value={editedUser?.bio || ''}
                            onChange={(e) => setEditedUser(prev => prev ? { ...prev, bio: e.target.value } : prev)}
                            className="w-full px-3 py-2 border rounded-lg font-sf-compact-regular text-[10.73px]"
                            placeholder="Bio"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                if (avatarFile) {
                                  await uploadAvatar(avatarFile);
                                }
                                if (editedUser) {
                                  updateUser(editedUser);
                                }
                                setEditMode(false);
                                setProfileOpen(false);
                              }}
                              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-sf-compact-medium text-[9.82px] hover:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditMode(false)}
                              className="flex-1 border border-gray-300 py-2 rounded-lg font-sf-compact-medium text-[9.82px] hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 overflow-hidden bg-pink-500 rounded-full">
                              {user.avatar ? (
                                <Image
                                  src={user.avatar}
                                  alt={user.firstName}
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white font-sf-compact-medium text-[12px]">
                                  {user.firstName[0]}{user.lastName[0]}
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-sf-compact-medium text-[9.82px] text-gray-900">{user.firstName} {user.lastName}</h4>
                              <p className="font-sf-compact-regular text-[10.73px] text-gray-500">{user.email}</p>
                              <span className="font-sf-compact-number text-[8.42px] text-green-600">● Online</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="font-sf-compact-regular text-[10.73px] text-gray-500 w-20">Role:</span>
                            <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{user.role}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-sf-compact-regular text-[10.73px] text-gray-500 w-20">Department:</span>
                            <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{user.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-sf-compact-regular text-[10.73px] text-gray-500 w-20">Phone:</span>
                            <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-sf-compact-regular text-[10.73px] text-gray-500 w-20">Location:</span>
                            <span className="font-sf-compact-medium text-[9.82px] text-gray-900">{user.location}</span>
                          </div>
                          <div className="pt-2 font-sf-compact-regular text-[10.73px] text-gray-600 border-t">
                            {user.bio}
                          </div>
                        </div>
                        <div className="flex gap-2 p-4 border-t border-gray-200">
                          <button
                            onClick={() => setEditMode(true)}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white font-sf-compact-medium text-[9.82px] rounded-lg hover:bg-blue-700"
                          >
                            Edit Profile
                          </button>
                          <button
                            onClick={logout}
                            className="flex-1 px-3 py-2 border border-red-300 text-red-600 font-sf-compact-medium text-[9.82px] rounded-lg hover:bg-red-50"
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div 
            ref={mobileMenuRef}
            className="fixed bottom-0 left-0 z-50 w-64 bg-white shadow-lg top-16 lg:hidden animate-slideIn"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-poppins-bold text-[12.63px] text-[#1A1D1F]">
                  BOX<span className="text-blue-600">pad</span>
                </span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeNav === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-sf-compact-medium text-[9.82px]">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};