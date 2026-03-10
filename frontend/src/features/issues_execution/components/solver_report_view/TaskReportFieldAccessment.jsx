import React from "react";

const TaskReportFieldAccessment = ({ taskData }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Field Assessment
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase">
            Issue Confirmation
          </label>
          <p className="text-sm font-semibold text-slate-800 flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Verified on Site
          </p>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase">
            Severity Impact
          </label>
          <p className="mt-1">
            <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-100 uppercase">
              {taskData?.latest_report?.severity_level}
            </span>
          </p>
        </div>
        <div className="col-span-full">
          <label className="text-[10px] font-bold text-slate-400 uppercase">
            Public Impact Summary
          </label>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {taskData?.latest_report?.public_impact_summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskReportFieldAccessment;
