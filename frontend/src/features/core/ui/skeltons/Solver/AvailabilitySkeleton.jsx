export default function AvailabilitySkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      {/* Label */}
      <span className="h-4 w-14 rounded bg-slate-200" />

      {/* Toggle placeholder */}
      <div className="relative w-12 h-6 rounded-full bg-slate-200">
        <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-slate-300" />
      </div>

      {/* Status text */}
      <span className="h-4 w-20 rounded bg-slate-200" />
    </div>
  );
}
