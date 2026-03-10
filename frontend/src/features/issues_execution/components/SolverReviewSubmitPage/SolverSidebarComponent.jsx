import React from "react";

const SolverSidebarComponent = ({ taskContext}) => {
  return (
    <aside className="col-span-12 lg:col-span-4 space-y-6">
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
          Reference Context
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Issue Title
            </label>
            <p className="text-sm font-bold text-slate-700">
              {taskContext.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-slate-50 py-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                Task ID
              </label>
              <p className="text-xs font-mono font-bold text-slate-500 mt-0.5">
                {taskContext.task_id}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                Issue ID
              </label>
              <p className="text-xs font-mono font-bold text-slate-500 mt-0.5">
                {taskContext.issue_id}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Category
              </label>
              <p className="text-xs font-bold text-slate-700">
                {taskContext.category}
              </p>
            </div>
            <div className="text-right">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Zone
              </label>
              <p className="text-xs font-bold text-slate-700">
                {taskContext.zone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SolverSidebarComponent;
