// components/admin/events/detail/AdminActionsPanel.jsx
import { Info } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./EventDetailPrimitives";


// ─── Skeleton ─────────────────────────────────────────
export const AdminActionsPanelSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-800/50">
      <Skeleton className="h-3 w-28" />
    </div>
    <div className="p-6 space-y-3">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-11 w-full rounded-xl" />
      <Skeleton className="h-11 w-full rounded-xl" />
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object}   event       - { status, runtime_status }
 * @param {function} onPublish
 * @param {function} onCancel
 */
const AdminActionsPanel = ({ event, onPublish, onCancel }) => {
  if (!event) return <AdminActionsPanelSkeleton />;

  const isTerminal =
    event.status === "CANCELLED" || event.runtime_status === "COMPLETED";

  return (
    <SectionCard title="Admin Actions">
      <div className="space-y-3">
        {isTerminal ? (
          <div className="flex items-center gap-3 p-4 bg-[#1e1e1e] border border-slate-800 rounded-xl text-slate-500">
            <Info size={16} className="shrink-0" />
            <p className="text-xs font-bold">Lifecycle actions completed.</p>
          </div>
        ) : (
          <>
            <p className="text-[10px] text-slate-500 font-bold mb-2">
              Perform lifecycle transitions
            </p>

            {event.status === "DRAFT" && (
              <button
                onClick={onPublish}
                className="w-full py-3 bg-[#1e1e1e] hover:bg-blue-600 hover:text-white border border-slate-800 text-blue-400 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
              >
                Publish to Network
              </button>
            )}

            <button
              onClick={onCancel}
              className="w-full py-3 bg-[#1e1e1e] hover:bg-red-600 hover:text-white border border-slate-800 text-red-400 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
            >
              Terminate Event
            </button>
          </>
        )}
      </div>
    </SectionCard>
  );
};

export default AdminActionsPanel;
