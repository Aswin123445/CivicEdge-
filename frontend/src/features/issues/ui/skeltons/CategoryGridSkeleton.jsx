const CategoryGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="
            p-4 rounded-2xl border border-slate-200 bg-white
            flex flex-col items-center gap-3
            animate-pulse
          "
        >
          {/* Icon placeholder */}
          <div className="w-6 h-6 rounded-full bg-slate-200" />

          {/* Text placeholder */}
          <div className="h-3 w-20 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
};

export default CategoryGridSkeleton;