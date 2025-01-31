import { useNavigate } from 'react-router-dom';
import EditBtn from '../common/btns/EditBtn';
import TrashbinBtn from '../common/btns/TrashbinBtn';
import Review from '../common/Review';
import { Icon } from '../common';

const ArchiveReview = ({ review, isCurrentUser, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to the Editor page with review data
    navigate('/editor', {
      state: {
        reviewId: review.id,
        reviewTitle: review.title,
        filmTitle: review.movieTitle,
        reviewContent: review.content,
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      onDelete(review.id);
    }
  };

  return (
    <Review review={review}>
      {isCurrentUser && (
        <>
          <EditBtn handleEdit={handleEdit} Icon={Icon} />
          <TrashbinBtn handleDelete={handleDelete} Icon={Icon} />
        </>
      )}
    </Review>
  );
};

export default ArchiveReview;
