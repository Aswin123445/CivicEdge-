const ProgressUpdateCard = ({ update }) => (
  <div className="relative pl-10">
    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-900 border-4 border-slate-950 flex items-center justify-center ring-1 ring-slate-800">
       <span className="text-[10px] font-bold text-blue-500">{update?.progress_percentage}%</span>
    </div>
    <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-slate-100">{update?.progress_summary}</h4>
        <span className="text-[10px] font-mono text-slate-500">{update?.reference_id}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-4 pt-4 border-t border-slate-800/50">
        <div>
          <span className="text-slate-500 block mb-1 font-bold uppercase tracking-tighter">Blockers</span>
          <p className={update?.blockers === 'None' ? 'text-slate-400' : 'text-red-400'}>{update?.blockers}</p>
        </div>
        <div>
          <span className="text-slate-500 block mb-1 font-bold uppercase tracking-tighter">Next Steps</span>
          <p className="text-slate-300">{update?.next_steps}</p>
        </div>
      </div>
      <div className="text-[9px] text-right mt-3 text-slate-600 uppercase font-bold tracking-widest">
        {new Date(update?.created_at).toLocaleString()}
      </div>
    </div>
  </div>
);
export default ProgressUpdateCard;