const IssueDetailsSkeleton = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Title */}
      <div className="h-5 w-3/4 rounded-md bg-slate-200" />

      {/* Description (2 lines) */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded-md bg-slate-200" />
        <div className="h-4 w-5/6 rounded-md bg-slate-200" />
      </div>

      {/* Category pill */}
      <div className="h-4 w-24 rounded-full bg-blue-200/60" />
    </div>
  );
};

export default IssueDetailsSkeleton;