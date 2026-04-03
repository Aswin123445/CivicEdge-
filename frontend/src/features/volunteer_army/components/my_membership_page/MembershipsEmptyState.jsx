// components/citizen/memberships/MembershipsEmptyState.jsx
import { AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MembershipsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-center px-6">
      <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-slate-300">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        You haven't joined any groups yet
      </h2>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Start contributing to your community by exploring available volunteer opportunities.
      </p>
      <button
        onClick={() => navigate("/groups/explore")}
        className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
      >
        Explore Groups
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default MembershipsEmptyState;
