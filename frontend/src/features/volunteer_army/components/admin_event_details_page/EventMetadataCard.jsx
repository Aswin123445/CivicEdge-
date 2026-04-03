// components/admin/events/detail/EventMetadataCard.jsx
import { UserCircle2 } from "lucide-react";
import Skeleton from "./Skeleton";
import { MetaRow, SectionCard } from "./EventDetailPrimitives";


// ─── Helpers ──────────────────────────────────────────
const formatDateTime = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
};

// ─── Skeleton ─────────────────────────────────────────
export const EventMetadataCardSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-800/50">
      <Skeleton className="h-3 w-24" />
    </div>
    <div className="p-6 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center py-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-28" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} event - { reference_id, group_name, created_by_id, created_at, updated_at }
 */
const EventMetadataCard = ({ event }) => {
  if (!event) return <EventMetadataCardSkeleton />;

  return (
    <SectionCard title="Event Details">
      <div className="space-y-4">
        <MetaRow label="Ref ID"       value={event.reference_id} />
        <MetaRow label="Group"        value={event.group_name} />
        <MetaRow
          label="Creator"
          value={event.created_by_id}
          icon={<UserCircle2 size={12} />}
        />
        <MetaRow label="Created"      value={formatDateTime(event.created_at)} />
        <MetaRow label="Last Update"  value={formatDateTime(event.updated_at)} />
      </div>
    </SectionCard>
  );
};

export default EventMetadataCard;
