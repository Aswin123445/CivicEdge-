// components/volunteer/ParticipationFilterTabs.jsx

const TABS = ["all","upcoming","live", "completed"];

/**
 * @param {string}   active    - current active tab
 * @param {function} onChange  - (tab: string) => void
 */
const ParticipationFilterTabs = ({ active = "All", onChange }) => (
  <div className="flex overflow-x-auto gap-2 pb-2">
    {TABS.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange?.(tab)}
        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
          active === tab
            ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
            : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default ParticipationFilterTabs;
