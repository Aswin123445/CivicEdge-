const InfoBlock = ({ label, value }) => (
  <div className="space-y-1">
    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
    <div className="text-sm font-medium text-slate-200">{value}</div>
  </div>
);

export default InfoBlock;