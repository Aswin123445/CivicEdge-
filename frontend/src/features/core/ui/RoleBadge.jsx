export default function RoleBadge({ role = "Solver" ,className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        rounded-md
        text-xs font-bold
        uppercase tracking-wide
        bg-blue-50
        text-blue-700
        border border-blue-200
        ${className}
      `}
    >
      {role}
    </span>
  );
}
