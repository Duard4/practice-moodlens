import SentimentLabel from './SentimentLabel';
import { Link } from 'react-router-dom';
import BaseButtons from './btns/BaseButtons';
import Icon from './Icon';

const Review = ({ review, children }) => {
  let date = new Date(review.createdAt);
  review.date = date.toISOString().split('T')[0];

  return (
    <div className="card bg-base-300 shadow-xl shadow-base-300-content h-full w-auto min-w-0">
      <div className="card-body p-4 sm:p-8">
        <h3 className="card-title">
          <span>{review.title}</span>
          <SentimentLabel sentiment={review.sentiment} />
        </h3>
        <div className="flex justify-between items-center mb-0.5">
          <Link to={`/archive/${review.userId}`}>
            <span className="text-md opacity-50 cursor-pointer hover:text-primary hover:opacity-1">
              {review?.authorName}
            </span>
          </Link>
          <span className="text-md opacity-50">
            {review.date?.split('-').reverse().join('.')}
          </span>
        </div>
        <div className="flex justify-between">
          <h4 className="text-base-content">{review.movieTitle}</h4>

          {review.rating && (
            <span className="text-base-content flex items-center">
              {review.rating} <Icon icon="star" classes="ml-1 h-5 w-5" />
            </span>
          )}
        </div>

        <Link to={`/reviews/${review._id}`}>
          <p className="line-clamp-5 text-ellipsis">{review.text}</p>
        </Link>
        <div className="flex flex-wrap card-actions justify-end items-center mt-auto">
          {children}
          <BaseButtons review={review} />
        </div>
      </div>
    </div>
  );
};

export default Review;
