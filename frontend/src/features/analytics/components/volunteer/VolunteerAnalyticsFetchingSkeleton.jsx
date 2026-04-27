import React from "react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-700/50 rounded-lg ${className}`} />
);

export default function VolunteerAnalyticsFetchingSkeleton() {
  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        

        <div className="space-y-6">

          {/* KPI Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-slate-700 rounded-xl p-5 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid Skeleton */}
          <div className="grid grid-cols-12 gap-6">
            {/* Big Chart */}
            <div className="col-span-12 lg:col-span-8">
              <div className="border border-slate-700 rounded-xl p-6 h-[400px] space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-[280px] w-full" />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="col-span-12 lg:col-span-4">
              <div className="border border-slate-700 rounded-xl p-6 h-[400px] flex flex-col items-center">
                <div className="w-full space-y-2 mb-8">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-48 w-48 rounded-full" />
                <div className="mt-8 flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>

            {/* Bottom Bar/Funnel Charts */}
            <div className="col-span-12 lg:col-span-6">
              <div className="border border-slate-700 rounded-xl p-6 h-[380px] space-y-6">
                <Skeleton className="h-6 w-40" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full" />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="border border-slate-700 rounded-xl p-6 h-[380px] space-y-6">
                <Skeleton className="h-6 w-40" />
                <div className="flex flex-col items-center justify-center pt-4">
                  <Skeleton className="h-10 w-full max-w-[280px]" />
                  <Skeleton className="h-10 w-[85%] max-w-[240px] mt-1" />
                  <Skeleton className="h-10 w-[70%] max-w-[200px] mt-1" />
                  <Skeleton className="h-10 w-[55%] max-w-[160px] mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}