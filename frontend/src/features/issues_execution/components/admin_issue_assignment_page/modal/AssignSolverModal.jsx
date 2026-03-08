
const AssignSolverModal = ({ issue, selectedSolver, onConfirm, onClose, isAssigning ,handleConfirmAssignment, setIsModalOpen}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/10 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            Confirm Assignment
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            You are assigning{" "}
            <span className="text-blue-400 font-bold">
              {issue.reference_id}
            </span>{" "}
            to
            <span className="text-white font-bold italic">
              {" "}
              {selectedSolver?.name}
            </span>
            . The solver will be notified immediately via the CivicEdge
            Execution App.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {handleConfirmAssignment(selectedSolver)}}
              disabled={isAssigning}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-lg shadow-blue-900/20 disabled:opacity-50"
            >
              {isAssigning ? "Processing..." : "Confirm Assignment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignSolverModal;
