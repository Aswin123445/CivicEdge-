import { useNavigate } from "react-router-dom";
const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-300 rounded ${className}`} />
);

export const ParticipationPageHeaderSkeleton = () => (
  <header className="bg-white pt-12 pb-8 border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Pulse className="h-9 w-56" />
          <Pulse className="h-4 w-72" />
        </div>
        <Pulse className="h-9 w-36 rounded-2xl" />
      </div>
    </div>
  </header>
);

// ─── Component ────────────────────────────────────────
/**
 * @param {number} totalCount - total participation count
 */
const ParticipationPageHeader = ({ totalCount = 0 }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white pt-12 pb-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Participations
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Track your contributions and ongoing activities.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/volunteer-army/recognitions")}
              className="
                  flex items-center gap-2
                  px-4 py-2.5
                  rounded-xl
                  bg-gradient-to-r from-blue-50 to-indigo-50
                  border border-blue-100
                  text-blue-700
                  text-sm font-semibold
                  shadow-sm
                  hover:shadow-md hover:from-blue-100 hover:to-indigo-100
                  transition-all duration-200
                "
            >
              <span className="text-base">🏆</span>
              My Recognitions
            </button>

            {/* Count */}
            <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
              <span className="text-blue-700 font-bold text-sm">
                Total: {totalCount} Event{totalCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ParticipationPageHeader;
