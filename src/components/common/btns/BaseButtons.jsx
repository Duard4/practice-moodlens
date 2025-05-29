import ReportBtn from './ReportBtn';
import Button from './Button';
import { Link } from 'react-router-dom';
import LikeDislikeButton from './LikeDislikeButton';
import { useSelector } from 'react-redux';

const BaseButtons = ({ review }) => {
  const globalUser = useSelector((state) => state.auth.user);
  return (
    <>
      <ReportBtn
        reviewId={review._id}
        icon="flag"
        classes="mr-auto hover:text-error"
      />

      <LikeDislikeButton
        initialDislikes={review.dislikes}
        initialLikes={review.likes}
        targetId={review._id}
        userId={globalUser?._id || globalUser?.id}
        targetType="reviews"
      />
      <Link to={`/reviews/${review._id}#comments`}>
        <Button icon="comments" classes="hover:text-info" />
      </Link>
    </>
  );
};

export default BaseButtons;
