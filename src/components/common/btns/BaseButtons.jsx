import ReportBtn from './ReportBtn';
import Button from './Button';
import { Link } from 'react-router-dom';

const BaseButtons = ({ review }) => {
  return (
    <>
      <ReportBtn reviewId={review.id} icon="flag" color="text-error" />

      <Button icon="thumb-down" color="text-error">
        {review.countDislikes}
      </Button>
      <Button icon="thumb-up" color="text-success">
        {review.countLikes}
      </Button>
      <Link to={`/reviews/${review.id}#comments`}>
        <Button icon="comments" color="text-info" />
      </Link>
    </>
  );
};

export default BaseButtons;
