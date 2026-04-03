// components/volunteer/GroupCard.jsx
import { Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

/**
 * @param {object}   group        - API group object
 * @param {string}   group.id
 * @param {string}   group.name
 * @param {string}   group.description
 * @param {string}   group.membership_type  - "OPEN" | "APPROVAL_REQUIRED"
 * @param {string}   group.risk_level
 * @param {number}   [group.members_count]  - optional, may not exist in list endpoint
 */
const GroupCard = ({ group }) => {
  const navigate = useNavigate();

  // Map backend membership_type to display status
  const displayStatus =
    group.membership_type === "OPEN" ? "OPEN" : "RESTRICTED";

  return (
    <div
      className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-400 cursor-pointer flex flex-col"
      onClick={() => navigate(`/volunteer-army/group/${group.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-900 font-bold text-lg leading-snug group-hover:text-blue-600 transition-colors pr-2">
          {group.name}
        </h3>
        <StatusBadge status={displayStatus} />
      </div>

      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
        {group.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        {group.members_count !== undefined ? (
          <div className="flex items-center text-slate-500 text-sm">
            <Users size={16} className="mr-2" />
            <span>{group.members_count} members</span>
          </div>
        ) : (
          <span className="text-xs text-slate-400 uppercase tracking-wide">
            {group.reference_id} 
          </span>
        )}
        <div className="flex items-center text-blue-600 font-semibold text-sm">
          View Group
          <ArrowRight
            size={16}
            className="ml-1 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
