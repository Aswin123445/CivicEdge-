import ContextRow from "../../ui/verification_entry_page/ContextRow";

const EntryTaskContextCard = ({ taskContext }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sticky top-8">
      <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Task Context
      </h3>

      <div className="space-y-5">
        <ContextRow label="Task ID" value={taskContext?.reference_id} isMono />
        <ContextRow label="Issue ID" value={taskContext?.issue_reference} isMono />
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mb-1">
            Issue Title
          </label>
          <p className="text-sm font-semibold text-slate-700 leading-snug">
            {taskContext?.issue_title}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <ContextRow label="Category" value={taskContext?.category_name} />
          <ContextRow label="Zone" value={taskContext?.zone} />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <button className="w-full py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Cancel & Return
        </button>
      </div>
    </div>
  );
};

export default EntryTaskContextCard;
