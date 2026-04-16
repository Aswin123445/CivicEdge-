import { MessageSquare, Plus } from "lucide-react";

/**
 * EmptyState
 *
 * Props:
 *  - onAction {function} Called when the "Start a Discussion" button is clicked.
 */
const EmptyState = ({ onAction }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-100 rounded-2xl">
    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-4">
      <MessageSquare className="text-slate-300 w-7 h-7" />
    </div>
    <h3 className="text-base font-bold text-slate-900">
      No discussions yet
    </h3>
    <p className="text-slate-500 text-sm max-w-xs mt-2 mb-8 leading-relaxed">
      Share your ideas or concerns to begin contributing to your community.
    </p>
    <button
      onClick={onAction}
      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm text-sm"
    >
      <Plus size={16} />
      Start a Discussion
    </button>
  </div>
);

export default EmptyState;
