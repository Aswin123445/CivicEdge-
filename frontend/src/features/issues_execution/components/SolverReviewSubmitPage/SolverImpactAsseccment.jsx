import React from "react";

const SolverImpactAsseccment = ({ reportData }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-6 relative">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
        Impact Assessment
      </h3>
      <div className="mb-4">
        <p className="text-xs text-slate-500">Estimated People Affected</p>
        <p className="text-sm font-bold text-slate-900">
          {reportData?.estimated_people_affected} Citizens
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Public Impact Summary</p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {reportData?.public_impact_summary}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Local Feedback</p>
          <p className="text-sm text-slate-700 leading-relaxed italic border-l-2 border-slate-200 pl-4">
            "{reportData?.local_feedback_summary}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolverImpactAsseccment;
