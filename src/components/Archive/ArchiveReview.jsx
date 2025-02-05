import { useNavigate } from 'react-router-dom';
import Review from '../common/Review';
import Button from '../common/btns/Button';

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
        <div className="flex w-full sm:w-auto flex-row-reverse sm:flex-row justify-between gap-1">
          <Button onClick={handleEdit} icon="edit" color="text-info" />
          <Button onClick={handleDelete} icon="trashbin" color="text-error" />
        </div>
      )}
    </Review>
  );
};

export default ArchiveReview;
