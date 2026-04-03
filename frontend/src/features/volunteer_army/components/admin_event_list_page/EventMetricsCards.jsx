// components/admin/events/EventMetricsCards.jsx
import { Calendar, Clock, AlertCircle, CheckCircle2,XCircle } from "lucide-react";
import Skeleton from "./Skeleton";

// ─── Skeleton ─────────────────────────────────────────
export const EventMetricsCardsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-[#1e1e1e] border border-slate-800 p-5 rounded-2xl">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-10" />
          </div>
          <Skeleton className="w-10 h-10 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

// ─── Component ────────────────────────────────────────
const STATS_CONFIG = [
  {
    label: "Total Events",
    key:   (matrix) => matrix?.total_length,
    icon:  Calendar,
    color: "text-blue-400",
  },
  {
    label: "Upcoming",
    key:   (matrix) => matrix?.upcoming_events_count,
    icon:  Clock,
    color: "text-blue-400",
  },
  {
    label: "Ongoing",
    key:   (matrix) => matrix?.ongoing_events_count,
    icon:  AlertCircle,
    color: "text-green-400",
  },
  {
    label: "Completed",
    key:   (matrix) => matrix?.completed_events_count,
    icon:  CheckCircle2,
    color: "text-slate-400",
  },
  {
    label: "Cancelled",
    key:   (matrix) => matrix?.cancelled_events_count,
    icon:  XCircle,
    color: "text-slate-400",
  },
];

/**
 * @param {Object} matrix - full events array from API
 */
const EventMetricsCards = ({ matrix = [] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    {STATS_CONFIG.map((stat, i) => (
      <div key={i} className="bg-[#1e1e1e] border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-slate-100">
              {stat.key(matrix)}
            </h3>
          </div>
          <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${stat.color}`}>
            <stat.icon size={18} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default EventMetricsCards;
