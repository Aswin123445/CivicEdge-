import { Inbox, ArrowUpRight } from "lucide-react";

/**
 * MyVotesEmptyState
 *
 * Props:
 *   onExplorePolls () => void
 */
const MyVotesEmptyState = ({ onExplorePolls }) => (
  <div className=" bg-slate-50 flex flex-col items-center justify-center p-3 text-center">
    <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
      <Inbox size={40} className="text-slate-200" />
    </div>

    <h2 className="text-2xl font-bold text-slate-900">
      You haven't participated in any polls yet
    </h2>

    <p className="text-slate-500 mt-2 max-w-xs mx-auto">
      Your voice matters! Explore active polls and contribute to your
      community's decisions.
    </p>

    <button
      onClick={onExplorePolls}
      className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2"
    >
      Explore Polls <ArrowUpRight size={18} />
    </button>
  </div>
);

export default MyVotesEmptyState;
