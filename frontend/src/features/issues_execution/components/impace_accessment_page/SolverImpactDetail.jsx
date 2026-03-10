import React from "react";
const data = "Impact data is crucial for scheduling execution teams. Ensure the estimation is as realistic as possible."
const SolverImpactDetail = ({ taskContext, bottomText = data }) => {
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
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            Current Task
          </label>
          <p className="text-sm font-bold text-slate-700 leading-snug">
            {taskContext?.issue_title}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Task Ref
            </label>
            <p className="text-xs font-mono font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded mt-1">
              {taskContext?.reference_id}
            </p>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Issue ID
            </label>
            <p className="text-xs font-mono font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded mt-1">
              {taskContext?.issue_reference}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pt-4">
          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
            <label className="text-[10px] font-bold text-blue-500 uppercase">
              Category
            </label>
            <p className="text-xs font-bold text-slate-700">
              {taskContext?.category_name}
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              Zone
            </label>
            <p className="text-xs font-bold text-slate-700">
              {taskContext?.zone}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
          <svg
            className="w-5 h-5 text-amber-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <p className="text-[11px] text-amber-700 leading-relaxed">
            <strong>Note:</strong> {bottomText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolverImpactDetail;
