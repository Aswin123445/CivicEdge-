export default function DutyStatus({ status = false }) {
  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-4 py-2 rounded-full
        text-sm font-semibold
        border
        ${
          status
            ? "bg-emerald-100/60 text-emerald-800 border-emerald-300"
            : "bg-slate-200/70 text-slate-600 border-slate-300"
        }
      `}
    >
      <span
        className={`
          w-2.5 h-2.5 rounded-full
          ${
            status
              ? "bg-emerald-600 animate-pulse"
              : "bg-slate-500"
          }
        `}
      />
      {status ? "On Duty" : "Offline"}
    </div>
  );
}
