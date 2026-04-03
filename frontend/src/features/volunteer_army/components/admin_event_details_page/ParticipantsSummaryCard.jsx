// components/admin/events/detail/ParticipantsSummaryCard.jsx
import { Users, ArrowRight } from "lucide-react";
import Skeleton from "./Skeleton";

// ─── Skeleton ─────────────────────────────────────────
export const ParticipantsSummaryCardSkeleton = () => (
  <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
    <div className="flex justify-between items-start">
      <Skeleton className="w-10 h-10 rounded-lg bg-slate-700" />
      <Skeleton className="h-3 w-16 bg-slate-700" />
    </div>
    <div className="space-y-1">
      <Skeleton className="h-9 w-32 bg-slate-700" />
      <Skeleton className="h-3 w-44 bg-slate-700" />
    </div>
    <Skeleton className="h-10 w-full rounded-xl bg-slate-700" />
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object}   event           - { participants_count, capacity }
 * @param {function} onViewParticipants
 */
const ParticipantsSummaryCard = ({ event, onViewParticipants }) => {
  if (!event) return <ParticipantsSummaryCardSkeleton />;

  const count    = event.participants_count ?? 0;
  const capacity = event.capacity ?? 0;

  return (
    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20 overflow-hidden relative">
      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-start">
          <div className="bg-white/20 p-2 rounded-lg">
            <Users size={20} strokeWidth={3} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
            Roster
          </span>
        </div>

        <div>
          <h3 className="text-3xl font-black">
            {count}{capacity > 0 ? ` / ${capacity}` : ""}
          </h3>
          <p className="text-xs font-bold opacity-80 mt-1 uppercase tracking-tight">
            Active Registrations Joined
          </p>
        </div>

        <button
          onClick={onViewParticipants}
          className="w-full bg-white text-blue-600 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
        >
          View Participants <ArrowRight size={14} />
        </button>
      </div>

      <Users className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
    </div>
  );
};

export default ParticipantsSummaryCard;
