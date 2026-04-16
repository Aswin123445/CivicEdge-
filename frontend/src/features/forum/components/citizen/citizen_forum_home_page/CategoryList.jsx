import React from "react";
import CategoryPill from "./CategoryPill";

const CategorySkeleton = () => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-8 w-24 rounded-full bg-slate-200 animate-pulse"
        />
      ))}
    </div>
  );
};

const CategoryList = ({
  categories = [],
  activeCategoryName = null,
  onSelect,
  isLoading = false,
}) => {
  return (
    <section className="mb-8">
      
      {/* Loading State */}
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
          
          {/* All Topics */}
          <CategoryPill
            name="All Topics"
            isActive={activeCategoryName === null}
            onClick={() => onSelect?.(null)}
          />

          {/* Categories */}
          {categories.map((cat) => (
            <CategoryPill
              key={cat?.id}
              name={cat?.name ?? ""}
              isActive={activeCategoryName === cat?.reference_id}
              onClick={() => onSelect?.(cat?.reference_id ?? null)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryList;