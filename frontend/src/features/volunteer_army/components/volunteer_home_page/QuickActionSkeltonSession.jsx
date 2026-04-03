import React from "react";
import QuickActionSkeleton from "../../ui/Volunteer_home_page/QuickActionSkeleton";
import Pulse from "../../ui/Volunteer_home_page/Pulse";

const QuickActionSkeltonSession = () => {
  return (
    <section>
      <Pulse className="h-6 w-48 mb-6" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <QuickActionSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default QuickActionSkeltonSession;
