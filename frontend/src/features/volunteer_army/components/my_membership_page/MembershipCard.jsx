// components/citizen/memberships/MembershipCard.jsx
import { Users, Info, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RISK_STYLES = {
  LOW:    "text-green-600 bg-green-50 border-green-100",
  MEDIUM: "text-yellow-600 bg-yellow-50 border-yellow-100",
  HIGH:   "text-red-600 bg-red-50 border-red-100",
};

const BADGE_STYLES = {
  OPEN:             "bg-green-100 text-green-700",
  APPROVAL_REQUIRED: "bg-yellow-100 text-yellow-700",
};

const MembershipCard = ({ group }) => {
  const navigate = useNavigate();

  const riskStyle  = RISK_STYLES[group?.risk_level]       ?? "text-slate-600 bg-slate-50 border-slate-100";
  const badgeStyle = BADGE_STYLES[group?.membership_type] ?? "bg-slate-100 text-slate-700";

  return (
    <div className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
      {/* Icon + Risk */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          <Users size={24} />
        </div>
        <div className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${riskStyle}`}>
          {group?.risk_level ?? "—"} Risk
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
        {group?.group_name ?? "—"}
      </h3>

      {/* Membership type badge */}
      <div className="mb-4">
        <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md ${badgeStyle}`}>
          {group?.membership_type?.replace("_", " ") ?? "—"}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
        {group?.description ?? "No description available."}
      </p>

      {/* Requirements */}
      {group?.requirements && (
        <div className="mt-auto pt-4 border-t border-slate-100 mb-6">
          <div className="flex items-start gap-2 text-slate-400">
            <Info size={14} className="mt-0.5 shrink-0" />
            <p className="text-xs italic leading-snug">{group.requirements}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => navigate(`/volunteer-army/group/${group?.group_id ?? ""}`)}
        className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-800 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all group/btn"
      >
        View Group
        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
      </button>
    </div>
  );
};

export default MembershipCard;
