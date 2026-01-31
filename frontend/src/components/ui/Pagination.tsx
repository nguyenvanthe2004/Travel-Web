import React from "react";
import { PaginationProps } from "../../types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 :border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
      <p className="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-left">
        Page{" "}
        <span className="font-semibold text-gray-900 :text-white">
          {currentPage}
        </span>{" "}
        of {totalPages}
      </p>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() =>
            onPageChange?.(Math.max(1, currentPage - 1))
          }
          disabled={currentPage === 1}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 :border-gray-700 text-gray-400 hover:bg-gray-50 :hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">
            chevron_left
          </span>
        </button>

        {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-semibold text-xs sm:text-sm transition-colors ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-gray-500 :text-gray-400 hover:bg-gray-50 :hover:bg-gray-800"
              }`}
            >
              {page}
            </button>
          );
        })}

        {totalPages > 3 && (
          <>
            <span className="text-gray-400 px-1">...</span>
            <button
              onClick={() => onPageChange?.(totalPages)}
              className="hidden sm:block w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-gray-500 :text-gray-400 hover:bg-gray-50 :hover:bg-gray-800 font-semibold text-xs sm:text-sm transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() =>
            onPageChange?.(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 :border-gray-700 text-gray-400 hover:bg-gray-50 :hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
