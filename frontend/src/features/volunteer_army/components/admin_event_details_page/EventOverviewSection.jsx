// components/admin/events/detail/EventOverviewSection.jsx
import { ShieldCheck } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./EventDetailPrimitives";


// ─── Skeleton ─────────────────────────────────────────
export const EventOverviewSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-800/50">
      <Skeleton className="h-3 w-20" />
    </div>
    <div className="p-6 space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <div className="pt-4 border-t border-slate-800/50 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} event - { description, group_status, status }
 */
const EventOverviewSection = ({ event }) => {
  if (!event) return <EventOverviewSectionSkeleton />;

  return (
    <SectionCard title="Overview">
      <div className="space-y-4">
        {event.description ? (
          <p className="text-slate-300 leading-relaxed font-medium">
            {event.description}
          </p>
        ) : (
          <p className="text-slate-600 italic text-sm">
            No description provided for this event.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/50">
          {event.group_status && (
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Group Status
              </p>
              <p className="text-xs font-bold text-green-400 flex items-center gap-1">
                <ShieldCheck size={12} /> {event.group_status}
              </p>
            </div>
          )}
          {event.status && (
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Visibility
              </p>
              <p className="text-xs font-bold text-slate-300 capitalize">
                {event.status.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
};

export default EventOverviewSection;
