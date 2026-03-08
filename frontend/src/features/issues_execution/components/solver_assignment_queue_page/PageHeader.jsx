import React from "react";

const PageHeader = ({ itemCount }) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Solver Assignment Queue
          </h1>
          <p className="text-slate-400 mt-1">
            Review "In-Review" issues and delegate to expert solvers.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#1e1e1e] border border-slate-700 px-4 py-2 rounded-lg">
            <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">
              Queue Status
            </span>
            <span className="text-emerald-400 font-medium">
              Active • {itemCount} Pending
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
