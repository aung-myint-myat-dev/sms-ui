import { getPageNumbers } from "../lib/get-page-number";

export function Paginator({
  paginator,
  onPageChange,
  onPerPageChange,
  label = "Items",
}) {
  const {
    current_page: currentPage,
    last_page: totalPages,
    total: totalItems,
    per_page: perPage,
    from,
    to,
  } = paginator;

  const pageNumbers = getPageNumbers({
    totalPages,
    currentPage,
  });

  return (
    <div className="flex items-center justify-between">
      {/* Showing */}
      <p className="text-xs text-zinc-500">
        Showing {from ?? 0} to {to ?? 0} of {totalItems} {label}
      </p>

      <div className="flex items-center gap-3">
        {/* Per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">
            Show
          </span>

          <select
            value={perPage}
            onChange={(e) => {
              onPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-zinc-400"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <span className="text-sm text-zinc-500">
            per page
          </span>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          {/* Previous */}
          {currentPage > 1 && (
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-100"
            >
              Previous
            </button>
          )}

          {/* Page numbers */}
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-2 text-zinc-500"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  currentPage === page
                    ? "bg-green-700 text-white"
                    : "border hover:bg-zinc-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-100"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
