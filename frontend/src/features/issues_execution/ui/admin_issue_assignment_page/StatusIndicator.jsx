const StatusIndicator = ({ status }) => {
  const configs = {
    AVAILABLE: {
      color: "bg-emerald-500",
      text: "Available",
      light: "text-emerald-400",
    },
    OFFLINE: {
      color: "bg-slate-600",
      text: "Offline",
      light: "text-slate-500",
    },
  };
  const config = status? configs["AVAILABLE"] : configs["OFFLINE"];
  

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-900 border border-slate-800">
      <div className={`w-2 h-2 rounded-full ${config.color}`} />
      <span
        className={`text-[10px] font-bold uppercase tracking-tighter ${config.light}`}
      >
        {config.text}
      </span>
    </div>
  );
}; 
export default StatusIndicator;