import { nanoid } from 'nanoid';
import topReviewers from '/src/data/topReviewers.json';

const ReviewList = ({ reviews, Review, grid = true, ...rest }) => {
  return reviews.length ? (
    <ul
      className={`grid ${
        grid && `md:grid-cols-2`
      } gap-x-4 gap-y-6 lg:gap-x-8 lg:gap-y-10`}
    >
      {reviews.map((review) => {
        const author = topReviewers.find((user) => user.id === review.userId);
        return (
          <li key={nanoid()}>
            <Review {...rest} review={{ ...review, author: author?.name }} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>Жодної рецензії не знайдено...</p>
  );
};

export default ReviewList;
