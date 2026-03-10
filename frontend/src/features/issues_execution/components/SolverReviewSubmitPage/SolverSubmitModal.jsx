import React from "react";

const SolverSubmitModal = ({ setShowConfirmModal, handleFinalSubmit, isSubmitting }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-slate-900">Confirm Submission</h3>
        <p className="text-slate-600 mt-2">
          Are you sure you want to submit this report? Once submitted, the
          verification data <strong>cannot be edited</strong>.
        </p>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Yes, Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolverSubmitModal;
