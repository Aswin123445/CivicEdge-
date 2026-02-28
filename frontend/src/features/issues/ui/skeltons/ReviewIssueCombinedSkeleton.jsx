import EvidenceSkeleton from "./EvidenceSkelton";
import IssueDetailsSkeleton from "./IssueDetailsSkeleton";
import LocationSkeleton from "./LocationSkelton";
import ReviewIssueSkeleton from "./ReviewIssueSkeleton";


const ReviewIssueCombinedSkeleton = () => {
  return (
    <div className="space-y-10 mx-12">
      {/* Issue summary / header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <IssueDetailsSkeleton />
      </div>

      {/* Location section */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <LocationSkeleton />
        <div className="h-40 w-full rounded-xl bg-slate-200 animate-pulse" />
      </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <EvidenceSkeleton />
        <div className="h-40 w-full rounded-xl bg-slate-200 animate-pulse" />
      </div>

      {/* Detailed review block */}
      <ReviewIssueSkeleton />

      {/* Action buttons */}
      <div className="flex justify-end gap-4 animate-pulse">
        <div className="h-10 w-32 rounded-lg bg-slate-200" />
        <div className="h-10 w-40 rounded-lg bg-slate-200" />
      </div>
    </div>
  );
};

export default ReviewIssueCombinedSkeleton;