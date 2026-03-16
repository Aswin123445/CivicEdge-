import React from "react";

const SolverExecutionProgressTimelineSkeleton = ({ count = 3 }) => {
  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="mb-4 h-6 w-48 animate-pulse rounded bg-slate-300"></div>

      <div className="space-y-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              
              {/* Left content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-300"></div>
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-300"></div>
                </div>

                <div className="h-6 w-full animate-pulse rounded bg-slate-300"></div>
                <div className="h-6 w-3/4 animate-pulse rounded bg-slate-300"></div>
              </div>

              {/* Progress Box */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center">
                <div className="h-3 w-16 animate-pulse rounded bg-slate-300 mx-auto mb-2"></div>
                <div className="h-6 w-10 animate-pulse rounded bg-slate-300 mx-auto"></div>
              </div>
            </div>

            {/* Blocker placeholder */}
            <div className="mt-4 rounded-lg bg-slate-100 p-4 border border-slate-200">
              <div className="h-3 w-32 animate-pulse rounded bg-slate-300 mb-2"></div>
              <div className="h-4 w-full animate-pulse rounded bg-slate-300"></div>
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-300 mt-1"></div>
            </div>

            {/* Next steps */}
            <div className="mt-4 space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-slate-300"></div>
              <div className="h-4 w-full animate-pulse rounded bg-slate-300"></div>
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolverExecutionProgressTimelineSkeleton;