import React from "react";

const SolverCardSkelton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((card) => (
        <div
          key={card}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-3 w-full">
              <div className="h-5 w-48 bg-slate-200 rounded" />
              <div className="h-3 w-32 bg-slate-100 rounded" />
            </div>

            <div className="h-6 w-20 bg-slate-100 rounded-full" />
          </div>

          <div className="h-6 w-3/4 bg-slate-300 rounded mb-3" />
          <div className="h-3 w-40 bg-slate-100 rounded mb-6" />

          <div className="flex items-center justify-between">
            <div className="h-3 w-44 bg-slate-100 rounded" />
            <div className="h-10 w-32 bg-slate-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolverCardSkelton;
