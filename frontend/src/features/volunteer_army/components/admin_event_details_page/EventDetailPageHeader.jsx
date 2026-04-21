// components/admin/events/detail/EventDetailPageHeader.jsx
import { MoreHorizontal ,ArrowLeft,Pencil} from "lucide-react";
import Skeleton from "./Skeleton";
import { RuntimeBadge, StatusBadge } from "./EventDetailPrimitives";
import { useNavigate } from "react-router-dom";

// ─── Skeleton ─────────────────────────────────────────
export const EventDetailPageHeaderSkeleton = () => (
  <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <div className="space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-32 rounded-xl" />
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
  </header>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object}   event
 * @param {function} onPublish
 * @param {function} onCancel
 */


const EventDetailPageHeader = ({ event, onPublish, onCancel }) => {
  const navigate = useNavigate();

  if (!event) return <EventDetailPageHeaderSkeleton />;

  const canPublish = event.status === "DRAFT";
  const canCancel =
    event.status === "PUBLISHED" && event.runtime_status === "UPCOMING";

  const canUpdate = event.status !== "CANCELLED" && event.runtime_status !== "COMPLETED" && event.runtime_status !== "LIVE";

  return (
    <div className="mb-10 space-y-6">

      {/* 🔙 Back Button */}
      <button
        onClick={() => {
          if (window.history.length > 1) navigate(-1);
          else navigate("/events");
        }}
        className="flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Left Section */}
        <div className="space-y-4">
          
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={event.status} />
            <RuntimeBadge status={event.runtime_status} />
          </div>

          {/* Title + Meta */}
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              {event.title ?? "Untitled Event"}
            </h1>

            <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">
              {event.reference_id ?? "—"}
              {event.group_name && (
                <>
                  <span className="mx-2 opacity-30">•</span>
                  {event.group_name}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Section (Actions) */}
        <div className="flex items-center gap-3 flex-wrap">

          {/* Publish */}
          {canPublish && (
            <button
              onClick={onPublish}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
              Publish Event
            </button>
          )}

          {/* Cancel */}
          {canCancel && (
            <button
              onClick={onCancel}
              className="bg-[#1e1e1e] border border-red-500/30 text-red-400 hover:bg-red-500/10 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
            >
              Cancel Event
            </button>
          )}

          {/* Update */}
          {canUpdate && (
            <button
              onClick={() => navigate(`/dashboard/volunteer/events/${event.id}/update`)}
              className="flex items-center gap-2 bg-[#1e1e1e] border border-slate-700 text-slate-200 hover:bg-slate-800 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
            >
              <Pencil size={14} />
              Update Event
            </button>
          )}

        </div>
      </header>
    </div>
  );
};

export default EventDetailPageHeader;