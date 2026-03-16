import React from "react";
import { formatDate } from "../../../../utils/datenormalize";

const PageHeader = ({ proofData , handleOpenModal}) => {
  const date = formatDate(proofData?.issue?.created_at);
  return (
    <header className="mb-8 border-b border-slate-700 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-sm mb-1">
            <span className="bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Execution Proof: {proofData?.reference_id}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {proofData?.issue.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-slate-400 text-sm">
            <span>
              Issue ID:{" "}
              <span className="text-slate-200">
                {proofData?.issue.reference_id}
              </span>
            </span>
            <span className="hidden md:block text-slate-600">|</span>
            <span>
              Submitted: <span className="text-slate-200">{date}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenModal("REJECT")}
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 font-semibold transition-all shadow-sm"
          >
            Reject & Rework
          </button>
          <button
            onClick={() => handleOpenModal("APPROVE")}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-semibold transition-all shadow-sm"
          >
            Approve Completion
          </button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
