// components/volunteer/ParticipationEmptyState.jsx
import { Calendar, ArrowRight } from "lucide-react";

/**
 * @param {function} onExplore - navigates to events list
 */
const ParticipationEmptyState = ({ onExplore }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
      <Calendar size={40} />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-slate-900">
        You haven't joined any events yet
      </h3>
      <p className="text-slate-500 max-w-sm">
        Every small action contributes to a larger change. Explore upcoming
        events to start your journey.
      </p>
    </div>
    <button
      onClick={onExplore}
      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
    >
      Explore Events <ArrowRight size={18} />
    </button>
  </div>
);

export default ParticipationEmptyState;
