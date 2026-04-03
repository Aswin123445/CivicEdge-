// components/admin/events/EventTable.jsx
import { useState } from "react";
import { MoreVertical, Users, Calendar } from "lucide-react";
import Skeleton from "./Skeleton";
import { EventStatusBadge, RuntimeStatusBadge } from "./EventBadges";
import EventActionsDropdown from "./EventActionsDropdown";


// ─── Helpers ──────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short",
  });
};

const formatTimeRange = (start, end) => {
  const opts = { hour: "2-digit", minute: "2-digit", hour12: true };
  const s = start ? new Date(start).toLocaleTimeString("en-US", opts) : "—";
  const e = end   ? new Date(end).toLocaleTimeString("en-US", opts)   : "";
  return e ? `${s} – ${e}` : s;
};

// ─── Skeleton ─────────────────────────────────────────
export const EventTableSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800">
            {["Reference", "Event Detail", "Date & Time", "Runtime", "Status", "Action"].map((h) => (
              <th key={h} className="px-6 py-4">
                <Skeleton className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              {/* Reference */}
              <td className="px-6 py-5">
                <Skeleton className="h-4 w-28" />
              </td>
              {/* Event detail */}
              <td className="px-6 py-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </td>
              {/* Date */}
              <td className="px-6 py-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </td>
              {/* Runtime badge */}
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-5 w-20 rounded-full mx-auto" />
              </td>
              {/* Status */}
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-4 w-20 mx-auto" />
              </td>
              {/* Action */}
              <td className="px-6 py-5 text-right">
                <Skeleton className="h-8 w-8 rounded-lg ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Fetching overlay row ──────────────────────────────
// Shown as a subtle shimmer banner when isFetching (background refetch)
export const EventTableFetchingBanner = () => (
  <div className="w-full h-0.5 bg-blue-500 animate-pulse rounded-full mb-2" />
);

// ─── Empty state ───────────────────────────────────────
const EventTableEmpty = ({ onCreateEvent }) => (
  <div className="py-20 text-center space-y-4">
    <Calendar size={48} className="mx-auto text-slate-800" />
    <div className="space-y-1">
      <p className="text-slate-400 font-bold">No events found</p>
      <p className="text-slate-600 text-xs">
        Try adjusting your filters or search terms.
      </p>
    </div>
    <button
      onClick={onCreateEvent}
      className="text-blue-400 font-bold text-xs hover:underline"
    >
      + Create Event
    </button>
  </div>
);

// ─── Main Component ────────────────────────────────────
/**
 * @param {Array}    events         - filtered events array
 * @param {boolean}  isFetching     - background refetch state
 * @param {function} onView         - (event) => void
 * @param {function} onEdit         - (event) => void
 * @param {function} onPublish      - (event) => void
 * @param {function} onCancel       - (event) => void
 * @param {function} onCreateEvent  - () => void
 */
const EventTable = ({
  events = [],
  isFetching = false,
  onView,
  onEdit,
  onPublish,
  onCancel,
  onCreateEvent,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const closeDropdown = () => setActiveDropdown(null);

  const toggle = (id) =>
    setActiveDropdown((prev) => (prev === id ? null : id));

  return (
    <>
      {/* Subtle refetch indicator above table */}
      {isFetching && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1e1e1e] border-b border-slate-800">
                {[
                  { label: "Reference",      align: "" },
                  { label: "Event Detail",   align: "" },
                  { label: "Date & Time",    align: "" },
                  { label: "Runtime Status", align: "text-center" },
                  { label: "Status",         align: "text-center" },
                  { label: "Action",         align: "text-right" },
                ].map(({ label, align }) => (
                  <th
                    key={label}
                    className={`px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest ${align}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {events.length > 0 ? (
                events.map((event) => {
                  if (!event?.id) return null;

                  return (
                    <tr
                      key={event.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Reference */}
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-blue-400 font-mono text-xs font-bold hover:underline cursor-pointer">
                          {event.reference_id ?? "—"}
                        </span>
                      </td>

                      {/* Event detail */}
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-100 text-sm">
                          {event.title ?? "Untitled Event"}
                        </div>
                        {event.group_name && (
                          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                            <Users size={12} /> {event.group_name}
                          </div>
                        )}
                      </td>

                      {/* Date & Time */}
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-xs font-bold text-slate-200">
                          {formatDate(event.start_time)}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {formatTimeRange(event.start_time, event.end_time)}
                        </div>
                      </td>

                      {/* Runtime status */}
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <RuntimeStatusBadge status={event.runtime_status} />
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <EventStatusBadge status={event.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 whitespace-nowrap text-right relative">
                        <button
                          onClick={() => toggle(event.id)}
                          className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {activeDropdown === event.id && (
                          <EventActionsDropdown
                            event={event}
                            onView={() => { onView?.(event); closeDropdown(); }}
                            onEdit={() => { onEdit?.(event); closeDropdown(); }}
                            onPublish={() => { onPublish?.(event); closeDropdown(); }}
                            onCancel={() => { onCancel?.(event); closeDropdown(); }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>
                    <EventTableEmpty onCreateEvent={onCreateEvent} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EventTable;
