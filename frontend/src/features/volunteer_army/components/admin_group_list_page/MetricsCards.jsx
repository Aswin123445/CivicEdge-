// components/admin/volunteer-groups/MetricsCards.jsx
import { Users, CheckCircle2, AlertTriangle } from "lucide-react";
import Skeleton from "./Skeleton";

// ─── Skeleton ─────────────────────────────────────────
export const MetricsCardsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="bg-[#1e1e1e] border border-slate-800 p-6 rounded-2xl">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-9 w-12" />
          </div>
          <Skeleton className="w-11 h-11 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {Object} groups - full groups array from API
 */
const MetricsCards = ({ metrix = [] }) => {
  const stats = [
    {
      label: "Total Groups",
      value: metrix.total,
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Active",
      value: metrix.active_count,
      icon: CheckCircle2,
      color: "text-green-400",
    },
    {
      label: "Archived",
      value: metrix.archive_count,
      icon: AlertTriangle,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#1e1e1e] border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-none">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-slate-100 mt-2">
                {stat.value}
              </h3>
            </div>
            <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
