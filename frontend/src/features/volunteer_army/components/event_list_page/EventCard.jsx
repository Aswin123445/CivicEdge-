// components/volunteer/EventCard.jsx
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventCountdown from "./EventCountdown";
import EventStatusBadge from "./EventStatusBadge";

// ─── Skeleton ────────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const EventCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-full space-y-4">
    {/* Header row */}
    <div className="flex justify-between items-start gap-4">
      <div className="space-y-2 flex-1">
        <Pulse className="h-5 w-3/4" />
        <Pulse className="h-5 w-2/4" />
        <Pulse className="h-6 w-28 rounded-md" />
      </div>
      <Pulse className="h-6 w-20 rounded-full flex-shrink-0" />
    </div>

    {/* Body */}
    <div className="space-y-3 flex-grow">
      <Pulse className="h-3 w-24" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Pulse className="w-4 h-4 rounded flex-shrink-0" />
          <Pulse className="h-4 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Pulse className="w-4 h-4 rounded flex-shrink-0" />
          <Pulse className="h-4 w-32" />
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
      <Pulse className="h-4 w-20" />
      <Pulse className="h-4 w-20" />
    </div>
  </div>
);

// ─── Component ───────────────────────────────────────────
/**
 * @param {object} event - {
 *   id, title, group_name, start_time, end_time,
 *   location_name, capacity, filled_count, runtime_status
 * }
 */
const EventCard = ({ event, group_id }) => {
  const navigate = useNavigate();
  if (!event) return null;

  const filledCount = event.filled_count ?? 0;
  const capacity = event.capacity ?? 0;
  const runtimeStatus = event.runtime_status ?? "";
  const isFull = capacity > 0 && filledCount >= capacity;
  const isCompleted = runtimeStatus === "COMPLETED";
  const isUpcoming = runtimeStatus === "UPCOMING";

  const formattedDate = event.start_time
    ? new Date(event.start_time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const formattedTime = event.start_time
    ? new Date(event.start_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={`group bg-white border border-slate-200 rounded-xl p-6 shadow-sm transition-all duration-300 flex flex-col h-full
        ${
          isCompleted
            ? "opacity-75 grayscale-[0.5] cursor-pointer"
            : `hover:border-blue-400 hover:shadow-md cursor-pointer`
        }`}
      onClick={() => {
        navigate(`/volunteer-army/${group_id}/events/${event?.id}`);
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <h3 className="text-slate-900 font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {event.title ?? "Untitled Event"}
          </h3>
          {isUpcoming && event.start_time && (
            <EventCountdown startTime={event.start_time} />
          )}
        </div>
        <EventStatusBadge status={runtimeStatus} />
      </div>

      {/* Body */}
      <div className="space-y-3 mb-6 flex-grow">
        {event.group_name && (
          <div className="text-blue-600 text-xs font-bold uppercase tracking-wide">
            {event.group_name}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center text-slate-500 text-sm">
            <Calendar size={16} className="mr-2 shrink-0" />
            <span>
              {formattedDate}
              {formattedTime ? ` • ${formattedTime}` : ""}
            </span>
          </div>

          {event.location_name && (
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin size={16} className="mr-2 shrink-0" />
              <span className="truncate">{event.location_name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        {runtimeStatus !== "LIVE" && runtimeStatus !== "COMPLETED" && (
          <div
            className={`flex items-center gap-1.5 text-sm font-bold ${isFull ? "text-amber-600" : "text-slate-700"}`}
          >
            <Users size={16} />
            {capacity > 0
              ? isFull
                ? "Full"
                : `${filledCount} / ${capacity}`
              : "Open"}
          </div>
        )}

        <button
          className={`flex items-center gap-1 text-sm font-bold transition-all
            ${"text-blue-600 group-hover:gap-2 cursor-pointer  "} ml-auto`}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/volunteer-army/${group_id}/events/${event?.id}`);
          }}
        >
          View Event <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
