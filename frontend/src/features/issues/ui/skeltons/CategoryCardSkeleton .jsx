import React from 'react';

const CategoryCardSkeleton = () => {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        p-8 h-full w-full
        bg-white border border-slate-100 rounded-2xl
        text-center
        animate-pulse
      "
    >
      {/* Icon placeholder */}
      <div className="w-8 h-8 rounded-xl bg-slate-200 mb-4" />

      {/* Label placeholder */}
      <div className="h-4 w-24 rounded bg-slate-200" />
    </div>
  );
};

export default CategoryCardSkeleton;