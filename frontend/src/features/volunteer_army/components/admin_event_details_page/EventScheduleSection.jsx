// components/admin/events/detail/EventScheduleSection.jsx
import { Calendar } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./EventDetailPrimitives";


// ─── Skeleton ─────────────────────────────────────────
export const EventScheduleSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-800/50">
      <Skeleton className="h-3 w-20" />
    </div>
    <div className="p-6 flex gap-12">
      <div className="space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-36" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-5 w-36" />
      </div>
    </div>
  </div>
);

// ─── Helpers ──────────────────────────────────────────
const formatDateTime = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
};

// ─── Component ────────────────────────────────────────
/**
 * @param {object} event - { start_time, end_time }
 */
const EventScheduleSection = ({ event }) => {
  if (!event) return <EventScheduleSectionSkeleton />;

  return (
    <SectionCard
      title="Schedule"
      icon={<Calendar className="text-blue-400" size={18} />}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Starts
          </p>
          <p className="text-sm font-bold text-slate-200">
            {formatDateTime(event.start_time)}
          </p>
        </div>
        <div className="hidden sm:block text-slate-800 font-black">→</div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Ends
          </p>
          <p className="text-sm font-bold text-slate-200">
            {formatDateTime(event.end_time)}
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

export default EventScheduleSection;
