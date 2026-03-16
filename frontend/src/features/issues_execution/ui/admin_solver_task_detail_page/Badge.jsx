const Badge = ({ label, color }) => {
  const colors = {
    blue: "bg-[#lelele] text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    slate: "bg-slate-800 text-slate-400 border-slate-700"
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${colors[color]}`}>
      {label}
    </span>
  );
};

export default Badge;