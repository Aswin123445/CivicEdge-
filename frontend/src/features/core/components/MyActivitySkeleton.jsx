// COMPONENT: MyActivitySkeleton
// Move to: components/common/MyActivitySkeleton.jsx

import React from "react";

const MyActivitySkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      
      {/* Two Activity Card Skeletons */}
      {[1, 2].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm"
        >
          {/* Top Row */}
          <div className="flex justify-between items-start mb-3">
            <div className="h-4 w-16 bg-gray-200 rounded-md" />
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      ))}

      {/* CTA Card Skeleton */}
      <div className="flex flex-col items-center justify-center p-6 bg-blue-600/70 rounded-2xl border border-blue-700 min-h-[160px]">
        
        <div className="mb-3 w-10 h-10 bg-white/20 rounded-full" />
        
        <div className="h-4 w-32 bg-white/20 rounded mb-2" />
        <div className="h-3 w-24 bg-white/20 rounded" />

        <div className="mt-4 h-3 w-20 bg-white/20 rounded" />
      </div>
    </div>
  );
};

export default MyActivitySkeleton;