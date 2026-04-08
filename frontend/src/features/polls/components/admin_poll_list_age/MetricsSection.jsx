import { BarChart3, Activity, Archive } from "lucide-react";
import Skeleton from "./Skeleton";

/**
 * MetricCard - single dark stat tile
 */
const MetricCard = ({ label = "", value = null, icon }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 flex items-center justify-between group hover:border-slate-600 transition-all shadow-sm">
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
        {label}
      </p>
      <p className="text-2xl font-black text-slate-100">{value ?? 0}</p>
    </div>
    <div className="bg-[#1e1e1e] p-3 rounded-xl border border-slate-800 transition-transform group-hover:scale-110">
      {icon}
    </div>
  </div>
);

/**
 * MetricCardSkeleton
 */
const MetricCardSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6 flex items-center justify-between">
    <div className="space-y-2">
      <Skeleton className="h-3 w-20 rounded" />
      <Skeleton className="h-8 w-12 rounded-lg" />
    </div>
    <Skeleton className="w-12 h-12 rounded-xl" />
  </div>
);

/**
 * MetricsSection
 *
 * Props:
 *   totalCount   number | null
 *   activeCount  number | null
 *   closedCount  number | null
 *   isLoading    boolean
 */
const MetricsSection = ({
  totalCount = null,
  activeCount = null,
  closedCount = null,
  isLoading = false,
}) => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {isLoading ? (
      <>
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </>
    ) : (
      <>
        <MetricCard
          label="Total Polls"
          value={totalCount}
          icon={<BarChart3 className="text-blue-400" />}
        />
        <MetricCard
          label="Active Polls"
          value={activeCount}
          icon={<Activity className="text-emerald-400" />}
        />
        <MetricCard
          label="Closed Polls"
          value={closedCount}
          icon={<Archive className="text-slate-400" />}
        />
      </>
    )}
  </section>
);

export default MetricsSection;
