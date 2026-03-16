import React from "react";

const PercentageLoader = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Progress Skeleton */}
      <div className="text-right hidden sm:block">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-200 ml-auto mb-2"></div>

        <div className="mt-1 flex items-center gap-3">
          {/* Progress Bar Skeleton */}
          <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200 animate-pulse"></div>

          {/* Percentage Skeleton */}
          <div className="h-4 w-8 animate-pulse rounded bg-slate-300"></div>
        </div>
      </div>

      {/* Status Badge Skeleton */}
      <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200 border border-slate-200"></div>
    </div>
  );
};

export default PercentageLoader;
