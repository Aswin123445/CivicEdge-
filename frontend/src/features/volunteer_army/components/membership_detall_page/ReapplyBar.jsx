// components/volunteer/ReapplyBar.jsx

/**
 * Shown only when status === "REJECTED"
 * @param {function} onReapply
 */
const ReapplyBar = ({ onReapply }) => (
  <div className="mt-8 p-6 bg-white border border-red-200 rounded-xl shadow-sm flex items-center justify-between">
    <span className="text-slate-600 font-medium">Want to try again?</span>
    <button
      onClick={onReapply}
      className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
    >
      Reapply Now
    </button>
  </div>
);

export default ReapplyBar;
