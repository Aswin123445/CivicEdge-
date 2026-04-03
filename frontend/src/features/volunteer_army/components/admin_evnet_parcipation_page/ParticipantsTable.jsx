// components/admin/events/participants/ParticipantsTable.jsx
import Skeleton from "./Skeleton";
import ParticipantStatusBadge  from "./ParticipantStatusBadge";
import ParticipantActionDropdown from "./ParticipantActionDropdown";

// ─── Helpers ──────────────────────────────────────────
const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
};

// ─── Skeleton ─────────────────────────────────────────
export const ParticipantsTableSkeleton = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="text-slate-400 text-sm border-b border-slate-700">
        <tr>
          {["Participant", "Email", "Joined At", "Status", "Action"].map((h) => (
            <th key={h} className="px-4 py-3">
              <Skeleton className="h-3 w-20" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, i) => (
          <tr key={i} className="border-b border-slate-700">
            <td className="px-4 py-3"><Skeleton className="h-4 w-28" /></td>
            <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
            <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
            <td className="px-4 py-3"><Skeleton className="h-6 w-20 rounded-full" /></td>
            <td className="px-4 py-3 text-right"><Skeleton className="h-6 w-8 ml-auto" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Empty state ──────────────────────────────────────
const EmptyState = ({ message = "No participants yet" }) => (
  <div className="text-center py-12 text-slate-500 text-sm">{message}</div>
);

// ─── Participant row ───────────────────────────────────
const ParticipantRow = ({ participant, onView }) => {
  if (!participant) return null;

  return (
    <tr className="border-b border-slate-700 hover:bg-slate-800/30 transition">
      <td className="px-4 py-3 text-slate-100 font-medium text-sm">
        {participant.reference_id ?? "—"}
      </td>
      <td className="px-4 py-3 text-slate-400 text-sm">
        {participant.email ?? "—"}
      </td>
      <td className="px-4 py-3 text-slate-400 text-sm">
        {formatDate(participant.registered_at)}
      </td>
      <td className="px-4 py-3">
        <ParticipantStatusBadge status={participant.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <ParticipantActionDropdown
          participant={participant}
          onView={onView}
        />
      </td>
    </tr>
  );
};

// ─── Main Component ────────────────────────────────────
/**
 * @param {Array}    data        - filtered participants array
 * @param {boolean}  isLoading   - show skeleton
 * @param {boolean}  isFetching  - background refetch
 * @param {string}   emptyMessage
 * @param {function} onView      - (participant) => void
 */
const ParticipantsTable = ({
  data = [],
  isLoading,
  isFetching,
  emptyMessage,
  onView,
}) => {
  if (isLoading) return <ParticipantsTableSkeleton />;

  if (!Array.isArray(data) || data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto">
      {/* Subtle refetch shimmer */}
      {isFetching && (
        <div className="w-full h-0.5 bg-blue-500 animate-pulse rounded-full mb-2" />
      )}
      <table className="w-full text-left">
        <thead className="text-slate-400 text-sm border-b border-slate-700">
          <tr>
            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Participant</th>
            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Email</th>
            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Joined At</th>
            <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Status</th>
            <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) =>
            p?.id ? (
              <ParticipantRow key={p.id} participant={p} onView={onView} />
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsTable;
