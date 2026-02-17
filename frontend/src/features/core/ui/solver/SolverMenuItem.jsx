// eslint-disable-next-line no-unused-vars
export default function SolverMenuItem({ icon: Icon, label, onClick,className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3
        px-3 py-2.5 rounded-lg
        text-slate-700 font-medium
        hover:bg-blue-50 hover:text-blue-700
        transition ${className}
      `}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
