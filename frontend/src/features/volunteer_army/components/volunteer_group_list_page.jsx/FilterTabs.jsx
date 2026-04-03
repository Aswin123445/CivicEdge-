// components/volunteer/FilterTabs.jsx

const TABS = [
  { value: "All",        label: "All Groups" },
  { value: "OPEN",       label: "Open" },
  { value: "APPROVAL_REQUIRED", label: "Restricted" },
];

/**
 * @param {string}   active     - current active tab value
 * @param {function} onChange   - (value: string) => void
 */
const FilterTabs = ({ active, onChange }) => (
  <div className="flex items-center space-x-1 mb-10 bg-slate-100 p-1 rounded-xl w-fit">
    {TABS.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
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

export default FilterTabs;
