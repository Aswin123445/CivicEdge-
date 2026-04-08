import { CheckCircle2 } from "lucide-react";
import { SidebarSkeleton } from "./PollSkeleton";

/**
 * PollSidebar
 *
 * Props:
 *   isLoading boolean
 */
const PollSidebar = ({ isLoading = false }) => {
  if (isLoading) return <SidebarSkeleton />;

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
        <CheckCircle2 size={24} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">
        Your Vote Matters
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed mb-6">
        Every poll on CivicEdge is linked directly to local governance
        trackers. When you vote, you provide actionable data for community
        leaders.
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          One user, one vote policy.
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          Verified citizen participation.
        </div>
      </div>
    </div>
  );
};

export default PollSidebar;
