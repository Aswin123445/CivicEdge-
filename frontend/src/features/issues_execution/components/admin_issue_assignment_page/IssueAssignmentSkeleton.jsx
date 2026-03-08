import React from "react";
import Skeleton from "../../../../components/common/skelton";

export default function IssueAssignmentSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* --- Page Header Skeleton --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32 rounded bg-blue-500/20" />
          <Skeleton className="h-8 w-64 rounded-md" />
          <Skeleton className="h-4 w-80 opacity-50" />
        </div>
        <Skeleton className="h-10 w-48 rounded-lg bg-[#1f1f1f] border border-[#1f2937]" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* --- LEFT COLUMN: Issue Intelligence --- */}
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl overflow-hidden shadow-sm">
            {/* Header Mimic */}
            <div className="px-6 py-4 border-b border-[#1f2937] bg-slate-800/10">
              <Skeleton className="h-4 w-32" />
            </div>
            
            <div className="p-6 space-y-8">
              {/* Title & Description Mimic */}
              <div className="space-y-3">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-full opacity-40" />
              </div>

              {/* Info Grid Mimic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="space-y-2">
                    <Skeleton className="h-3 w-20 opacity-50" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            </div>

            {/* Slideable Image Area Mimic */}
            <div className="bg-[#lelele]:50 border-t border-[#1f2937] p-4 flex gap-4 overflow-hidden">
               <Skeleton className="h-40 w-full rounded-lg shrink-0" />
               <Skeleton className="h-40 w-24 rounded-lg shrink-0 opacity-30" />
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Solver Selection --- */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-[#lelele] border border-[#1f2937] rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
            {/* Sidebar Header */}
            <div className="px-6 py-4 border-b border-[#1f2937] flex justify-between items-center">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-24 rounded bg-emerald-500/10" />
            </div>

            <div className="p-4 space-y-4">
              {/* Search/Filter Mimic */}
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-10 flex-grow rounded-lg" />
                <Skeleton className="h-10 w-20 rounded-lg" />
              </div>

              {/* Solver Card Mimics */}
              {[1, 2, 3].map((card) => (
                <div key={card} className="bg-[#lelele]/50 border border-[#1f2937] rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex gap-2">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-20 rounded bg-slate-800" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md opacity-60" />
                </div>
              ))}
            </div>
            
            {/* Footer Mimic */}
            <div className="mt-auto p-4 border-t border-[#1f2937] bg-slate-800/5">
              <Skeleton className="h-3 w-2/3 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}