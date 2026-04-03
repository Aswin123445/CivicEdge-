// components/volunteer/EventFilterTabs.jsx

const TABS = [
  { value: "all",       label: "All" },
  { value: "upcoming",  label: "Upcoming" },
  { value: "live",   label: "Ongoing" },
  { value: "completed", label: "Completed" },
];

/**
 * @param {string}   active    - current active tab value
 * @param {function} onChange  - (value: string) => void
 */
const EventFilterTabs = ({ active = "All", onChange }) => (
  <div className="flex items-center space-x-1 mb-8 bg-slate-100 p-1 rounded-xl w-fit">
    {TABS.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange?.(tab.value)}
        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
          active === tab.value
            ? "bg-white text-blue-600 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default EventFilterTabs;
