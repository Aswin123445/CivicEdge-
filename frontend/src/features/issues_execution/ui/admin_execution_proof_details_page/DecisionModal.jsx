const DecisionModal = ({ type, onClose, onSubmit, isSubmitting }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#lelele]/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] text-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-100">
            {type === 'APPROVE' ? 'Approve Execution' : 'Reject & Request Rework'}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Reason for Decision (Internal)</label>
            <textarea 
              required
              name = 'reason'
              className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg p-3 text-slate-200 h-24 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Work verified against photos..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Message to Solver & Citizen </label>
            <textarea 
              required
              minLength={3}
              name = 'public_message'
              className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg p-3 text-slate-200 h-20 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Issue successfully resolved..."
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2 text-slate-400 hover:text-white font-medium">Cancel</button>
            <button 
              disabled={isSubmitting}
              type="submit"
              className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 ${
                type === 'APPROVE' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'
              } text-white transition-all`}
            >
              {isSubmitting ? 'Processing...' : `Confirm ${type === 'APPROVE' ? 'Approval' : 'Rejection'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DecisionModal;