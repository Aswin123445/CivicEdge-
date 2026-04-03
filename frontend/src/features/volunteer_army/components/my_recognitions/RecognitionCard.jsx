// components/citizen/volunteer/RecognitionCard.jsx
import { Calendar, ChevronRight, ShieldCheck, Medal, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecognitionCard = ({ recognition }) => {
  const navigate = useNavigate();

  const formattedDate = recognition?.issued_at
    ? new Date(recognition.issued_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full relative overflow-hidden">
      {/* Hover glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

      <div className="relative z-10 flex-1 space-y-4">
        {/* Icon + Badge */}
        <div className="flex items-start justify-between">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <Medal size={24} />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={12} />
            Verified
          </div>
        </div>

        {/* Title + Group */}
        <div className="space-y-1">
          <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
            {recognition?.event_title ?? "—"}
          </h3>
          <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            {recognition?.group_name ?? "—"}
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-slate-400 pt-2 border-t border-slate-50">
          <Calendar size={14} />
          <span className="text-xs font-medium">Issued on: {formattedDate}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 relative z-10">
        <button
          onClick={() => navigate(`/volunteer-army/certificate/${recognition?.id}/verify`)}
          className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-900 transition-all shadow-lg shadow-slate-200 active:scale-95 group/btn"
        >
          View Recognition
          <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default RecognitionCard;
