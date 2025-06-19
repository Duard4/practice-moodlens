import { Filter } from '../components/common';
import { Review, SentimentStats } from '../components/common';
import ReviewList from '../components/ReviewList';
import Pagination from '../components/common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetReviews } from '../redux/review/slice';
import useReviews from '../hooks/useReviews';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { reviews, sentimentStats, pagination, loading, error } = useSelector(
    (state) => state.review,
  );
  console.log(pagination);

  const { handlePageChange } = useReviews();

  useEffect(() => {
    dispatch(resetReviews());
  }, [dispatch]);

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
      <SentimentStats sentimentStats={sentimentStats} />
      <Filter />

      {loading && (
        <div className="flex justify-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {!loading && (
        <>
          <ReviewList reviews={reviews} Review={Review} />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}

      {!loading && reviews.length === 0 && (
        <div className="text-center py-8">
          <p>Жодної рецензії не знайдено...</p>
        </div>
      )}
    </section>
  );
};

export default ReviewsPage;
