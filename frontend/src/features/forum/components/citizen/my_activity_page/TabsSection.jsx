const TABS = [
  { id: "all",         label: "All Activity",   active: true  },
  { id: "discussions", label: "My Discussions", active: false },
  { id: "commented",   label: "Commented",      active: false, disabled: true },
  { id: "reacted",     label: "Reacted",        active: false, disabled: true },
];

const TabsSection = () => (
  <div className="flex border-b border-slate-200 mb-6 overflow-x-auto no-scrollbar">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        disabled={tab.disabled}
        className={`
          px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200
          ${tab.active
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-slate-500 hover:text-slate-700"}
          ${tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default TabsSection;
