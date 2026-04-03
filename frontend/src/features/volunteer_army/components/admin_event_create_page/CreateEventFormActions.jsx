// components/admin/events/create/CreateEventFormActions.jsx
import { Loader2 } from "lucide-react";

/**
 * @param {boolean}  isSubmitting
 * @param {function} onSubmit
 * @param {function} onCancel
 */
const CreateEventFormActions = ({ isSubmitting, onSubmit, onCancel }) => (
  <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900">
    <button
      type="button"
      onClick={onCancel}
      className="w-full sm:w-auto px-10 py-4 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-200 transition-colors"
    >
      Cancel Draft
    </button>

    <button
      type="button"
      onClick={onSubmit}
      disabled={isSubmitting}
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-12 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-3"
    >
      {isSubmitting ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Processing...
        </>
      ) : (
        "Commit Event"
      )}
    </button>
  </div>
);

export default CreateEventFormActions;
