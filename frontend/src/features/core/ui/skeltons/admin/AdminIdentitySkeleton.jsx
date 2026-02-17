export function AdminIdentitySkeleton() {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse">
      
      {/* Icon placeholder */}
      <div className="w-10 h-10 rounded-lg bg-slate-700/60" />

      {/* Text placeholders */}
      <div className="flex flex-col gap-1">
        <div className="w-20 h-3 rounded bg-slate-700/60" />
        <div className="w-28 h-4 rounded bg-slate-600/70" />
      </div>

    </div>
  );
}
