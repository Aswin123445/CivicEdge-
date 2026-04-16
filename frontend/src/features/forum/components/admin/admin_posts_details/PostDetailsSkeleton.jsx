import React from 'react';
import Skeleton from '../../../../../components/common/Skelton';

const PostDetailsSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] p-6 lg:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SKELETON */}
        <header className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </header>

        <main className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* User Info Section */}
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-6 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16 ml-auto" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="border-l border-slate-800 pl-4 space-y-2">
                  <Skeleton className="h-3 w-16 ml-auto" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>

            {/* Post Content Section */}
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-8 space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Media Gallery Grid */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="aspect-video rounded-lg" />
                <Skeleton className="aspect-video rounded-lg" />
              </div>
            </div>

            {/* Engagement Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#1e1e1e] border border-slate-800 p-4 rounded-xl flex flex-col items-center space-y-3">
                  <Skeleton className="w-6 h-6 rounded-md" />
                  <Skeleton className="h-6 w-10" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Control Panel */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-6 sticky top-6 space-y-6">
              <div>
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="p-3 bg-[#1e1e1e] border border-slate-800 rounded-lg mb-6 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="w-full h-12 rounded-lg" />
                <Skeleton className="w-full h-12 rounded-lg" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostDetailsSkeleton;