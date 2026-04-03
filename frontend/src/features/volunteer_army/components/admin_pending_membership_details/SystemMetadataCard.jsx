// components/admin/memberships/detail/SystemMetadataCard.jsx
import { Hash, Clock, Calendar } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard, MetadataRow } from "./DetailPrimitives";

// ─── Skeleton ─────────────────────────────────────────
export const SystemMetadataCardSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-700/30 flex items-center gap-3">
      <Skeleton className="w-5 h-5 rounded" />
      <Skeleton className="h-4 w-28" />
    </div>
    <div className="p-6 space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center py-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} membership - { id, status, created_at, updated_at }
 */
const SystemMetadataCard = ({ membership }) => {
  if (!membership) return <SystemMetadataCardSkeleton />;

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString() : "—";

  return (
    <SectionCard title="System Metadata">
      <div className="space-y-4">
        <MetadataRow
          label="reference ID"
          value={membership?.reference_id ?? "—"}
          icon={<Hash size={14} />}
        />
        <MetadataRow
          label="Current Status"
          value={membership.status ?? "—"}
          icon={<Clock size={14} />}
        />
        <MetadataRow
          label="Applied On"
          value={formatDate(membership.created_at)}
          icon={<Calendar size={14} />}
        />
        <MetadataRow
          label="Last Update"
          value={formatDate(membership.updated_at)}
          icon={<Calendar size={14} />}
        />
      </div>
    </SectionCard>
  );
};

export default SystemMetadataCard;
