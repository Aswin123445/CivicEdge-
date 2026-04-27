// ----------------------------------------------------------------------
// COMPONENT: PollAnalyticsSkeleton
// ----------------------------------------------------------------------

export function PollAnalyticsFetchingSkeleton() {
  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">

        {/* KPI Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex justify-between">
                <div className="h-10 w-10 bg-gray-700/50 rounded-lg animate-pulse" />
                <div className="h-6 w-12 bg-gray-700/50 rounded-full animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse" />
                <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section Skeleton */}
        <div className="grid grid-cols-12 gap-6">
          {/* Large Chart Skeleton */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 h-[420px] flex flex-col">
              <div className="space-y-2 mb-8">
                <div className="h-6 w-48 bg-gray-700/50 rounded animate-pulse" />
                <div className="h-4 w-64 bg-gray-700/50 rounded animate-pulse" />
              </div>
              <div className="flex-1 w-full bg-gray-700/20 rounded-lg animate-pulse flex items-end justify-between p-4">
                {/* Visual "Bar" placeholders for the line chart area */}
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 bg-gray-700/30 rounded-t animate-pulse" 
                    style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Small Chart Skeleton */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 h-[420px] flex flex-col">
              <div className="space-y-2 mb-8">
                <div className="h-6 w-40 bg-gray-700/50 rounded animate-pulse" />
                <div className="h-4 w-56 bg-gray-700/50 rounded animate-pulse" />
              </div>
              <div className="flex-1 space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-3 w-24 bg-gray-700/50 rounded animate-pulse" />
                      <div className="h-3 w-8 bg-gray-700/50 rounded animate-pulse" />
                    </div>
                    <div className="h-3 w-full bg-gray-700/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-700/50 animate-pulse" 
                        style={{ width: `${100 - (i * 15)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}