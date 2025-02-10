import { Filter } from '../components/common';
import reviews from '../data/reviews.json';
import Review from '../components/common/Review';
import ReviewSentimentStats from '../components/common/SentimentStats';
import ReviewList from '../components/ReviewList';
import useFilterReviews from '../hooks/useFilterReviews';

const ReviewsPage = () => {
  const filteredReviews = useFilterReviews(reviews);

  return (
    <section className="grid gap-5 mt-4 md:mt-6">
      <h1 className="sr-only">Reviews</h1>
      <ReviewSentimentStats reviews={filteredReviews} />
      <Filter />
      <ReviewList reviews={filteredReviews} Review={Review} />
    </section>
  );
};

export default ReviewsPage;
