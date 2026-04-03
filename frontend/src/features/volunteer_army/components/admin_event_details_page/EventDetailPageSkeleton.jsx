import Skeleton from "./Skeleton";

const EventDetailPageSkeleton = () => {
  return (
    <div className="space-y-8">

      {/* 🔹 Header */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* 🔹 Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Overview Card */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 space-y-4 border border-slate-800">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-2/3" />

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 space-y-4 border border-slate-800">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Schedule Card */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 space-y-4 border border-slate-800">
            <Skeleton className="h-4 w-24" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* Roster Card */}
          <div className="bg-blue-600/20 rounded-2xl p-6 space-y-4">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Event Details Card */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 space-y-4 border border-slate-800">
            <Skeleton className="h-4 w-28" />

            <div className="space-y-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EventDetailPageSkeleton;