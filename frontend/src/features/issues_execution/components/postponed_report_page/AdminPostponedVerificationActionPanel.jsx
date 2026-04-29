import React from "react";

const AdminPostponedVerificationActionPanel = ({ openModal, isModalOpen }) => {
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
      </div>
    </div>
  );
};

export default AdminPostponedVerificationActionPanel;
