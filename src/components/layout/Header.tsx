// File: src/components/layout/Header.tsx
"use client";

import { fetchUserProfile } from "@/services/api";
import { User } from "@/types/navigation.types";
import { SkeletonAvatar, SkeletonBlock } from "@/ui";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("Inbox");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const navItems = [
    "Inbox",
    "Contacts",
    "AI Employees",
    "Workflows",
    "Campaigns",
  ];

  return (
    <header className="w-full bg-white border-b border-[#E9EDF2] lg:rounded-[11.23px] py-[7.02px] px-[11.23px] lg:w-[1188.77px] lg:mx-auto">
      <div className="flex items-center justify-between gap-[5.61px]">
        {/* Left Section with Logo and Desktop Navigation */}
        <div className="flex items-center gap-[5.61px] flex-1 lg:flex-none">
          {/* Logo with Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[5.61px] hover:bg-[#EFF2F2]"
            >H
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
              </svg>
            </button>
            
            {/* Logo */}
            <div className="max-w-[81.4px] pr-[16.84px]">
              <span className="text-[12.63px] lg:text-[16px] font-[700] text-[#1A1D1F] tracking-[-0.02em]">
                BOX<span className="text-[#2A85FF]">pad</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`h-[23.86px] px-[7.02px] border-[0.7px] rounded-[5.61px] text-[9.82px] font-medium transition-all whitespace-nowrap ${
                  activeNav === item
                    ? "bg-[#EFF2F2] border-[#D8DEE4] text-[#1A1D1F]"
                    : "border-transparent text-[#6F767E] hover:bg-[#EFF2F2] hover:text-[#1A1D1F]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Settings Icon */}
          <button className="relative flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 group">
            <div className="absolute inset-0 border border-[#E9EDF2] rounded-[6px] lg:rounded-[8px] group-hover:border-[#2A85FF] transition-colors" />
            <div className="absolute inset-[2px] lg:inset-[3px] border border-[#9A9FA5] rounded-[4px] lg:rounded-[5px] flex items-center justify-center group-hover:border-[#2A85FF] transition-colors">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="lg:w-[18px] lg:h-[18px]"
              >
                <circle cx="10" cy="10" r="1.5" fill="#1A1D1F"/>
                <circle cx="10" cy="4" r="1.5" fill="#1A1D1F"/>
                <circle cx="10" cy="16" r="1.5" fill="#1A1D1F"/>
                <circle cx="16" cy="10" r="1.5" fill="#1A1D1F"/>
                <circle cx="4" cy="10" r="1.5" fill="#1A1D1F"/>
                <circle cx="14" cy="6" r="1.5" fill="#1A1D1F"/>
                <circle cx="6" cy="14" r="1.5" fill="#1A1D1F"/>
                <circle cx="14" cy="14" r="1.5" fill="#1A1D1F"/>
                <circle cx="6" cy="6" r="1.5" fill="#1A1D1F"/>
              </svg>
            </div>
          </button>

          {/* User Profile */}
          {loading ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <SkeletonAvatar size="w-8 h-8 lg:w-9 lg:h-9" />
              <SkeletonBlock width="w-20 lg:w-24" height="h-4" className="hidden sm:block" />
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="relative w-8 h-8 lg:w-9 lg:h-9 rounded-full overflow-hidden border-2 border-[#E9EDF2]">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user?.first_name || ""}
                    fill
                    sizes="(max-width: 768px) 32px, 36px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-[#2A85FF] flex items-center justify-center text-white text-xs lg:text-sm font-semibold">
                    MJ
                  </div>
                )}
              </div>
              <span className="text-[12px] lg:text-[14px] font-medium text-[#1A1D1F] hidden sm:block">
                {user
                  ? `${user.first_name} ${user.last_name}`
                  : "Michael Johnson"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-[#E9EDF2] animate-fadeIn">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveNav(item);
                  setMobileMenuOpen(false);
                }}
                className={`h-[32px] px-3 rounded-[5.61px] text-[11px] font-medium text-left transition-all ${
                  activeNav === item
                    ? "bg-[#EFF2F2] text-[#1A1D1F]"
                    : "text-[#6F767E] hover:bg-[#EFF2F2] hover:text-[#1A1D1F]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};