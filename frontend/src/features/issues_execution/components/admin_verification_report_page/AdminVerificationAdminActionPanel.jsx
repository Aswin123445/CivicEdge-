import React from "react";

const AdminVerificationAdminActionPanel = ({ openModal , isModalOpen}) => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-5 ring-1 ring-slate-700/50">
      <h3 className="text-sm font-semibold text-slate-100 mb-4">Take Action</h3>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => openModal("APPROVED")}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-all shadow-lg shadow-emerald-900/20"
        >
          Approve & Assign
        </button>
        <button
          onClick={() => openModal("POSTPONED")}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg border border-slate-700 transition-colors"
        >
          Postpone
        </button>
        {/* <div className="grid grid-cols-2 gap-3">
           <button
            onClick={() => openModal("ESCALATED")}
            className="bg-slate-800 hover:bg-slate-700 text-orange-400 py-2 rounded-lg border border-slate-700 transition-colors"
          >
            Escalate
          </button> 
        </div>*/}
        <button
          onClick={() => openModal("BLOCKED")}
          className="w-full bg-transparent hover:bg-red-500/10 text-red-500 border border-red-500/20 py-2 rounded-lg transition-all"
        >
          Invalid Issue
        </button>
      </div>
    </div>
  );
};

export default AdminVerificationAdminActionPanel;
