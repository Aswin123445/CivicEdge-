import React from 'react'
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-700/60 rounded-lg ${className}`} />
);


const AnalyticsFetchingSkelton = () => {
    return (
    <div className="bg-[#1e1e1e] p-4 md:p-8 animate-in fade-in duration-500">
      {/* KPI CARDS SKELETON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS SKELETON */}
      <div className="grid grid-cols-12 gap-6">
        {/* Trend Chart Large */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 h-[380px]">
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-full w-full" />
          </div>
        </div>
        {/* Pie Chart Small */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 h-[380px] flex flex-col items-center">
            <div className="w-full"><Skeleton className="h-6 w-48 mb-8" /></div>
            <Skeleton className="h-48 w-48 rounded-full" />
            <div className="mt-8 space-y-2 w-full">
               <Skeleton className="h-3 w-full" />
               <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsFetchingSkelton
