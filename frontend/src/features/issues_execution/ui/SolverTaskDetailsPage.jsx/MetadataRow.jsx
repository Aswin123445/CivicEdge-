const MetadataRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
    <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{label}</span>
    <span className="text-sm font-semibold text-slate-700 truncate ml-4">{value}</span>
  </div>
);
 
export default MetadataRow;