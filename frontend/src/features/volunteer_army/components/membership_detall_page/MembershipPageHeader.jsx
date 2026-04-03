// components/volunteer/MembershipPageHeader.jsx
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

/**
 * @param {object}   membership  - { group_name, id, status }
 * @param {function} onViewEvents
 */
const MembershipPageHeader = ({ membership, onViewEvents }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-slate-200">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-slate-900 text-sm font-semibold mb-6 transition-colors group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {membership?.group_name}
              </h1>
              <StatusBadge status={membership?.status} />
            </div>
            <p className="text-slate-500 font-medium">
              Application ID: {membership?.reference_id}
            </p>
          </div>

          {membership?.status === "ACTIVE" && (
            <button
              onClick={onViewEvents}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              View Events <ChevronRight size={18} />
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default MembershipPageHeader;
