// components/admin/events/EventActionsDropdown.jsx
import { Eye, Edit3, Send, XCircle } from "lucide-react";

/**
 * @param {object}   event       - event object
 * @param {function} onView
 * @param {function} onEdit
 * @param {function} onPublish
 * @param {function} onCancel
 */
const EventActionsDropdown = ({ event, onView, onEdit, onPublish, onCancel }) => {
  if (!event) return null;

  const canEdit =
    event.status === "DRAFT" ||
    (event.status === "PUBLISHED" && event.runtime_status === "UPCOMING");

  const canPublish = event.status === "DRAFT";

  const canCancel =
    event.status === "PUBLISHED" && event.runtime_status !== "COMPLETED";

  return (
    <div className="absolute right-6 top-14 w-44 bg-[#1e1e1e] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
      <button
        onClick={onView}
        className="w-full px-4 py-3 text-left text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center gap-2"
      >
        <Eye size={14} /> View Details
      </button>

      {canEdit && (
        <button
          onClick={onEdit}
          className="w-full px-4 py-3 text-left text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center gap-2 border-t border-slate-800"
        >
          <Edit3 size={14} /> Edit Event
        </button>
      )}

      {canPublish && (
        <button
          onClick={onPublish}
          className="w-full px-4 py-3 text-left text-xs font-bold text-green-400 hover:bg-green-500/10 flex items-center gap-2 border-t border-slate-800"
        >
          <Send size={14} /> Publish Event
        </button>
      )}

      {canCancel && (
        <button
          onClick={onCancel}
          className="w-full px-4 py-3 text-left text-xs font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2 border-t border-slate-800"
        >
          <XCircle size={14} /> Cancel Event
        </button>
      )}
    </div>
  );
};

export default EventActionsDropdown;
