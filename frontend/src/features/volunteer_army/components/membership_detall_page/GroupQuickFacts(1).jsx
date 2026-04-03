// components/volunteer/GroupQuickFacts.jsx

// ---- Skeleton ----
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const GroupQuickFactsSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
    <Pulse className="h-5 w-36 mb-4" />
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center space-y-2">
          <Pulse className="h-3 w-12 mx-auto" />
          <Pulse className="h-5 w-16 mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

// ---- Component ----
/**
 * @param {string} riskLevel
 * @param {number} membersCount
 */
const GroupQuickFacts = ({ riskLevel, membersCount }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
    <h3 className="text-slate-900 font-bold mb-4">Group Quick Facts</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
          Risk
        </p>
        <p className="text-sm font-extrabold text-slate-900">{riskLevel}</p>
      </div>
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
          Members
        </p>
        <p className="text-sm font-extrabold text-slate-900">{membersCount}</p>
      </div>
    </div>
  </div>
);

export default GroupQuickFacts;
