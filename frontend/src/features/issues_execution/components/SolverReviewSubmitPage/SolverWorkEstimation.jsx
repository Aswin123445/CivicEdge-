import React from "react";

const SolverWorkEstimation = ({ reportData }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-6 relative">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
        Work Estimation
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-500">Estimated Budget</p>
          <p className="text-lg font-bold text-slate-900">
            ₹{reportData?.estimated_budget.toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-500">Expected Duration</p>
          <p className="text-lg font-bold text-slate-900">
            {reportData?.estimated_duration_days} Days
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter mb-1">
            Site Constraints
          </p>
          <p className="text-sm text-slate-700">
            {reportData?.site_constraints}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter mb-1 text-red-500">
            Execution Risks
          </p>
          <p className="text-sm text-slate-700">
            {reportData?.execution_risks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolverWorkEstimation;
