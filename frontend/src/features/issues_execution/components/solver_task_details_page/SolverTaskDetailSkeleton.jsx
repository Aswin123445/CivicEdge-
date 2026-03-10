import React from "react";

// Inline Skeleton to match your base style but adapted for light theme
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);


export default function SolverTaskDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 space-y-8">
      {/* --- Page Header Mimic --- */}
      <header className="max-w-7xl mx-auto mb-8 space-y-4">
        <Skeleton className="h-3 w-32 bg-slate-100" /> {/* Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24 rounded bg-blue-100/50" /> {/* ID */}
              <Skeleton className="h-5 w-20 rounded-full" /> {/* Status */}
            </div>
            <Skeleton className="h-8 w-64 md:w-96" /> {/* Title */}
            <Skeleton className="h-4 w-48 opacity-60" /> {/* Category */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        
        {/* --- LEFT COLUMN: Investigation Content --- */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Complaint Overview Card */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100">
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-16 opacity-50" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </div>
              <div className="space-y-3 bg-slate-50/50 p-4 rounded-lg">
                <Skeleton className="h-3 w-20 opacity-50" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          {/* Evidence Gallery Mimic */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Location Card Mimic */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-grow space-y-4">
              <Skeleton className="h-4 w-36" />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-2 w-12" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-2 w-12" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </div>
            <Skeleton className="h-10 w-full md:w-40 rounded-lg self-center" />
          </div>
        </div>

        {/* --- RIGHT COLUMN: Sidebar Action Panel --- */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Workflow Status Card */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
              <Skeleton className="h-3 w-32 mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-14 w-full rounded-xl bg-blue-600/10 mt-4" /> {/* Primary Action Button */}
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
            <Skeleton className="h-4 w-40" />
            <div className="space-y-4 divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="flex justify-between pt-4 first:pt-0">
                  <Skeleton className="h-3 w-20 opacity-50" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}