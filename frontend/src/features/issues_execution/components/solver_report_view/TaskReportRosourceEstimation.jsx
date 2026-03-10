import React from "react";

const TaskReportRosourceEstimation = ({ taskData }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Work & Budget Estimation
        </h2>
        <span className="text-xs font-bold text-blue-600">
          Admin Review Pending
        </span>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Budget
            </p>
            <p className="text-xl font-bold text-slate-900">
              ₹{taskData?.latest_report?.estimated_budget?.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Duration
            </p>
            <p className="text-xl font-bold text-slate-900">
              {taskData?.latest_report?.estimated_duration_days} Days
            </p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Reach
            </p>
            <p className="text-xl font-bold text-slate-900">
              {taskData?.latest_report?.estimated_people_affected}+
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 p-4 border border-amber-100 bg-amber-50/30 rounded-lg">
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
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-tighter">
                Site Constraints
              </p>
              <p className="text-sm text-slate-600 mt-0.5">
                {taskData?.latest_report?.site_constraints}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskReportRosourceEstimation;
