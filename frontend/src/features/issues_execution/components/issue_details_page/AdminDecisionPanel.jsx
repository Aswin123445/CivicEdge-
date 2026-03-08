const AdminDecisionPanel = ({
  issue,
  setIsApproveModalOpen,
  setIsRejectModalOpen,
}) => {
  return (
    <div className="lg:sticky lg:top-8 space-y-6">
      {/* COMPONENT: AdminDecisionPanel 
                Move to: components/admin/issues/AdminDecisionPanel.jsx
              */}
      <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Moderation Action</h2>
        <div className="space-y-4">
          <div className="p-3 bg-[#1e1e1e] rounded-lg border border-slate-800">
            <p className="text-xs text-slate-500 mb-1">Current Status</p>
            <p className="text-sm font-medium text-yellow-500 uppercase">
              {issue.status}
            </p>
          </div>

          <button
            onClick={() => setIsApproveModalOpen(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-all shadow-lg shadow-emerald-900/20"
          >
            Approve Issue
          </button>

          <button
            onClick={() => setIsRejectModalOpen(true)}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-2.5 rounded-lg transition-all shadow-lg shadow-red-900/20"
          >
            Reject Issue
          </button>
        </div>
        <p className="text-[11px] text-slate-500 mt-4 text-center leading-relaxed">
          Decisions are permanent and will notify the citizen via email.
        </p>
      </div>
    </div>
  );
};

export default AdminDecisionPanel;
