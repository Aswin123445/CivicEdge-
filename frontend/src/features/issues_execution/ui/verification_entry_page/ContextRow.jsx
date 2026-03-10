const ContextRow = ({ label, value, isMono = false }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">{label}</label>
    <p className={`text-sm font-semibold text-slate-700 ${isMono ? 'font-mono' : ''}`}>{value}</p>
  </div>
); 

export default ContextRow