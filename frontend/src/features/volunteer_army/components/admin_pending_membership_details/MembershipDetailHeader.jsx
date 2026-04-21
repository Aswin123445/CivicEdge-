// components/admin/memberships/detail/MembershipDetailHeader.jsx
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import { MembershipStatusBadge } from "./DetailPrimitives";

// ─── Skeleton ─────────────────────────────────────────
export const MembershipDetailHeaderSkeleton = () => (
  <header className="mb-8">
    <Skeleton className="h-4 w-36 mb-4" />
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-9 w-24 rounded-xl" />
    </div>
  </header>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {object} membership - { id, status, group: { group_name } }
 */
const MembershipDetailHeader = ({ membership }) => {
  const navigate = useNavigate();

  if (!membership) return <MembershipDetailHeaderSkeleton />;
  return (
    <header className="mb-8">
      <button
        onClick={() => navigate("/dashboard/volunteer/memberships")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors mb-4 text-sm font-bold uppercase tracking-widest"
      >
        <ChevronLeft size={16} /> Back to Requests
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight italic text-slate-100">
            Membership Details
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Application ID: {membership.reference_id}
            {membership?.group_name && (
              <>
                {" • "}
                <span className="text-slate-300">{membership.group_name}</span>
              </>
            )}
          </p>
        </div>
        <MembershipStatusBadge status={membership.status} />
      </div>
    </header>
  );
};

export default MembershipDetailHeader;
