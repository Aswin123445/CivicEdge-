import Skeleton from "./Skeleton";

const MembershipRequestsSkeleton = () => {
  return (
    <div className="space-y-8">

      {/* 🔹 Header */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* 🔹 Search + Sort */}
      <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl p-6 space-y-4">
        
        {/* Search */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Sort */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-slate-800">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-3 w-20" />
          ))}
        </div>

        {/* Table Rows (6–7 rows) */}
        {[...Array(7)].map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-7 gap-4 px-6 py-5 border-b border-slate-800 last:border-0"
          >
            {/* Membership */}
            <Skeleton className="h-6 w-40 rounded-md" />

            {/* User */}
            <Skeleton className="h-4 w-24" />

            {/* Group */}
            <Skeleton className="h-4 w-20" />

            {/* Type */}
            <Skeleton className="h-6 w-32 rounded-md" />

            {/* Evidence */}
            <Skeleton className="h-4 w-10" />

            {/* Requested */}
            <Skeleton className="h-4 w-20" />

            {/* Actions */}
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MembershipRequestsSkeleton;