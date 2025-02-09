import { Filter } from '../components/common';
import reviews from '../data/reviews.json';
import Review from '../components/common/Review';
import useFilteredReviews from '../hooks/useFilterReviews';
import ReviewSentimentStats from '../components/common/SentimentStats';
import ReviewList from '../components/ReviewList';

const ReviewsPage = () => {
  const visibleReviews = useFilteredReviews(reviews);

  return (
    <section className="grid gap-5 mt-4 md:mt-6">
      <h1 className="sr-only">Reviews</h1>
      <ReviewSentimentStats reviews={visibleReviews} />
      <Filter />
      <ReviewList reviews={visibleReviews} Review={Review} />
    </section>
  );
};

export default ReviewsPage;
