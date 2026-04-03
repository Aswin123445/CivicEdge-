// components/admin/memberships/detail/UserInfoSection.jsx
import { User } from "lucide-react";
import Skeleton from "./Skeleton";
import { SectionCard } from "./DetailPrimitives";

// ─── Skeleton ─────────────────────────────────────────
export const UserInfoSectionSkeleton = () => (
  <div className="bg-[#1e1e1e] border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-700/30 flex items-center gap-3">
      <Skeleton className="w-5 h-5 rounded" />
      <Skeleton className="h-4 w-32" />
    </div>
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-48" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-5 w-28" />
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} user - { user_id, user_email }
 */
const UserInfoSection = ({ membership }) => {
  if (!membership) return <UserInfoSectionSkeleton />;

  return (
    <SectionCard
      title="User Information"
      icon={<User size={18} className="text-blue-400" />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
            Email Address
          </label>
          <p className="text-slate-200 font-semibold">
            {membership.user_email ?? "—"}
          </p>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
            User Identifier
          </label>
          <p className="text-slate-200 font-mono text-sm">
            {membership.user_id ?? "—"}
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

export default UserInfoSection;
