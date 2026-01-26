import React from "react";
import LeftArrow from "../ui/LeftArrow";
import RightArrow from "../ui/RightArrow";
const Pagination = ({ currentPage, totalPages, onNext,onPrev,onPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="flex items-center gap-4 bg-[#1e1e1e] border border-[#333b49] rounded-full px-6 py-2 shadow">
        
        {/* Left Arrow */}
        <div className="rounded-full hover:bg-gray-600 p-2">
            <LeftArrow/>
        </div>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPage(page)}
            className={`w-9 h-9 flex text-white items-center justify-center rounded-full text-lg font-medium transition
              ${
                page === currentPage
                  ? "bg-gray-500 text-white shadow"
                  : "text-gray-700 hover:bg-gray-600 hover:text-white"
              }
            `}
          >
            {page}
          </button>
        ))}

        {/* Right Arrow */}
        <div className="rounded-full hover:bg-gray-600 p-2">
            <RightArrow/>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
