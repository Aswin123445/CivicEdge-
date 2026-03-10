import React from "react";
import { formatDate } from "../../../../utils/datenormalize";

const ComplaintOverviewCardSolver = ({ taskData }) => {
  const date = formatDate(taskData?.issue_created_at);
  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300">
      <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        Complaint Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-tight">
            Issue ID
          </label>
          <p className="text-sm font-semibold text-slate-700">
            {taskData.issue_reference}
          </p>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-tight">
            Zone
          </label>
          <p className="text-sm font-semibold text-slate-700">
            {taskData.zone}
          </p>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-tight">
            Reported On
          </label>
          <p className="text-sm font-semibold text-slate-700">
            {date}
          </p>
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-tight block mb-2">
          Description
        </label>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <p className="text-slate-600 leading-relaxed text-sm">
            {taskData?.issue_description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComplaintOverviewCardSolver;
