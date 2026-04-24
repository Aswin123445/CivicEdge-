

import React from "react";

// COMPONENT: Skeleton Base
// Move to: components/common/Skeleton.jsx
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-700/40 rounded-lg ${className}`} />
);

/**
 * CIVICEDGE ANALYTICS SKELETON
 * Designed to match the AnalyticsUserDashboardPage layout precisely.
 */
const AnalyticsDashboardFetchingSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] min-h-screen text-slate-300">
      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-8">

        {/* STATS CARDS SKELETON */}
        <section className="space-y-6">
          <Skeleton className="h-4 w-40" /> {/* Section Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 flex justify-between items-center">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            ))}
          </div>

          {/* CHARTS GRID SKELETON */}
          <div className="grid grid-cols-12 gap-6">
            {/* PIE CHART SKELETON */}
            <div className="col-span-12 lg:col-span-4 bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 h-[420px]">
              <div className="mb-8 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex flex-col items-center justify-center space-y-6">
                <Skeleton className="h-48 w-48 rounded-full border-8 border-slate-800" /> {/* Pie Circle */}
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </div>

            {/* LINE CHART SKELETON */}
            <div className="col-span-12 lg:col-span-8 bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 h-[420px]">
              <div className="mb-8 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="relative h-64 w-full pt-4">
                 {/* Mock Chart Lines */}
                <Skeleton className="h-[2px] w-full absolute bottom-0" /> {/* X Axis */}
                <Skeleton className="h-full w-[2px] absolute left-0" />   {/* Y Axis */}
                <div className="flex items-end justify-between h-full px-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-1/2 w-1 rounded-full opacity-30" />
                  ))}
                </div>
              </div>
            </div>

            {/* HORIZONTAL BAR CHART SKELETON */}
            <div className="col-span-12 bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 h-[400px]">
              <div className="mb-8 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3 w-64" />
              </div>
              <div className="space-y-6 px-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-20" /> {/* Zone Label */}
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-[70%] rounded-r-full" /> {/* Bar 1 */}
                      <Skeleton className="h-4 w-[40%] rounded-r-full" /> {/* Bar 2 */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsDashboardFetchingSkeleton;
