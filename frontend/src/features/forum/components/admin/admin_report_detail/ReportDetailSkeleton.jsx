import React from "react";

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700/60 rounded ${className}`} />
);

const ReportDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      
      {/* LEFT COLUMN */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        
        {/* ReportInfoCard */}
        <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-6">
              
              {/* Reported By */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>

            </div>

            {/* Status Badge */}
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Reason Section */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* TargetContentCard */}
        <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-5 w-16 rounded" />
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-12 lg:col-span-4">
        <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-6 sticky top-6 space-y-4">
          
          {/* Title */}
          <Skeleton className="h-5 w-40" />

          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Button */}
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

    </div>
  );
};

export default ReportDetailSkeleton;