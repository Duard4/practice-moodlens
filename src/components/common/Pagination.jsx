const Pagination = ({
  pagination,
  onPageChange,
  currentPage: urlCurrentPage,
  className = '',
}) => {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { totalPages, hasPrevPage, hasNextPage } = pagination;
  const currentPage = urlCurrentPage || pagination.currentPage || 1;

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(...[1, 2, 3, 4, 5, '...', totalPages]);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          ...[
            1,
            '...',
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          ],
        );
      } else {
        pages.push(
          ...[
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages,
          ],
        );
      }
    }

    return pages;
  };

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <div className="join">
        <button
          className="join-item btn"
          disabled={hasPrevPage === false}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </button>

        {generatePageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="join-item btn btn-disabled"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={`join-item btn ${
                page === currentPage ? 'btn-active' : ''
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className="join-item btn"
          disabled={hasNextPage === false}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
