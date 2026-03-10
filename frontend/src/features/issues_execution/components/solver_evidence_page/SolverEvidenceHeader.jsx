import React from "react";

const SolverEvidenceHeader = () => {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Field Verification Report
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
        <p className="text-blue-600 font-bold text-sm">
          Step 4 — Evidence Upload
        </p>
        <span className="hidden md:inline text-slate-300">•</span>
        <p className="text-slate-500 text-sm italic">
          Upload photos or videos showing the current condition of the issue.
        </p>
      </div>
    </header>
  );
};

export default SolverEvidenceHeader;
