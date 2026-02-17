export default function EditableAvatarSkeletonDark({ className = "" }) {
  const isLight = className.includes("light");

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative w-32 h-32 animate-pulse">
        
        {/* Outer Glow Ring */}
        <div
          className={`
            absolute -inset-1.5 rounded-[2rem] blur-md
            ${
              isLight
                ? "bg-gradient-to-tr from-blue-400/30 to-indigo-400/30"
                : "bg-gradient-to-tr from-blue-500/20 to-indigo-500/20"
            }
          `}
        />

        {/* Avatar Shell */}
        <div
          className={`
            relative h-full w-full rounded-[1.8rem] p-1 overflow-hidden shadow-2xl
            ${
              isLight
                ? "bg-white border border-slate-200"
                : "bg-neutral-900 border border-neutral-700"
            }
          `}
        >
          <div
            className={`
              h-full w-full rounded-[1.5rem]
              ${isLight ? "bg-slate-200" : "bg-neutral-800"}
            `}
          />
        </div>

        {/* Floating Edit Badge Skeleton */}
        <div
          className={`
            absolute -bottom-1 -right-1 w-8 h-8 rounded-xl shadow-lg
            ${
              isLight
                ? "bg-blue-500/40 border border-blue-300/40"
                : "bg-blue-600/50 border border-blue-400/30"
            }
          `}
        />
      </div>
    </div>
  );
}
