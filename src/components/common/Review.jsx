import SentimentLabel from './SentimentLabel';
import ReportBtn from './btns/ReportBtn';
import DislikeBtn from './btns/DislikeBtn';
import LikeBtn from './btns/LikeBtn';
import CommentBtn from './btns/CommentBtn';
import Icon from './Icon';
import { Link } from 'react-router-dom';
const Review = ({ review, children }) => {
  return (
    <div className="card bg-base-300 shadow-xl shadow-base-300-content h-full">
      <div className="card-body">
        <h3 className="card-title">
          {review.title}
          <SentimentLabel sentiment={review.sentiment} />
        </h3>
        <h4 className="text-secondary-content">{review.movieTitle}</h4>
        <Link to={`/reviews/${review.id}`}>
          <p className="line-clamp-5 text-ellipsis">{review.content}</p>
        </Link>
        <div className="card-actions justify-end items-center mt-2">
          {children}
          <ReportBtn reviewId={review.id} Icon={Icon} />
          <DislikeBtn Icon={Icon}>{review.countDislikes}</DislikeBtn>
          <LikeBtn Icon={Icon}>{review.countLikes}</LikeBtn>
          <Link to={`/reviews/${review.id}#comments`}>
            <CommentBtn Icon={Icon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Review;
