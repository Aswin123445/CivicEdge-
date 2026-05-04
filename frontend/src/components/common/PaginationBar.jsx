import React, { useMemo } from "react";
import LeftArrow from "../ui/LeftArrow";
import RightArrow from "../ui/RightArrow";
import clsx from "clsx";

const Pagination = ({
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  onPageChange,
  className = "",
  buttonClassName = "",
  siblingCount = 2,
}) => {
  if (totalPages <= 1) return null;

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const range = [];

    // Always first page
    range.push(1);

    // Left ellipsis or page 2
    if (showLeftDots) {
      range.push("LEFT_ELLIPSIS");
    } else {
      // No left dots: fill pages between 1 and leftSiblingIndex
      for (let i = 2; i < leftSiblingIndex; i++) range.push(i);
    }

    // Middle sibling pages (excluding 1 and totalPages)
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i > 1 && i < totalPages) range.push(i);
    }

    // Right ellipsis or second-to-last page
    if (showRightDots) {
      range.push("RIGHT_ELLIPSIS");
    } else {
      // No right dots: fill pages between rightSiblingIndex and totalPages
      for (let i = rightSiblingIndex + 1; i < totalPages; i++) range.push(i);
    }

    // Always last page
    range.push(totalPages);

    // ✅ Deduplicate to prevent duplicate active buttons
    return [...new Set(range)];
  }, [currentPage, totalPages, siblingCount]);

  return (
    <div className="w-full flex justify-center mt-10">
      <div
        className={clsx(
          `flex items-center gap-2 rounded-full px-4 py-2 shadow bg-[#1e1e1e] border border-[#333b49]`,
          className,
        )}
      >
        {!isFirstPage && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={clsx(
              `rounded-full p-2 text-gray-400 hover:bg-gray-600 hover:text-white transition`,
              buttonClassName,
            )}
          >
            <LeftArrow />
          </button>
        )}

        {/* ✅ Fixed: clean .map() call */}
        {paginationRange.map((page, index) => {
          if (page === "LEFT_ELLIPSIS" || page === "RIGHT_ELLIPSIS") {
            return (
              <span key={page} className="px-2 text-gray-400 select-none">
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={clsx(
                `w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition`,
                page === currentPage
                  ? "bg-gray-500 text-white shadow"
                  : "text-gray-400 hover:bg-gray-600 hover:text-white",
                buttonClassName,
              )}
            >
              {page}
            </button>
          );
        })}

        {!isLastPage && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={clsx(
              `rounded-full p-2 text-gray-400 hover:bg-gray-600 hover:text-white transition`,
              buttonClassName,
            )}
          >
            <RightArrow />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
