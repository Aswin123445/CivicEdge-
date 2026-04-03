// components/admin/events/participants/ParticipantsPageHeader.jsx
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";

// ─── Skeleton ─────────────────────────────────────────
export const ParticipantsPageHeaderSkeleton = () => (
  <div className="flex justify-between items-center">
    <div className="space-y-2">
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-4 w-56" />
    </div>
    <Skeleton className="h-10 w-32 rounded-lg" />
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} event - { reference_id, title }
 */
const ParticipantsPageHeader = ({ event }) => {
  const navigate = useNavigate();

  if (!event) return <ParticipantsPageHeaderSkeleton />;

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold text-slate-100">Participants</h1>
        <p className="text-slate-400 text-sm">
          {event?.reference_id ?? <>{event?.reference_id}</>}
          {event?.event_title && <> • {event.event_title}</>}
        </p>
      </div>

      <button
        onClick={() => navigate('-1')}
        className="px-4 py-2 bg-[#1e1e1e] border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition text-sm font-medium"
      >
        Back to Event
      </button>
    </div>
  );
};

export default ParticipantsPageHeader;
