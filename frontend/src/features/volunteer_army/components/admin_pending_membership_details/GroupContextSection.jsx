// components/admin/memberships/detail/GroupContextSection.jsx
import { Shield } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./DetailPrimitives";

// ─── Skeleton ─────────────────────────────────────────
export const GroupContextSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-700/30 flex items-center gap-3">
      <Skeleton className="w-5 h-5 rounded" />
      <Skeleton className="h-4 w-28" />
    </div>
    <div className="p-6 space-y-6">
      <div className="flex gap-3">
        <Skeleton className="h-7 w-28 rounded-lg" />
        <Skeleton className="h-7 w-20 rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} group - { membership_type, risk_level, group_description, requirements }
 */
const GroupContextSection = ({ membership }) => {
  if (!membership) return <GroupContextSectionSkeleton />;

  return (
    <SectionCard
      title="Group Context"
      icon={<Shield size={18} className="text-blue-400" />}
    >
      <div className="space-y-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-3">
          {membership.membership_type && (
            <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-tighter text-slate-300">
              Type: {membership.membership_type.replace(/_/g, " ")}
            </div>
          )}
          {membership.risk_level && (
            <div
              className={`px-3 py-1 border rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                membership.risk_level === "HIGH"
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : membership.risk_level === "MEDIUM"
                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                  : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              Risk: {membership.risk_level}
            </div>
          )}
        </div>

        {/* Description */}
        {membership.group_description && (
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
              Description
            </label>
            <p className="text-slate-400 text-sm leading-relaxed">
              {membership.group_description}
            </p>
          </div>
        )}

        {/* Requirements */}
        {membership.requirements && (
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
              Requirements
            </label>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              "{membership.requirements}"
            </p>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default GroupContextSection;
