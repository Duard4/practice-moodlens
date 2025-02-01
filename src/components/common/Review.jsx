import SentimentLabel from './SentimentLabel';
import { Link } from 'react-router-dom';
import BaseButtons from './btns/BaseButtons';
const Review = ({ review, children }) => {
  return (
    <div className="card bg-base-300 shadow-xl shadow-base-300-content h-full w-auto min-w-0">
      <div className="card-body p-4 sm:p-8">
        <h3 className="card-title ">
          <span className="mb-1">{review.title}</span>
          <SentimentLabel sentiment={review.sentiment} />
        </h3>
        <h4 className="text-base-100-content">{review.movieTitle}</h4>
        <Link to={`/reviews/${review.id}`}>
          <p className="line-clamp-5 text-ellipsis">{review.content}</p>
        </Link>
        <div className="flex flex-wrap card-actions justify-end items-center mt-2">
          {children}
          <BaseButtons review={review} />
        </div>
      </div>
    </div>
  );
};

export default Review;
