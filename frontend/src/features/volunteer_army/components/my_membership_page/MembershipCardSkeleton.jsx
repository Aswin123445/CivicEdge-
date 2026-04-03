// components/citizen/memberships/MembershipCardSkeleton.jsx
import Skeleton from "./Skeleton";

const MembershipCardSkeleton = () => (
  <div className="flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
    {/* Icon + risk badge */}
    <div className="flex justify-between items-center">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <Skeleton className="w-20 h-5 rounded-full" />
    </div>

    {/* Group name */}
    <Skeleton className="h-6 w-3/4 rounded-md" />

    {/* Membership type badge */}
    <Skeleton className="h-4 w-1/4 rounded-md" />

    {/* Description lines */}
    <div className="space-y-2 py-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>

    {/* CTA button */}
    <Skeleton className="h-12 w-full rounded-xl" />
  </div>
);

export const MembershipGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <MembershipCardSkeleton key={i} />
    ))}
  </div>
);

export default MembershipCardSkeleton;
