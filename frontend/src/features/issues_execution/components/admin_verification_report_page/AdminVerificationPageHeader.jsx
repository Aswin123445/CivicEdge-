import React from "react";
import { formatDate } from "../../../../utils/datenormalize";

const AdminVerificationPageHeader = ({ reportData }) => {
  const date = formatDate(reportData?.submitted_at);
  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">
            {reportData?.reference_id}
          </span>
          <span className="text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full">
            {reportData?.issue_status}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
          Verification Report Review
        </h1>
        <p className="text-slate-400 mt-1">
          Issue: <span className="text-blue-400">{reportData?.issue_reference_id}</span> •
          Solver: {reportData?.solver_email}
        </p>
      </div>
      <div className="text-right text-sm text-slate-500">
        Last Updated: {date}
      </div>
    </header>
  );
};

export default AdminVerificationPageHeader;
