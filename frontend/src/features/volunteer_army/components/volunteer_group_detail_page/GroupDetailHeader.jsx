// components/volunteer/GroupDetailHeader.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Badge from "./Badge";

/**
 * @param {object} group - { name, reference_id, membership_type, risk_level }
 */
const GroupDetailHeader = ({ group }) => {
  const navigate = useNavigate();

  const membershipVariant = group?.membership_type === "OPEN" ? "green" : "yellow";
  const riskVariant =
    group?.risk_level === "HIGH"
      ? "red"
      : group?.risk_level === "MEDIUM"
      ? "yellow"
      : "neutral";

  return (
    <>
      {/* Back nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-slate-900 font-semibold text-sm transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back to groups
        </button>
      </nav>

      {/* Title + badges */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant={membershipVariant}>
              {group?.membership_type === "OPEN" ? "OPEN" : "RESTRICTED"}
            </Badge>
            <Badge variant={riskVariant}>{group?.risk_level} RISK</Badge>
            <span className="text-slate-400 text-xs font-mono ml-2">
              {group?.reference_id}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {group?.name}
          </h1>
        </div>
      </header>
    </>
  );
};

export default GroupDetailHeader;
