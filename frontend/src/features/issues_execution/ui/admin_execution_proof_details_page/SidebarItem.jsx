const SidebarItem = ({ label, value, isStatus }) => (
  <div className="flex justify-between text-sm">
    <span className="text-slate-500">{label}</span>
    <span className={`font-medium ${isStatus ? 'text-blue-400 bg-blue-400/10 px-2 rounded' : 'text-slate-200'}  `}>
      {value}
    </span>
  </div>
);

export default SidebarItem;