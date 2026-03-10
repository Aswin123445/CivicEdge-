import React from "react";

const SolverSideBarColumn = ({ taskContext }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-8">
      <h2 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        Task Information
      </h2>

      <div className="space-y-4">
        <div className="pb-4 border-b border-slate-50">
          <label className="text-[10px] font-bold text-slate-400 uppercase">
            Issue Title
          </label>
          <p className="text-sm font-semibold text-slate-700">
            {taskContext?.issue_title}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              Task ID
            </label>
            <p className="text-sm font-mono font-bold text-slate-700">
              {taskContext?.reference_id}
            </p>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              Issue ID
            </label>
            <p className="text-sm font-mono font-bold text-slate-700">
              {taskContext?.issue_reference}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              Category
            </label>
            <p className="text-sm font-bold text-slate-700">
              {taskContext?.category_name}
            </p>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              Zone
            </label>
            <p className="text-sm font-bold text-slate-700">
              {taskContext?.zone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolverSideBarColumn;
