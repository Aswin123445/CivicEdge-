import React from "react";
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
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full flex justify-center mt-10">
      <div
        className={clsx(
          `
          flex items-center gap-4
          rounded-full px-6 py-2 shadow
          bg-[#1e1e1e] border border-[#333b49]
        `,
          className
        )}
      >
        {/* Left Arrow */}
        {!isFirstPage && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={clsx(
              `
              rounded-full p-2
              text-gray-400
              hover:bg-gray-600 hover:text-white
              transition
            `,
              buttonClassName
            )}
          >
            <LeftArrow />
          </button>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              `
              w-9 h-9 flex items-center justify-center
              rounded-full text-sm font-medium transition
            `,
              page === currentPage
                ? "bg-gray-500 text-white shadow"
                : "text-gray-400 hover:bg-gray-600 hover:text-white",
              buttonClassName
            )}
          >
            {page}
          </button>
        ))}

        {/* Right Arrow */}
        {!isLastPage && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={clsx(
              `
              rounded-full p-2
              text-gray-400
              hover:bg-gray-600 hover:text-white
              transition
            `,
              buttonClassName
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