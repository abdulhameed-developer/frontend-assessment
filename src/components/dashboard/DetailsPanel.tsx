// File: src/components/dashboard/DetailsPanel.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/types/navigation.types";
import { fetchUserProfile } from "@/services/api";
import { SkeletonBlock, SkeletonText } from "@/ui";

export const DetailsPanel: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-[280px] border-l border-[#E5E7EB] bg-white p-4">
        <SkeletonBlock width="w-full" height="h-6" className="mb-4" />
        <SkeletonText lines={2} className="mb-4" />
        <SkeletonText lines={4} className="mb-4" />
        <SkeletonBlock width="w-full" height="h-8" className="mb-4" />
        <SkeletonText lines={2} className="mb-4" />
        <SkeletonBlock width="w-full" height="h-12" />
      </div>
    );
  }

  return (
    <div className="w-[280px] border-l border-[#E5E7EB] bg-white p-4">
      {/* User Profile from API with Next.js Image */}
      {user && (
        <div className="mb-6 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#E5E7EB]">
              <Image
                src={user.avatar}
                alt={user.first_name}
                fill
                sizes="48px"
                className="object-cover"
                priority={false}
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#111827]">
                {user.first_name} {user.last_name}
              </h4>
              <p className="text-xs text-[#6B7280]">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-sm font-semibold text-[#111827] mb-4">Details</h3>

      {/* Chat Data */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-[#6B7280] uppercase mb-2">
          Chat Data
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-[#6B7280]">Assignee</span>
            <span className="text-xs font-medium text-[#111827]">
              James West
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#6B7280]">Team</span>
            <span className="text-xs font-medium text-[#111827]">
              Sales Team
            </span>
          </div>
        </div>
      </div>

      {/* Contact Data */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-[#6B7280] uppercase mb-2">
          Contact Data
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-[#6B7280]">First Name</span>
            <span className="text-xs text-[#111827]">Olivia</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#6B7280]">Last Name</span>
            <span className="text-xs text-[#111827]">Mckinsey</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#6B7280]">Phone number</span>
            <span className="text-xs text-[#111827]">+1 (312) 555-0134</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#6B7280]">Email</span>
            <span className="text-xs text-[#111827]">
              olivia.Mckinsey@gmail.com
            </span>
          </div>
        </div>
        <button className="text-xs text-[#2563EB] mt-1">See all</button>
      </div>

      {/* Contact Labels */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-[#6B7280] uppercase mb-2">
          Contact Labels
        </h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-[#F3F4F6] rounded-[4px] text-xs text-[#111827]">
            Closed Won
          </span>
          <span className="px-2 py-1 bg-[#F3F4F6] rounded-[4px] text-xs text-[#111827]">
            Chicago
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-[#6B7280] uppercase mb-2">
          Notes
        </h4>
        <button className="w-full text-left px-3 py-2 bg-[#F9FAFB] rounded-[4px] text-xs text-[#9CA3AF] mb-2">
          Add a note
        </button>
        <div className="p-3 bg-[#F9FAFB] rounded-[4px]">
          <p className="text-xs text-[#111827]">
            Strong potential for future upgrades
          </p>
        </div>
      </div>

      {/* Other Chats */}
      <div>
        <h4 className="text-xs font-medium text-[#6B7280] uppercase mb-2">
          Other Chats
        </h4>
        <div className="p-3 bg-[#F9FAFB] rounded-[4px] flex items-center justify-between">
          <span className="text-xs font-medium text-[#111827]">Fit4Life</span>
          <span className="text-xs text-[#6B7280]">On my way!</span>
        </div>
      </div>
    </div>
  );
};