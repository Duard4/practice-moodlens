import ReportBtn from './ReportBtn';
import Button from './Button';
import { Link } from 'react-router-dom';
import LikeDislikeButton from './LikeDislikeButton';

const BaseButtons = ({ review }) => {
  return (
    <>
      <ReportBtn
        reviewId={review.id}
        icon="flag"
        classes="mr-auto hover:text-error"
      />

      <LikeDislikeButton
        initialDislikes={review.countDislikes}
        initialLikes={review.countLikes}
      />
      <Link to={`/reviews/${review.id}#comments`}>
        <Button icon="comments" classes="hover:text-info" />
      </Link>
    </>
  );
};

export default BaseButtons;
