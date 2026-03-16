import React from "react";

const AdminProofHeader = ({ metadata }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Execution Proof Review Queue
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Review solver completion submissions and verify the execution work
          before closing civic issues.
        </p>
      </div>
      <div className="flex items-center gap-2 bg-[#1e1e1e] border border-blue-500/20 px-4 py-2 rounded-lg">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="text-sm font-semibold text-blue-400">
          {metadata} Pending Proofs
        </span>
      </div>
    </header>
  );
};

export default AdminProofHeader;
