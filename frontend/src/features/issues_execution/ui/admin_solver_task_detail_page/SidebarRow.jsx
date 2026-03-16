const SidebarRow = ({ label, value, highlight }) => (
  <div className="flex justify-between items-start gap-4 text-sm">
    <span className="text-slate-500 whitespace-nowrap">{label}</span>
    <span className={`font-semibold text-right ${highlight ? 'text-blue-400' : 'text-slate-200'}`}>{value}</span>
  </div>
);

export default SidebarRow