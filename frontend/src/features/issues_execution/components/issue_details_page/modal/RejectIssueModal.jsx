const RejectIssueModal = ({ open, handleDecision, setIsRejectModalOpen }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/10 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h3 className="text-xl font-bold mb-2 text-red-500">Reject Issue</h3>
        <p className="text-slate-400 text-sm mb-6">
          Please provide a reason for declining this report.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDecision({
              decision_type: "BLOCKED",
              reason: e.target.reason.value,
              public_message: e.target.public_message.value,
            });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Reason for Rejection *
            </label>
            <textarea
              required
              name="reason"
              className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              rows="3"
              placeholder="Explain the Rejection"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Public Message *
            </label>
            <textarea
              required
              name="public_message"
              className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              rows="3"
              placeholder="This message will be visible to the citizen who reported the issue."
            ></textarea>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsRejectModalOpen(false)}
              className="flex-1 px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-colors"
            >
              Reject Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectIssueModal;
