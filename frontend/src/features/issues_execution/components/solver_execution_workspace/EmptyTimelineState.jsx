const EmptyTimelineState = () => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-200">
      <svg
        className="h-7 w-7 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    <h3 className="text-base font-semibold text-slate-700">
      No progress updates yet
    </h3>
    <p className="mt-1 text-sm text-slate-500 max-w-sm">
      Progress updates from the solver will appear here once execution work
      begins.
    </p>
  </div>
);

export default EmptyTimelineState;