import Skeleton from '../../../../components/common/Skelton';
const AdminUserCardSkeleton = () => {
  return (
    <div className="p-4 rounded-lg bg-[#1f1f1f] border border-gray-700">
      <div className="flex justify-between gap-4">
        {/* LEFT SIDE */}
        <div className="flex gap-4">
          {/* Avatar */}
          <Skeleton className="h-12 w-12 rounded-full" />

          {/* User info */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />   {/* username */}
            <Skeleton className="h-3 w-48" />   {/* email */}
            <Skeleton className="h-3 w-24" />   {/* ID */}
            <Skeleton className="h-3 w-28" />   {/* Zone */}
            <Skeleton className="h-3 w-24" />   {/* Phone */}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-end justify-between">
          <div className="space-y-2 text-right">
            <Skeleton className="h-3 w-28" />   {/* member since */}
            <Skeleton className="h-3 w-20" />   {/* status */}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserCardSkeleton;
