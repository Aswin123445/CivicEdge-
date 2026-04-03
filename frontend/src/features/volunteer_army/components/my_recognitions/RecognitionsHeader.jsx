// components/citizen/volunteer/RecognitionsHeader.jsx
import { Award } from "lucide-react";
import Skeleton from "./Skeleton";

const RecognitionsHeader = ({ count, isLoading }) => (
  <header className="bg-white pt-16 pb-10 border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            My Recognitions
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">
            A showcase of your verified contributions and achievements within the CivicEdge community.
          </p>
        </div>

        {/* Count badge — skeleton while loading, hidden when empty */}
        {isLoading ? (
          <Skeleton className="w-32 h-16 rounded-2xl" />
        ) : (count ?? 0) > 0 ? (
          <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 flex items-center gap-3 shrink-0">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <Award size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">
                Total Earned
              </p>
              <p className="text-xl font-black text-blue-700 leading-none">{count}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  </header>
);

export default RecognitionsHeader;
