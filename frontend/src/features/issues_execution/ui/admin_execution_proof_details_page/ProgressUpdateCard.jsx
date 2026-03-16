const ProgressUpdateCard = ({ update }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors">
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="text-xs font-mono text-blue-400">{update.reference_id}</p>
        <h4 className="font-semibold mt-1">{update.progress_summary}</h4>
      </div>
      <span className="bg-slate-800 text-blue-400 text-xs font-bold px-2 py-1 rounded border border-slate-700">
        {update.progress_percentage}% Complete
      </span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
      <div>
        <span className="text-slate-500 block mb-1">Blockers</span>
        <p className={update.blockers === 'None' ? 'text-slate-400' : 'text-red-400'}>{update.blockers}</p>
      </div>
      <div>
        <span className="text-slate-500 block mb-1">Next Steps</span>
        <p className="text-slate-300">{update.next_steps}</p>
      </div>
    </div>
    <div className="text-[10px] text-slate-600 font-medium uppercase text-right">
      {new Date(update.created_at).toLocaleString()}
    </div>
  </div>
);

export default ProgressUpdateCard;