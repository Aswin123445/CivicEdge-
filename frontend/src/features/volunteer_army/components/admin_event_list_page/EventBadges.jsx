// components/admin/events/EventBadges.jsx

export const RuntimeStatusBadge = ({ status }) => {
  const styles = {
    UPCOMING:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ONGOING:   "bg-green-500/10 text-green-400 border-green-500/20",
    COMPLETED: "bg-slate-800 text-slate-500 border-slate-700",
  };

  if (!status) return null;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border tracking-wider ${styles[status] ?? "bg-slate-800 text-slate-500 border-slate-700"}`}>
      {status}
    </span>
  );
};

export const EventStatusBadge = ({ status }) => {
  const styles = {
    PUBLISHED: "text-green-400",
    DRAFT:     "text-slate-500",
    CANCELLED: "text-red-400",
  };

  if (!status) return null;

  return (
    <span className={`flex items-center gap-1.5 text-[11px] font-bold ${styles[status] ?? "text-slate-500"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};
