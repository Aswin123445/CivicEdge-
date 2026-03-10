import React from "react";

const TaskReportFieldEvidence = ({ taskData }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
        Verification Evidence
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {taskData?.latest_report?.evidence.map((img) => (
          <div
            key={img.public_id}
            className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200"
          >
            <img
              src={img.secure_url}
              alt="Field evidence"
              className="w-full h-full object-cover transition transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <button className="px-3 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg shadow-lg">
                View Full
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskReportFieldEvidence;
