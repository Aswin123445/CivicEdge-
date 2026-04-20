import React from "react";
import { Clock, ArrowRight, MapPin, Users,Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
const MyActivity = ({ topTwoActivities,url }) => {
    const navigate = useNavigate()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Activity Cards */}
      {topTwoActivities.map((item) => (
        <div
          key={item.id}
          className="group relative bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              {item.entity}
            </span>
            <Clock size={14} className="text-slate-300" />
          </div>

          <p className="text-slate-800 font-semibold text-sm leading-snug line-clamp-2 min-h-[40px]">
            {item.message}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-50">
            <p className="text-[11px] text-slate-400 font-medium">
              {new Date(item.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}

      {/* The "Third Card" - View All CTA */}
      <button
        onClick={() => navigate(url)}
        className="group flex flex-col items-center justify-center p-6 bg-blue-600 rounded-2xl border border-blue-700 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all duration-300 text-center min-h-[160px]"
      >
        <div className="mb-3 p-3 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
          <Activity size={24} className="text-white" />
        </div>
        <h3 className="text-white font-bold text-lg">View All Activity</h3>
        <p className="text-blue-100 text-xs mt-1">Track your full history</p>
        <div className="mt-4 flex items-center gap-2 text-white text-sm font-bold">
          Explore
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </button>
    </div>
  );
};

export default MyActivity;
