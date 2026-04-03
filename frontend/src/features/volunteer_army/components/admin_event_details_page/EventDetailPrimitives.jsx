// components/admin/events/detail/EventDetailPrimitives.jsx

// ─── SectionCard ──────────────────────────────────────
export const SectionCard = ({ title, icon, children }) => (
  <section className="bg-[#1e1e1e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-800/50 flex items-center gap-3">
      {icon}
      <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
        {title}
      </h3>
    </div>
    <div className="p-6">{children}</div>
  </section>
);

// ─── MetaRow ──────────────────────────────────────────
export const MetaRow = ({ label, value, icon }) => (
  <div className="flex justify-between items-center text-[11px] py-1">
    <span className="text-slate-500 font-bold uppercase tracking-tighter">
      {label}
    </span>
    <span className="text-slate-300 font-black flex items-center gap-1">
      {icon} {value ?? "—"}
    </span>
  </div>
);

// ─── StatusBadge ──────────────────────────────────────
export const StatusBadge = ({ status }) => {
  const styles = {
    DRAFT:     "bg-slate-800 text-slate-400",
    PUBLISHED: "bg-green-500/10 text-green-400 border border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  if (!status) return null;

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status] ?? "bg-slate-800 text-slate-400"}`}>
      {status}
    </span>
  );
};

// ─── RuntimeBadge ─────────────────────────────────────
export const RuntimeBadge = ({ status }) => {
  const styles = {
    UPCOMING:  "text-blue-400",
    ONGOING:   "text-yellow-400 animate-pulse",
    COMPLETED: "text-slate-500",
  };

  if (!status) return null;

  return (
    <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${styles[status] ?? "text-slate-400"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};
