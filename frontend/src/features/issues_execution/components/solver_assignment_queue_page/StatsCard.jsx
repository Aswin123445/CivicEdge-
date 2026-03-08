const StatsCard = ({ issues,today_count }) => {
  return (
    <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        Quick Statistics
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">Awaiting Assignment</span>
          <span className="text-2xl font-bold text-slate-100">
            {issues.length}
          </span>
        </div>
        <div className="flex justify-between items-end border-b border-slate-800 pb-3">
          <span className="text-slate-400 text-sm">Submitted Today</span>
          <span className="text-2xl font-bold text-slate-100">{today_count}</span>
        </div>

      </div>
    </div>
  );
};

export default StatsCard;
