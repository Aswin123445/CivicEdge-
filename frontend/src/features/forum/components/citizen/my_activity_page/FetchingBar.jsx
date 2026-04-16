/**
 * FetchingBar
 * Shown when myActivityFetching is true but myActivityLoading is false.
 * Displayed above stale data to signal a background refresh is in progress.
 */
const FetchingBar = () => (
  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-4">
    <svg
      className="w-3.5 h-3.5 text-blue-500 animate-spin flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
      />
    </svg>
    Refreshing your activity…
  </div>
);

export default FetchingBar;
