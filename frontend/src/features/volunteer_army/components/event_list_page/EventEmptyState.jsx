// components/volunteer/EventEmptyState.jsx
import { Filter } from "lucide-react";

/**
 * @param {function} onReset - clears filters
 */
const EventEmptyState = ({ onReset }) => (
  <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl col-span-full">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-400 mb-4">
      <Filter size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">No events found</h3>
    <p className="text-slate-500 mb-8 max-w-xs mx-auto">
      No events match your current search or filter criteria.
    </p>
  </div>
);

export default EventEmptyState;
