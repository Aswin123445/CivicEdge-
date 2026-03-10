import React from "react";

const SolverFormActionbutton = ({ setShowConfirmModal }) => {
  return (
    <div className="pt-4 flex items-center justify-between">
      <button
        onClick={() => {
          window.history.back();
        }}
        type="button"
        className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition shadow-sm"
      >
        back
      </button>
      <button
        onClick={() => setShowConfirmModal(true)}
        className="px-10 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg active:scale-95 flex items-center gap-2"
      >
        Submit Verification Report
      </button>
    </div>
  );
};

export default SolverFormActionbutton;
