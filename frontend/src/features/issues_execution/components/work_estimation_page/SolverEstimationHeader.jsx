import React from "react";

const SolverEstimationHeader = () => {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Field Verification Report
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
        <p className="text-blue-600 font-bold text-sm">
          Step 3 — Work Estimation
        </p>
        <span className="hidden md:inline text-slate-300">•</span>
        <p className="text-slate-500 text-sm italic">
          Estimate the resources required to resolve this issue.
        </p>
      </div>
    </header>
  );
};

export default SolverEstimationHeader;
