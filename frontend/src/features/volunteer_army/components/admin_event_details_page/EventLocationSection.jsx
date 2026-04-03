// components/admin/events/detail/EventLocationSection.jsx
import { MapPin } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./EventDetailPrimitives";


// ─── Skeleton ─────────────────────────────────────────
export const EventLocationSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-800/50">
      <Skeleton className="h-3 w-20" />
    </div>
    <div className="p-6 space-y-3">
      <Skeleton className="h-5 w-48" />
      <div className="flex gap-3 bg-[#1e1e1e] p-4 rounded-xl border border-slate-800">
        <Skeleton className="w-4 h-4 rounded shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} event - { location_name, location_address }
 */
const EventLocationSection = ({ event }) => {
  if (!event) return <EventLocationSectionSkeleton />;

  return (
    <SectionCard
      title="Location"
      icon={<MapPin className="text-red-400" size={18} />}
    >
      <div className="space-y-3">
        {event.location_name && (
          <h4 className="text-slate-100 font-black">{event.location_name}</h4>
        )}
        {event.location_address && (
          <div className="flex gap-3 bg-[#1e1e1e] p-4 rounded-xl border border-slate-800">
            <MapPin className="text-slate-600 shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              {event.location_address}
            </p>
          </div>
        )}
        {!event.location_name && !event.location_address && (
          <p className="text-slate-600 italic text-sm">No location specified.</p>
        )}
      </div>
    </SectionCard>
  );
};

export default EventLocationSection;
