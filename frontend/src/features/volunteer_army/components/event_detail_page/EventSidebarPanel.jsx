// components/volunteer/EventSidebarPanel.jsx
import {
  Calendar,
  MapPin,
  Users,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

// ─── Skeleton ─────────────────────────────────────────
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const EventSidebarPanelSkeleton = () => (
  <aside className="space-y-6 lg:sticky lg:top-8">
    {/* Logistics card */}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2">
        <Pulse className="w-5 h-5 rounded" />
        <Pulse className="h-5 w-36" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            <Pulse className="w-9 h-9 rounded-lg flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Pulse className="h-4 w-24" />
              <Pulse className="h-3 w-36" />
              <Pulse className="h-3 w-28" />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6 border-t border-slate-100">
        <div className="bg-blue-50/50 p-4 rounded-xl space-y-2">
          <Pulse className="h-3 w-full bg-blue-100" />
          <Pulse className="h-3 w-4/5 bg-blue-100" />
        </div>
      </div>
    </div>

    {/* Sponsor card skeleton */}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <Pulse className="h-4 w-24" />
      <Pulse className="h-5 w-40" />
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-5/6" />
      <Pulse className="h-8 w-32 rounded-lg" />
    </div>
  </aside>
);

// ─── Helpers ──────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── Sponsor Block ────────────────────────────────────
const SponsorCard = ({ name, website, message }) => {
  if (!name) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Sponsored by
      </p>

      <p className="text-lg font-extrabold text-slate-900">{name}</p>

      {message && (
        <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors mt-1"
        >
          Visit Website <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
};

// ─── Component ────────────────────────────────────────
/**
 * @param {object} event - {
 *   start_time, end_time, location_name, location_address, capacity,
 *   sponsor_name?,  sponsor_website?,  sponsor_message?
 * }
 */
const EventSidebarPanel = ({ event }) => {
  if (!event) return <EventSidebarPanelSkeleton />;

  return (
    <aside className="space-y-6 lg:sticky lg:top-8">
      {/* ── Logistics card ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle size={18} className="text-blue-600" />
          Event Logistics
        </h3>

        <div className="space-y-4">
          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <div className="bg-slate-50 p-2 rounded-lg text-slate-600 shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Date & Time</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {formatDate(event.start_time)}
                <br />
                {formatTime(event.start_time)}
                {event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
              </p>
            </div>
          </div>

          {/* Location */}
          {(event.location_name || event.location_address) && (
            <div className="flex items-start gap-4">
              <div className="bg-slate-50 p-2 rounded-lg text-slate-600 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Location</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {event.location_name ?? ""}
                  {event.location_address && (
                    <>
                      <br />
                      {event.location_address}
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Capacity */}
          {event.capacity != null && (
            <div className="flex items-start gap-4">
              <div className="bg-slate-50 p-2 rounded-lg text-slate-600 shrink-0">
                <Users size={20} />
              </div>
              <div>
                <div className="text-sm flex font-bold text-slate-900">
                  <div>Capacity</div>
                  <div className="ml-2">{event?.capacity}</div>
                </div>

                {event?.runtime_status !== "LIVE" && event?.runtime_status !== 'COMPLETED' && <p className="text-xs text-slate-500">
                  {event?.capacity - event?.filled_count <= 0
                    ? "This Event is Full"
                    : `${event?.capacity - event?.filled_count} seats available`}
                </p>}
              </div>
            </div>
          )}
        </div>

        {/* Safety note */}
        <div className="pt-6 border-t border-slate-100">
          <div className="bg-blue-50/50 p-4 rounded-xl">
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              Your safety matters. Ensure you follow all group guidelines during
              the event. Attendance verification requires location access.
            </p>
          </div>
        </div>
      </div>

      {/* ── Sponsor card (optional) ── */}
      <SponsorCard
        name={event.sponsor_name}
        website={event.sponsor_website}
        message={event.sponsor_message}
      />
    </aside>
  );
};

export default EventSidebarPanel;
