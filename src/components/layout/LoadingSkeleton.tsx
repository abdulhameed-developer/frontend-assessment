// File: src/components/layout/LoadingSkeleton.tsx
"use client";

import React from "react";
import { SkeletonBlock, SkeletonText, SkeletonAvatar } from "@/components/ui";

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-300 mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <SkeletonBlock width="w-24" height="h-8" />
              <div className="items-center hidden gap-1 lg:flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonBlock
                    key={i}
                    width="w-20"
                    height="h-10"
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SkeletonBlock
                width="w-10"
                height="h-10"
                className="rounded-lg"
              />
              <div className="flex items-center gap-3">
                <SkeletonAvatar size="w-9 h-9" />
                <SkeletonBlock
                  width="w-24"
                  height="h-4"
                  className="hidden lg:block"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <div className="max-w-300 mx-auto px-4 pt-20">
        <div className="flex gap-4">
          {/* Left Sidebar Skeleton */}
          <div className="hidden lg:block w-65 space-y-6">
            <div>
              <SkeletonBlock width="w-full" height="h-6" className="mb-4" />
              <div className="space-y-2">
                <SkeletonBlock width="w-full" height="h-8" />
                <SkeletonBlock width="w-full" height="h-8" />
              </div>
            </div>
            <div>
              <SkeletonBlock width="w-full" height="h-6" className="mb-4" />
              <div className="space-y-2">
                <SkeletonBlock width="w-full" height="h-8" />
                <SkeletonBlock width="w-full" height="h-8" />
              </div>
            </div>
            <div>
              <SkeletonBlock width="w-full" height="h-6" className="mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <SkeletonAvatar size="w-6 h-6" />
                    <SkeletonBlock width="w-32" height="h-4" />
                    <SkeletonBlock width="w-6" height="h-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat List Skeleton */}
          <div className="hidden lg:block w-[320px]">
            <SkeletonBlock
              width="w-full"
              height="h-10"
              className="mb-4 rounded-lg"
            />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 border-b border-gray-100"
                >
                  <SkeletonAvatar size="w-10 h-10" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <SkeletonBlock width="w-32" height="h-4" />
                      <SkeletonBlock width="w-12" height="h-3" />
                    </div>
                    <SkeletonText lines={1} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window Skeleton */}
          <div className="flex-1 hidden lg:block">
            <div className="mb-4">
              <SkeletonBlock width="w-40" height="h-6" className="mb-1" />
              <SkeletonBlock width="w-24" height="h-4" />
            </div>
            <div className="mb-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${i % 2 === 0 ? "" : "justify-end"}`}
                >
                  {i % 2 === 0 && <SkeletonAvatar size="w-6 h-6" />}
                  <div className={i % 2 === 0 ? "flex-1" : ""}>
                    <SkeletonBlock
                      width={i % 2 === 0 ? "w-3/4" : "w-2/3"}
                      height="h-16"
                      className="rounded-lg"
                    />
                  </div>
                  {i % 2 !== 0 && <SkeletonAvatar size="w-6 h-6" />}
                </div>
              ))}
            </div>
            <SkeletonBlock
              width="w-full"
              height="h-12"
              className="rounded-lg"
            />
          </div>

          {/* Details Panel Skeleton */}
          <div className="hidden lg:block w-70">
            <SkeletonBlock
              width="w-full"
              height="h-32"
              className="mb-4 rounded-lg"
            />
            <SkeletonText lines={4} className="mb-4" />
            <div className="flex gap-2 mb-4">
              <SkeletonBlock width="w-16" height="h-6" />
              <SkeletonBlock width="w-16" height="h-6" />
            </div>
            <SkeletonBlock
              width="w-full"
              height="h-24"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
