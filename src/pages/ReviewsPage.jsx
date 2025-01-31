import { nanoid } from 'nanoid';
import { Filter } from '../components/common';
import reviews from '../data/reviews.json';
import Review from '../components/common/Review';

const ReviewsPage = () => {
  return (
    <section className="grid gap-5 mt-4 md:mt-6">
      <h1 className="sr-only">Reviews</h1>
      <Filter />
      <ul className="grid md:grid-cols-2 gap-x-4 gap-y-6 lg:gap-x-8 lg:gap-y-10 ">
        {reviews.map((review) => {
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
