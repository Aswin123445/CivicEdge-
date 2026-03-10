import React from "react";

const SolverGroundVerification = ({ reportData }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-6 relative group">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
        Ground Verification
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500">Issue Present</p>
          <p className="text-sm font-bold text-slate-900">
            {reportData?.is_issue_present ? "Yes — Confirmed" : "No"}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Severity Level</p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded border border-red-100 uppercase">
            {reportData?.severity_level}
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-1">Affected Area Description</p>
        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
          {reportData?.affected_area_description}
        </p>
      </div>
    </div>
  );
};

export default SolverGroundVerification;
