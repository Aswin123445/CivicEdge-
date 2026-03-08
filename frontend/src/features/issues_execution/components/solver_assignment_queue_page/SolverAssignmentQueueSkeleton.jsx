import React from "react";
import Skeleton from "../../../../components/common/skelton";

export default function SolverAssignmentQueueSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 rounded-md" />
          <Skeleton className="h-4 w-96 opacity-50" />
        </div>
        <Skeleton className="h-12 w-40 rounded-lg bg-[#1f1f1f] border border-[#1f2937]" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Side: Table Skeleton (col-span-8) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl overflow-hidden">
            {/* Table Header Mimic */}
            <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-[#1f2937] bg-slate-800/20">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16 justify-self-end" />
            </div>

            {/* Table Rows Mimic */}
            <div className="divide-y divide-[#1f2937]">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="grid grid-cols-6 items-center gap-4 px-6 py-5">
                  <Skeleton className="h-4 w-24 rounded bg-blue-500/10" />
                  
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24 opacity-50" />
                  </div>

                  <Skeleton className="h-3 w-32" />

                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-12 opacity-40" />
                  </div>

                  <div className="col-span-2 justify-self-end">
                    <Skeleton className="h-9 w-28 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar Skeletons (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Stats Card Skeleton */}
          <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl p-6 space-y-6">
            <Skeleton className="h-4 w-32 mb-2" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center border-b border-[#1f2937] pb-4 last:border-0 last:pb-0">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>

          {/* Workflow Info Skeleton */}
          <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl p-6 space-y-6">
            <Skeleton className="h-4 w-40" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-full opacity-50" />
                </div>
              </div>
            ))}
            {/* Pro Tip Box */}
            <div className="pt-4 border-t border-[#1f2937]">
              <Skeleton className="h-16 w-full rounded-lg opacity-30" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}