const ReviewIssueSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Issue Details Skeleton */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-200" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>

        <div className="space-y-3">
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Location Skeleton */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-200" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </div>

        <div className="h-40 w-full rounded-xl bg-gray-200" />
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex justify-end gap-4">
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
        <div className="h-10 w-40 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default ReviewIssueSkeleton;