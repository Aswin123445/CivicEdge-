const SectionHeader = ({
  title = "My Activity",
  subtitle = "Track your recent actions and contributions",
  rightContent = null,
}) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Optional right side (button / filter / link) */}
      {rightContent && (
        <div>
          {rightContent}
        </div>
      )}
    </div>
  );
}; 

export default SectionHeader