const ComplaintListSkeleton = ({ count = 4 }) => {
  return (
    <div
      className="
        grid grid-cols-1 
        lg:grid-cols-2 
        gap-6
      "
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            relative bg-white border border-slate-200 rounded-2xl
            p-6 animate-pulse
          "
        >
          {/* Status Accent Rail */}
          <span className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-slate-200" />

          {/* Content */}
          <div className="pl-3">
            {/* Meta Row */}
            <div className="flex items-center gap-4 mb-3">
              <div className="h-5 w-20 rounded-full bg-slate-200" />
              <div className="h-3 w-24 rounded bg-slate-200" />
            </div>

            {/* Title */}
            <div className="h-5 w-1/2 bg-slate-200 rounded mb-2" />

            {/* Location */}
            <div className="h-4 w-2/3 bg-slate-200 rounded mb-3" />

            {/* Message Placeholder */}
            <div className="space-y-2 max-w-2xl">
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 rounded" />
            </div>
          </div>

          {/* Navigation Cue */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintListSkeleton;