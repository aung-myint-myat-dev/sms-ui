import { ChevronLeft, ChevronRight } from "lucide-react";

export function Paginator ({ paginationData, onPageChange, onPerPageChange, entityName = "Staff" }) {
  const {
    current_page = 1,
    from = 0,
    to = 0,
    total = 0,
    last_page = 1,
    per_page = 10
  } = paginationData || {};

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-4 text-sm text-gray-500">
      {/* Left Page Number Status */}
      <p className="text-xs text-zinc-500">
        Showing {from || 0} to {to || 0} of {total} {entityName}
      </p>

      {/* Right Buttons */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className={`cursor-pointer p-1.5 rounded-md border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="size-4"/>
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer px-3 py-1 rounded-md text-sm font-medium transition-colors ${current_page === page
                ? 'bg-theme text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-transparent'
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
          className={`cursor-pointer p-1.5 rounded-md border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Next Page"
        >
          <ChevronRight className="size-4"/>
        </button>

        {/* Per Page Dropdown */}
        <div className="ml-2">
          <select
            value={per_page}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="border cursor-pointer border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value={10}>10 / Pages</option>
            <option value={25}>25 / Pages</option>
            <option value={50}>50 / Pages</option>
            <option value={100}>100 / Pages</option>
          </select>
        </div>
      </div>
    </div>
  );
};