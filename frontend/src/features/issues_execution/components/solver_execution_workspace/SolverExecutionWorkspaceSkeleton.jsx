import React from "react";

const SolverExecutionWorkspaceSkeleton = () => {
  return (
    <div className="bg-white p-6">

      {/* ================= HEADER ================= */}
      <div className="mb-8 space-y-4">
        <div className="h-4 w-40 rounded bg-slate-200 animate-pulse"></div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-8 w-96 rounded bg-slate-200 animate-pulse"></div>

          {/* Progress section */}
          <div className="flex items-center gap-4">
            <div className="w-48">
              <div className="h-2 w-full rounded bg-slate-200 animate-pulse"></div>
            </div>
            <div className="h-6 w-20 rounded bg-slate-200 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* ================= GRID LAYOUT ================= */}
      <div className="grid grid-cols-12 gap-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="col-span-12 lg:col-span-8 space-y-6">

          {/* Section Title */}
          <div className="h-6 w-48 rounded bg-slate-200 animate-pulse"></div>

          {/* Timeline Card Skeleton */}
          {[1,2].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
            >
              {/* Header Row */}
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="h-4 w-24 rounded bg-slate-200 animate-pulse"></div>
                  <div className="h-4 w-32 rounded bg-slate-200 animate-pulse"></div>
                </div>
                <div className="h-10 w-16 rounded bg-slate-200 animate-pulse"></div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <div className="h-5 w-full rounded bg-slate-200 animate-pulse"></div>
                <div className="h-5 w-3/4 rounded bg-slate-200 animate-pulse"></div>
              </div>

              {/* Blockers */}
              <div className="rounded-lg bg-slate-100 p-4 space-y-2">
                <div className="h-3 w-32 rounded bg-slate-200 animate-pulse"></div>
                <div className="h-4 w-full rounded bg-slate-200 animate-pulse"></div>
              </div>

              {/* Next Steps */}
              <div className="space-y-2">
                <div className="h-3 w-28 rounded bg-slate-200 animate-pulse"></div>
                <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse"></div>
              </div>

              {/* Evidence Placeholder */}
              <div className="h-40 w-60 rounded-lg bg-slate-200 animate-pulse"></div>
            </div>
          ))}

        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          {/* Task Information Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="h-4 w-32 rounded bg-slate-200 animate-pulse"></div>

            {[1,2,3,4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 rounded bg-slate-200 animate-pulse"></div>
                <div className="h-4 w-28 rounded bg-slate-200 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Contractor Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-200 animate-pulse"></div>

            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-slate-200 animate-pulse"></div>
              <div className="h-3 w-24 rounded bg-slate-200 animate-pulse"></div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="h-4 w-24 rounded bg-slate-200 animate-pulse"></div>

            <div className="h-10 w-full rounded bg-slate-200 animate-pulse"></div>
            <div className="h-10 w-full rounded bg-slate-200 animate-pulse"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolverExecutionWorkspaceSkeleton;