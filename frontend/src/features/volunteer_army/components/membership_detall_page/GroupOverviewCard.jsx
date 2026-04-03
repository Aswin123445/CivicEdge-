// components/volunteer/GroupOverviewCard.jsx

// ---- Skeleton ----
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const GroupOverviewCardSkeleton = () => (
  <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
    {/* About */}
    <div className="space-y-2">
      <Pulse className="h-5 w-36 mb-3" />
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-5/6" />
      <Pulse className="h-4 w-4/6" />
    </div>

    {/* Requirements */}
    <div className="pt-6 border-t border-slate-100 space-y-3">
      <Pulse className="h-3 w-28" />
      <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
        <Pulse className="h-4 w-full" />
        <Pulse className="h-4 w-3/4" />
      </div>
    </div>
  </section>
);

// ---- Component ----
/**
 * @param {string} description
 * @param {string} requirements
 */
const GroupOverviewCard = ({ description, requirements }) => (
  <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
    <div>
      <h2 className="text-lg font-bold text-slate-900 mb-2">About this group</h2>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>

    <div className="pt-6 border-t border-slate-100">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
        Requirements
      </h3>
      <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-medium leading-relaxed">
        {requirements || "No specific requirements for this group."}
      </div>
    </div>
  </section>
);

export default GroupOverviewCard;
