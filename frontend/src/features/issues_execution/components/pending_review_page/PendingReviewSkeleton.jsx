import Skeleton from "../../../../components/common/Skelton";
import TableSkeleton from "./TableSkelton";

const PendingReviewSkeleton = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. SUMMARY METRICS SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#1f1f1f] border border-[#1f2937] p-6 rounded-xl flex justify-between items-start"
          >
            <div className="space-y-3">
              <Skeleton className="h-3 w-24" /> {/* Label */}
              <Skeleton className="h-8 w-12" /> {/* Value */}
            </div>
            <Skeleton className="h-6 w-6 rounded-full" /> {/* Icon Circle */}
          </div>
        ))}
      </div>

      {/* 2. FILTERS & SEARCH SKELETON */}
      <div className="space-y-4">
        {/* Search Bar */}
        <Skeleton className="h-12 w-full rounded-xl border border-[#1f2937]" />

        {/* Filter Pills */}
        <div className="flex gap-2">
          <Skeleton className="h-9 w-12 rounded-lg" /> {/* 'All' Pill */}
          <Skeleton className="h-9 w-28 rounded-lg" /> {/* Category Pill */}
          <Skeleton className="h-9 w-20 rounded-lg" /> {/* Category Pill */}
          <div className="mx-2 h-9 w-[1px] bg-gray-800" /> {/* Divider */}
          <Skeleton className="h-9 w-20 rounded-lg" /> {/* Sort Pill */}
          <Skeleton className="h-9 w-16 rounded-lg" /> {/* Sort Pill */}
        </div>
      </div>

      {/* 3. ISSUES TABLE SKELETON */}
      <TableSkeleton />
    </div>
  );
};

export default PendingReviewSkeleton;