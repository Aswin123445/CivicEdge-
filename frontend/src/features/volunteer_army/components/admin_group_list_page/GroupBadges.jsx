// components/admin/volunteer-groups/GroupBadges.jsx

export const RiskBadge = ({ level }) => {
  const styles = {
    LOW:    "bg-green-500/10 text-green-400 border-green-500/20",
    MEDIUM: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    HIGH:   "bg-red-500/10 text-red-400 border-red-500/20",
  };

  if (!level) return null;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${styles[level] ?? "bg-slate-700 text-slate-400 border-slate-600"}`}>
      {level}
    </span>
  );
};

export const GroupStatusBadge = ({ status }) => {
  const styles = {
    ACTIVE:   "bg-blue-500/10 text-blue-400 border-blue-500/20",
    DRAFT:    "bg-slate-700/50 text-slate-400 border-slate-600",
    ARCHIVED: "bg-slate-800 text-slate-500 border-slate-700",
  };

  if (!status) return null;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${styles[status] ?? "bg-slate-700 text-slate-400 border-slate-600"}`}>
      {status}
    </span>
  );
};
