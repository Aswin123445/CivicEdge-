// components/admin/memberships/MembershipsTable.jsx
import Skeleton from "./Skeleton";
import MembershipRow from "./MembershipRow";

const COLUMNS = ["Membership", "User", "Group", "Evidence", "Requested", "Action"];

// ─── Skeleton ─────────────────────────────────────────
export const MembershipsTableSkeleton = () => (
  <div className="overflow-x-auto bg-[#1e1e1e] border border-slate-700 rounded-xl shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-slate-700 text-slate-500 text-xs uppercase tracking-wider">
          {COLUMNS.map((col) => (
            <th key={col} className="px-6 py-4">
              <Skeleton className="h-3 w-16" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700/50">
        {Array.from({ length: 5 }).map((_, i) => (
          <tr key={i}>
            <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded" /></td>
            <td className="px-6 py-4"><Skeleton className="h-4 w-44" /></td>
            <td className="px-6 py-4"><Skeleton className="h-4 w-36" /></td>
            <td className="px-6 py-4"><Skeleton className="h-5 w-24 rounded" /></td>
            <td className="px-6 py-4 text-center"><Skeleton className="h-4 w-10 mx-auto" /></td>
            <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-2">
                <Skeleton className="h-7 w-20 rounded-lg" />
                <Skeleton className="h-7 w-16 rounded-lg" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Empty state ──────────────────────────────────────
const EmptyState = ({ message }) => (
  <tr>
    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 text-sm">
      {message}
    </td>
  </tr>
);

// ─── Main Component ────────────────────────────────────
/**
 * @param {Array}    data          - filtered membership requests
 * @param {boolean}  isLoading
 * @param {boolean}  isFetching
 * @param {number}   processingId  - id of row currently being actioned
 * @param {string}   emptyMessage
 * @param {function} onApprove     - (id) => void
 * @param {function} onReject      - (req) => void
 */
const MembershipsTable = ({
  data = [],
  isLoading,
  isFetching,
  processingId,
  emptyMessage = "No pending membership requests",
  onApprove,
  onReject,
}) => {
  if (isLoading || isFetching) return <MembershipsTableSkeleton />;
  return (
    <div className="overflow-x-auto bg-[#1e1e1e] border border-slate-700 rounded-xl shadow-sm">
      {/* Subtle background refetch indicator */}
      {isFetching && (
        <div className="h-0.5 w-full bg-blue-500 animate-pulse" />
      )}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-700 text-slate-500 text-xs uppercase tracking-wider">
            {COLUMNS.map((col) => (
              <th
                key={col}
                className={`px-6 py-4 font-semibold ${col === "Evidence" ? "text-center" : col === "Action" ? "text-right" : ""}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((req) =>
              req?.id ? (
                <MembershipRow
                  key={req.id}
                  req={req}
                  onApprove={onApprove}
                  onReject={onReject}
                  isProcessing={processingId === req.id}
                />
              ) : null
            )
          ) : (
            <EmptyState message={emptyMessage} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MembershipsTable;
