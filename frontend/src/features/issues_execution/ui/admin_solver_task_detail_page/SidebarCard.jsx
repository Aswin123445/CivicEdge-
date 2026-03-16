const SidebarCard = ({ title, children }) => (
  <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden shadow-sm">
    <div className="px-5 py-3 border-b border-slate-800 bg-slate-800/30">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

export default SidebarCard;