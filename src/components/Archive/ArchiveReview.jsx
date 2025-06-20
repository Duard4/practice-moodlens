import { useNavigate } from 'react-router-dom';
import Review from '../common/Review';
import Button from '../common/btns/Button';

const ArchiveReview = ({ review, isCurrentUser, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to the Editor page with review data
    navigate('/editor', {
      state: {
        reviewId: review._id,
        title: review.title,
        movieTitle: review.movieTitle,
        text: review.text,
        rating: review.rating,
        isEditing: true,
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      onDelete(review._id);
    }
  };

  return (
    <Review review={review}>
      {isCurrentUser && (
        <div className="flex w-full sm:w-auto flex-row-reverse sm:flex-row justify-between gap-1">
          <Button onClick={handleEdit} icon="edit" classes="hover:text-info" />
          <Button
            onClick={handleDelete}
            icon="trashbin"
            classes="hover:text-error"
          />
        </div>
      )}
    </Review>
  );
};

export default ArchiveReview;
