// components/admin/volunteer-groups/AdminVolunteerGroupsPageSkeleton.jsx
// Used as the `fallback` in React.Suspense when lazy loading AdminVolunteerGroups.

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700/60 rounded ${className}`} />
);

// ─── Metrics row skeleton ──────────────────────────────
const MetricsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="bg-[#1e1e1e] border border-slate-800 p-6 rounded-2xl">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-9 w-12" />
          </div>
          <Skeleton className="w-11 h-11 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

// ─── Filters bar skeleton ──────────────────────────────
const FiltersSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 p-4 rounded-2xl flex flex-col lg:flex-row items-center gap-4">
    <Skeleton className="h-11 w-full lg:w-96 rounded-xl" />
    <div className="flex gap-3 w-full lg:w-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-16 rounded-lg" />
      ))}
    </div>
  </div>
);

// ─── Table skeleton ────────────────────────────────────
const TableSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Table head */}
        <thead>
          <tr className="border-b border-slate-800">
            {Array.from({ length: 6 }).map((_, i) => (
              <th key={i} className="px-6 py-4">
                <Skeleton className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="divide-y divide-slate-800">
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              {/* Reference */}
              <td className="px-6 py-5">
                <Skeleton className="h-4 w-28" />
              </td>

              {/* Name + created by */}
              <td className="px-6 py-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </td>

              {/* Risk badge */}
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-5 w-14 rounded-full mx-auto" />
              </td>

              {/* Status badge */}
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-5 w-16 rounded-full mx-auto" />
              </td>

              {/* Created */}
              <td className="px-6 py-5">
                <Skeleton className="h-4 w-20" />
              </td>

              {/* Actions */}
              <td className="px-6 py-5 text-right">
                <Skeleton className="h-8 w-8 rounded-lg ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Full page skeleton ────────────────────────────────
const AdminVolunteerGroupsPageSkeleton = () => (
  <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-6 lg:p-10 font-sans">
    <div className="max-w-7xl mx-auto space-y-10">

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>

      {/* Metrics cards */}
      <MetricsSkeleton />

      {/* Filters bar */}
      <FiltersSkeleton />

      {/* Table */}
      <TableSkeleton />
    </div>
  </div>
);

export default AdminVolunteerGroupsPageSkeleton;
