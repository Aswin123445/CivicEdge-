import React from "react";

const TaskContextCard = () => {
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
        Task Context
      </h2>

      <div className="space-y-4">
        <div className="pb-4 border-b border-slate-50">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            Current Task
          </label>
          <p className="text-sm font-bold text-slate-700 leading-tight">
            {taskContext.title}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Task Ref
            </label>
            <p className="text-xs font-mono font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded mt-1">
              {taskContext.task_id}
            </p>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Issue ID
            </label>
            <p className="text-xs font-mono font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded mt-1">
              {taskContext.issue_id}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase">
            Verification Area
          </label>
          <div className="flex items-center gap-2 mt-1">
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <p className="text-xs font-bold text-slate-700">
              {taskContext.zone}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
        <div className="text-blue-600">
          <svg
            className="w-5 h-5"
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
        </div>
        <p className="text-[11px] text-blue-700 leading-relaxed">
          <strong>Verification Quality:</strong> Ensure media is clear and
          properly lit. Administrators use these visuals to approve work
          budgets.
        </p>
      </div>
    </div>
  );
};

export default TaskContextCard;
