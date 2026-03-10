import React from "react";

const SolverImpactHeader = () => {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Field Verification Report
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
        <p className="text-blue-600 font-bold text-sm">
          Step 2 — Impact Assessment
        </p>
        <span className="hidden md:inline text-slate-300">•</span>
        <p className="text-slate-500 text-sm italic">
          Assess how the reported issue affects the surrounding community.
        </p>
      </div>
    </header>
  );
};

export default SolverImpactHeader;
