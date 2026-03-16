const SidebarItem = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500">{label}</span>
    <span className={`font-medium ${highlight ? 'text-blue-400' : 'text-slate-300'}`}>{value}</span>
  </div>
);
export  default SidebarItem