import { nanoid } from 'nanoid';
import { Filter } from '../components/common';
import reviews from '../data/reviews.json';
import Review from '../components/common/Review';
import useFilteredReviews from '../hooks/useFilterReviews';
import ReviewSentimentStats from '../components/common/SentimentStats';

const ReviewsPage = () => {
  const visibleReviews = useFilteredReviews(reviews);

  return (
    <section className="grid gap-5 mt-4 md:mt-6">
      <h1 className="sr-only">Reviews</h1>
      <ReviewSentimentStats reviews={visibleReviews} />
      <Filter />
      <ul className="grid md:grid-cols-2 gap-x-4 gap-y-6 lg:gap-x-8 lg:gap-y-10 ">
        {visibleReviews.map((review) => {
          return (
            <li key={nanoid()}>
              <Review review={review} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ReviewsPage;
