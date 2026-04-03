import React from "react";
import EventRowSkeleton from "../../ui/Volunteer_home_page/EventRowSkeleton";
import Pulse from "../../ui/Volunteer_home_page/Pulse";

const UpcomingEventSkelton = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Pulse className="w-5 h-5 rounded" />
        <Pulse className="h-5 w-36" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <EventRowSkeleton key={i} />
        ))}
      </div>
      <Pulse className="h-9 w-full rounded-lg mt-4" />
    </div>
  );
};

export default UpcomingEventSkelton;
