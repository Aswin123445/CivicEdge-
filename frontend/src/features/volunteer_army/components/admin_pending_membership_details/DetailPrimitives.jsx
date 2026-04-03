// components/admin/memberships/detail/DetailPrimitives.jsx

// ─── SectionCard ──────────────────────────────────────
export const SectionCard = ({ title, icon, children }) => (
  <div className="bg-[#1e1e1e] border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-700/30 flex items-center gap-3">
      {icon}
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 italic">
        {title}
      </h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ─── MetadataRow ──────────────────────────────────────
export const MetadataRow = ({ label, value, icon }) => (
  <div className="flex items-center justify-between text-sm py-1">
    <div className="flex items-center gap-2 text-slate-500">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">
        {label}
      </span>
    </div>
    <span className="text-slate-300 font-medium truncate max-w-[150px]">
      {value ?? "—"}
    </span>
  </div>
);

// ─── StatusBadge ──────────────────────────────────────
export const MembershipStatusBadge = ({ status }) => {
  const colors = {
    PENDING:   "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    SUBMITTED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ACTIVE:    "bg-green-500/10 text-green-500 border-green-500/20",
    APPROVED:  "bg-green-500/10 text-green-500 border-green-500/20",
    REJECTED:  "bg-red-500/10 text-red-400 border-red-500/20",
  };

  if (!status) return null;

  return (
    <div className={`px-4 py-2 border rounded-xl font-black text-xs uppercase tracking-widest ${colors[status] ?? "bg-slate-700 text-slate-400 border-slate-600"}`}>
      {status}
    </div>
  );
};
