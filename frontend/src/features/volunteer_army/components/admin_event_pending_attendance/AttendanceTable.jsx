// components/admin/attendance/AttendanceTable.jsx
import Skeleton from "./Skeleton";
import AttendanceRow from "./AttendanceRow";

const COLUMNS = ["Participant", "Submitted", "Selfie", "Event", "Action"];

// ─── Skeleton ─────────────────────────────────────────
export const AttendanceTableSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800">
            {COLUMNS.map((col) => (
              <th key={col} className="px-6 py-4">
                <Skeleton className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i}>
              {/* Participant */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
              </td>
              {/* Email */}
              <td className="px-6 py-5">
                <Skeleton className="h-3 w-36" />
              </td>
              {/* Submitted */}
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-3 w-12 mx-auto" />
              </td>
              {/* Selfie */}
              <td className="px-6 py-5 text-center">
                <Skeleton className="w-10 h-10 rounded-full mx-auto" />
              </td>
              {/* Status */}
              <td className="px-6 py-5">
                <Skeleton className="h-5 w-20 rounded" />
              </td>
              {/* Actions */}
              <td className="px-6 py-5">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-7 w-16 rounded-lg" />
                  <Skeleton className="h-7 w-16 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Empty state ──────────────────────────────────────
const EmptyState = () => (
  <tr>
    <td
      colSpan={6}
      className="px-6 py-20 text-center text-slate-500 italic text-sm"
    >
      No attendance records found matching your filters.
    </td>
  </tr>
);

// ─── Main Component ────────────────────────────────────
/**
 * @param {Array}    data          - filtered attendance records
 * @param {boolean}  isLoading
 * @param {boolean}  isFetching
 * @param {number}   processingId
 * @param {function} onPreview     - (imageUrl) => void
 * @param {function} onVerify      - (id) => void
 * @param {function} onReject      - (row) => void
 */
const AttendanceTable = ({
  data = [],
  isLoading,
  isFetching,
  processingId,
  onPreview,
  onVerify,
  onReject,
}) => {
  if (isLoading) return <AttendanceTableSkeleton />;

  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden shadow-sm">
      {/* Subtle refetch indicator */}
      {isFetching && <div className="h-0.5 w-full bg-blue-500 animate-pulse" />}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
              {COLUMNS.map((col, i) => (
                <th
                  key={col}
                  className={`px-6 py-4 ${i === 2 || i === 3 ? "text-center" : i === 4 ? "text-center" : ""} ${i === 0 ? "lg:pr-32 px-0" : ""} ${i === 4 ? "lg:pl-28 px-0" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row) =>
                row?.id ? (
                  <AttendanceRow
                    key={row.id}
                    row={row}
                    onPreview={onPreview}
                    onVerify={onVerify}
                    onReject={onReject}
                    isProcessing={processingId === row.id}
                  />
                ) : null,
              )
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
