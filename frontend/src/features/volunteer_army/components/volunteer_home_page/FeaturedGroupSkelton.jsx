import React from "react";
import Pulse from "../../ui/Volunteer_home_page/Pulse";
import GroupCardSkeleton from "../../ui/Volunteer_home_page/GroupCardSkeleton";

const FeaturedGroupSkelton = () => {
  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div className="space-y-2">
          <Pulse className="h-7 w-48" />
          <Pulse className="h-4 w-64" />
        </div>
        <Pulse className="h-4 w-16" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <GroupCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedGroupSkelton;
