import { Table } from "lucide-react";
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-700/60 rounded ${className}`}></div>
);
const TableSkeleton = () => (
  <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl overflow-hidden divide-y divide-slate-800">
    {[1, 2, 3].map((row) => (
      <div key={row} className="grid grid-cols-4 items-center gap-4 px-6 py-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
        <div className="justify-self-end">
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

export default TableSkeleton;