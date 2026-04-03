// components/citizen/volunteer/RecognitionCardSkeleton.jsx
import Skeleton from "./Skeleton";

const RecognitionCardSkeleton = () => (
  <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-4 h-full">
    {/* Icon + badge row */}
    <div className="flex items-start justify-between">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <Skeleton className="w-20 h-6 rounded-full" />
    </div>

    {/* Title */}
    <div className="space-y-2 pt-1">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>

    {/* Date row */}
    <div className="pt-2 border-t border-slate-50">
      <Skeleton className="h-3 w-40" />
    </div>

    {/* CTA button */}
    <div className="mt-auto pt-4">
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  </div>
);

export const RecognitionGridSkeleton = ({ count = 3 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <RecognitionCardSkeleton key={i} />
    ))}
  </div>
);

export default RecognitionCardSkeleton;
