// components/admin/events/AdminEventsListPageSkeleton.jsx
// Used as React.Suspense fallback when lazy loading AdminEventsListPage.

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700/60 rounded ${className}`} />
);

const MetricsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-[#1e1e1e] border border-slate-800 p-5 rounded-2xl">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-10" />
          </div>
          <Skeleton className="w-10 h-10 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

const FiltersSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 p-4 rounded-2xl flex flex-col lg:flex-row items-center gap-4">
    <Skeleton className="h-11 w-full lg:w-96 rounded-xl" />
    <div className="flex gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-20 rounded-lg" />
      ))}
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-800">
            {Array.from({ length: 6 }).map((_, i) => (
              <th key={i} className="px-6 py-4">
                <Skeleton className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-5"><Skeleton className="h-4 w-28" /></td>
              <td className="px-6 py-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </td>
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-5 w-20 rounded-full mx-auto" />
              </td>
              <td className="px-6 py-5 text-center">
                <Skeleton className="h-4 w-20 mx-auto" />
              </td>
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

const AdminEventsListPageSkeleton = () => (
  <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-6 lg:p-10 font-sans">
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-12 w-36 rounded-xl" />
      </div>

      <MetricsSkeleton />
      <FiltersSkeleton />
      <TableSkeleton />
    </div>
  </div>
);

export default AdminEventsListPageSkeleton;
