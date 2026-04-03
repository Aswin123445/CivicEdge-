// components/admin/events/update/UpdateEventFormFooter.jsx
import { Loader2 } from "lucide-react";

/**
 * @param {boolean}  isDirty      - true when form has unsaved changes
 * @param {boolean}  loading      - mutation in flight
 * @param {boolean}  disabled     - event is locked
 * @param {function} onSubmit
 * @param {function} onCancel
 */
const UpdateEventFormFooter = ({
  isDirty,
  loading,
  disabled,
  onSubmit,
  onCancel,
}) => (
  <div className="sticky bottom-0 left-0 right-0 bg-[#1e1e1e]/90 backdrop-blur-md border-t border-slate-800 p-4 z-50 rounded-t-2xl">
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <button
        type="button"
        onClick={onCancel}
        className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-200 transition-colors"
      >
        Cancel Changes
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={!isDirty || loading || disabled}
        className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-10 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Updating...
          </>
        ) : (
          "Update Event"
        )}
      </button>
    </div>
  </div>
);

export default UpdateEventFormFooter;
