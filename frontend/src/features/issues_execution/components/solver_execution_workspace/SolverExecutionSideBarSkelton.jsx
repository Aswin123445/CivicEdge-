import React from "react";

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

const SolverExecutionSideBarSkelton = () => {
  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="sticky top-28 space-y-6">

        {/* Task Information Skeleton */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Skeleton className="h-4 w-32 mb-6" />

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </section>

        {/* Contractor Information Skeleton */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Skeleton className="h-4 w-32 mb-6" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </section>

        {/* Execution Actions Skeleton */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Skeleton className="h-4 w-20 mb-6" />

          <div className="flex flex-col gap-3">
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </section>

      </div>
    </div>
  );
};

export default SolverExecutionSideBarSkelton;