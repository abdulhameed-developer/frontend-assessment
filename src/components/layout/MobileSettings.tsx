// File: src/components/layout/MobileSettings.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

interface MobileSettingsProps {
  onClose: () => void;
}

export const MobileSettings: React.FC<MobileSettingsProps> = ({ onClose }) => {
  const { user, logout, updateUser, uploadAvatar } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'help'>('profile');

  if (!user) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const saveProfile = async () => {
    if (avatarFile) {
      await uploadAvatar(avatarFile);
    }
    if (editedUser) {
      updateUser(editedUser);
    }
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onClose} className="p-2 -ml-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex pt-14 border-b border-gray-200">
        {['profile', 'notifications', 'privacy', 'help'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3 text-sm font-medium capitalize ${
              activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {editMode ? (
              // Edit Mode
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-pink-500 overflow-hidden">
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
                        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600">First Name</label>
                  <input
                    type="text"
                    value={editedUser?.firstName}
                    onChange={(e) => setEditedUser({ ...editedUser!, firstName: e.target.value })}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Last Name</label>
                  <input
                    type="text"
                    value={editedUser?.lastName}
                    onChange={(e) => setEditedUser({ ...editedUser!, lastName: e.target.value })}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    value={editedUser?.email}
                    onChange={(e) => setEditedUser({ ...editedUser!, email: e.target.value })}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <input
                    type="tel"
                    value={editedUser?.phone}
                    onChange={(e) => setEditedUser({ ...editedUser!, phone: e.target.value })}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Bio</label>
                  <textarea
                    value={editedUser?.bio}
                    onChange={(e) => setEditedUser({ ...editedUser!, bio: e.target.value })}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={saveProfile}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="flex-1 border border-gray-300 py-3 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-pink-500 overflow-hidden">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.firstName}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <span className="text-sm text-green-600">● Online</span>
                  </div>
                </div>

                {/* Profile Info Cards */}
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">{user.role}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{user.department}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{user.location}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Bio</p>
                    <p className="font-medium">{user.bio}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mb-3"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-medium"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive push notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive email updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Message Sounds</h3>
                <p className="text-sm text-gray-500">Play sound for new messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Online Status</h3>
                <p className="text-sm text-gray-500">Show when you're online</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Read Receipts</h3>
                <p className="text-sm text-gray-500">Show when you've read messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Blocked Users</h3>
                <p className="text-sm text-gray-500">Manage blocked users</p>
              </div>
              <button className="text-blue-600">Manage</button>
            </div>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="space-y-4">
            <button className="w-full p-4 text-left bg-gray-50 rounded-lg">
              <h3 className="font-medium">FAQ</h3>
              <p className="text-sm text-gray-500">Frequently asked questions</p>
            </button>
            <button className="w-full p-4 text-left bg-gray-50 rounded-lg">
              <h3 className="font-medium">Contact Support</h3>
              <p className="text-sm text-gray-500">Get help from our team</p>
            </button>
            <button className="w-full p-4 text-left bg-gray-50 rounded-lg">
              <h3 className="font-medium">Terms of Service</h3>
              <p className="text-sm text-gray-500">Read our terms</p>
            </button>
            <button className="w-full p-4 text-left bg-gray-50 rounded-lg">
              <h3 className="font-medium">Privacy Policy</h3>
              <p className="text-sm text-gray-500">Read our privacy policy</p>
            </button>
            <div className="p-4 text-center text-gray-500">
              <p>Version 1.0.0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};