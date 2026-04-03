// components/volunteer/GroupCard.jsx
import { Users, ArrowRight } from "lucide-react";

const GroupCard = ({ group, onViewGroup }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
        <Users size={20} />
      </div>
      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          group.status === "OPEN"
            ? "bg-green-100 text-green-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {group.status}
      </span>
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2">{group.name}</h4>
    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{group.desc}</p>
    <button
      onClick={() => onViewGroup?.(group.id)}
      className="w-full py-2 px-4 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
    >
      View Group <ArrowRight size={16} />
    </button>
  </div>
);

export default GroupCard;
