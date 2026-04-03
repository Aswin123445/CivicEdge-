// components/volunteer/EventDetailHeader.jsx
import { Users } from "lucide-react";

// ─── Skeleton ─────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const EventDetailHeaderSkeleton = () => (
  <div className="space-y-4">
    <div className="flex gap-2">
      <Pulse className="h-5 w-20 rounded-full" />
      <Pulse className="h-5 w-32" />
    </div>
    <Pulse className="h-10 w-3/4" />
    <Pulse className="h-10 w-1/2" />
    <div className="flex items-center gap-2">
      <Pulse className="w-5 h-5 rounded" />
      <Pulse className="h-5 w-40" />
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
const STATUS_STYLES = {
  UPCOMING:  "bg-blue-50 text-blue-600 border-blue-100",
  ONGOING:   "bg-green-50 text-green-600 border-green-100",
  COMPLETED: "bg-slate-50 text-slate-500 border-slate-200",
};

/**
 * @param {object} event - { runtime_status, reference_id, title, group_name }
 */
const EventDetailHeader = ({ event }) => {
  if (!event) return <EventDetailHeaderSkeleton />;

  const statusStyle = STATUS_STYLES[event.runtime_status] ?? "bg-slate-50 text-slate-500 border-slate-200";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {event.runtime_status && (
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyle}`}>
            {event.runtime_status}
          </span>
        )}
        {event.reference_id && (
          <span className="text-slate-400 text-xs font-mono">
            {event.reference_id}
          </span>
        )}
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {event.title ?? "Untitled Event"}
      </h1>

      {event.group_name && (
        <div className="flex items-center gap-2 text-blue-600 font-bold">
          <Users size={18} />
          <span>{event.group_name}</span>
        </div>
      )}
    </div>
  );
};

export default EventDetailHeader;
