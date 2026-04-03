// components/volunteer/EmptyState.jsx
import { Filter, RefreshCw } from "lucide-react";

/**
 * @param {function} onReset - clears all filters
 */
const EmptyState = ({ onReset }) => (
  <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-400 mb-4">
      <Filter size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">
      No volunteer groups available
    </h3>
    <p className="text-slate-500 mb-8 max-w-xs mx-auto">
      We couldn't find any groups matching your current search or filter
      criteria.
    </p>
    <button
      onClick={onReset}
      className="inline-flex items-center px-6 py-3 bg-slate-100 text-slate-800 rounded-xl font-bold hover:bg-slate-200 transition-colors"
    >
      <RefreshCw size={18} className="mr-2" />
      Reset All Filters
    </button>
  </div>
);

export default EmptyState;
