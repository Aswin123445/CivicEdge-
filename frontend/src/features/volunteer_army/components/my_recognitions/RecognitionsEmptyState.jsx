// components/citizen/volunteer/RecognitionsEmptyState.jsx
import { Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecognitionsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
        <Trophy size={48} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">
        You haven't earned any recognitions yet
      </h3>
      <p className="text-slate-500 max-w-sm mb-8 font-medium">
        Your impact matters. Start participating in events to earn official community recognitions.
      </p>
      <button
        onClick={() => navigate("/events")}
        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 group active:scale-95"
      >
        Explore Events
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default RecognitionsEmptyState;
