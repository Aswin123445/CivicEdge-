import Skeleton from "../../../../components/common/Skelton";

export default function TableSkeleton() {
  return (
    <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl overflow-hidden">
      {/* Table Header Mimic */}
      <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-[#1f2937] bg-slate-800/20">
        <Skeleton className="h-3 w-20" /> {/* REF ID */}
        <Skeleton className="h-3 w-32" /> {/* TITLE */}
        <Skeleton className="h-3 w-24" /> {/* LOCATION */}
        <Skeleton className="h-3 w-24" /> {/* SUBMITTED */}
        <Skeleton className="h-3 w-16" /> {/* MEDIA */}
        <Skeleton className="h-3 w-16 justify-self-end" /> {/* ACTION */}
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-[#1f2937]">
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="grid grid-cols-6 items-center gap-4 px-6 py-5"
          >
            {/* Reference ID */}
            <Skeleton className="h-4 w-16" />

            {/* Issue Title */}
            <Skeleton className="h-4 w-48" />

            {/* Location (with icon mimic) */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-28" />
            </div>

            {/* Submitted (with icon mimic) */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>

            {/* Media (with icon mimic) */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded" />
              <Skeleton className="h-3 w-12" />
            </div>

            {/* View Action */}
            <div className="justify-self-end flex items-center gap-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
