// ReviewsPage.js - Updated to work with filters and pagination
import { Filter } from '../components/common';
import Review from '../components/common/Review';
import ReviewSentimentStats from '../components/common/SentimentStats';
import ReviewList from '../components/ReviewList';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../redux/review/operation';
import { useEffect } from 'react';
import { resetReviews } from '../redux/review/slice';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { reviews, sentimentStats, pagination, loading, error } = useSelector(
    (state) => state.review,
  );

  useEffect(() => {
    dispatch(resetReviews());

    // Load initial data
    dispatch(
      getReviews({
        page: 1,
        perPage: 10,
        sortBy: 'date',
        sortOrder: 'asc',
        filters: {},
      }),
    );
  }, [dispatch]);

  const handlePageChange = (page) => {
    // Get current URL params to maintain filters
    const urlParams = new URLSearchParams(window.location.search);

    const filters = {
      title: urlParams.get('title') || undefined,
      startDate: urlParams.get('startDate') || undefined,
      endDate: urlParams.get('endDate') || undefined,
      minLikes: urlParams.get('minLikes')
        ? Number(urlParams.get('minLikes'))
        : undefined,
      maxLikes: urlParams.get('maxLikes')
        ? Number(urlParams.get('maxLikes'))
        : undefined,
      minDislikes: urlParams.get('minDislikes')
        ? Number(urlParams.get('minDislikes'))
        : undefined,
      maxDislikes: urlParams.get('maxDislikes')
        ? Number(urlParams.get('maxDislikes'))
        : undefined,
      sentiments: urlParams.get('sentiments')?.split(',') || undefined,
    };

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    dispatch(
      getReviews({
        page,
        perPage: 10,
        sortBy: urlParams.get('sortBy') || 'date',
        sortOrder: urlParams.get('invert') === 'true' ? 'desc' : 'asc',
        filters: cleanFilters,
      }),
    );
  };

  if (error) {
    return (
      <section className="grid gap-5 mt-4 md:mt-6">
        <h1 className="sr-only">Reviews</h1>
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-5 mt-4 md:mt-6">
      <h1 className="sr-only">Reviews</h1>

      {/* Sentiment Stats */}
      <ReviewSentimentStats sentimentStats={sentimentStats} />

      {/* Filter Component */}
      <Filter />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {/* Reviews List */}
      {!loading && (
        <>
          <ReviewList reviews={reviews} Review={Review} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button
                  className="join-item btn"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                  «
                </button>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    className={`join-item btn ${
                      page === pagination.currentPage ? 'btn-active' : ''
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="join-item btn"
                  disabled={!pagination.hasNextPage}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {!loading && reviews.length === 0 && (
        <div className="text-center py-8">
          <p>Жодної рецензії не знайдено...</p>
        </div>
      )}
    </section>
  );
};

export default ReviewsPage;
