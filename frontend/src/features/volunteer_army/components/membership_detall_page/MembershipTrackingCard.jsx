// components/volunteer/MembershipTrackingCard.jsx
import { Calendar, Info } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../../../../utils/datenormalize";

// ---- Skeleton ----
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const MembershipTrackingCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
    {/* Title */}
    <div className="flex items-center gap-2 mb-6">
      <Pulse className="w-5 h-5 rounded" />
      <Pulse className="h-5 w-44" />
    </div>

    {/* Rows */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex justify-between items-center">
        <Pulse className="h-4 w-24" />
        <Pulse className="h-5 w-28 rounded-full" />
      </div>
    ))}

    {/* Note */}
    <div className="pt-6 border-t border-slate-100 flex gap-3">
      <Pulse className="w-4 h-4 rounded flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-2">
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-4/5" />
      </div>
    </div>
  </div>
);

const STATUS_NOTES = {
  PENDING: "You must upload evidence before the admin can review your request.",
  SUBMITTED: "Estimated review time: 3–5 business days.",
  ACTIVE:
    "You can now join private group channels and sign up for restricted events.",
  REJECTED: "Please contact support if you believe this was an error.",
};

/**
 * @param {object} membership - { status, created_at, updated_at }
 */
const MembershipTrackingCard = ({ membership }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
        <Calendar size={18} className="text-blue-600" />
        Membership Tracking
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Current Status</span>
          <StatusBadge status={membership?.status} />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Date Applied</span>
          <span className="font-semibold text-slate-900">
            {formatDate(membership?.created_at)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Last Updated</span>
          <span className="font-semibold text-slate-900">
            {formatDate(membership?.updated_at)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-start gap-3 text-slate-600 italic text-xs leading-relaxed">
          <Info size={16} className="shrink-0 mt-0.5" />
          <span>{STATUS_NOTES[membership?.status]}</span>
        </div>
      </div>
    </div>
  );
};

export default MembershipTrackingCard;
