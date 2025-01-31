import { useParams, useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import ReviewList from './ReviewList';
import Filter from '../common/Filter';
import styles from './Archive.module.css';
import userData from '/src/data/topReviewers.json';
import reviewsData from '/src/data/reviews.json';

const Archive = () => {
  const getCurrentUserId = () => {
    return localStorage.getItem('currentUserId');
  };

  const { id } = useParams();
  const currentUserId = getCurrentUserId();
  const isCurrentUser = id === currentUserId;

  const navigate = useNavigate();

  // Fetch user data (replace with API call)
  const user = userData.find((user) => user.id === id);
  const reviews = reviewsData.filter((review) => review.userId === id);

  const handleDeleteReview = (reviewId) => {
    console.log('Deleting review:', reviewId);
    alert('Review deleted successfully!');
  };

  const handleAddReview = () => {
    navigate('/editor');
  };

  if (!user) {
    return (
      <div className={styles.archiveContainer}>Користувача не знайдено.</div>
    );
  }

  return (
    <div className={styles.archiveContainer}>
      <UserInfo userId={id} />
      <Filter />
      <ReviewList
        reviews={reviews}
        isCurrentUser={isCurrentUser}
        onDelete={handleDeleteReview}
      />
      {isCurrentUser && (
        <button className={styles.addReviewButton} onClick={handleAddReview}>
          Додати рецензію
        </button>
      )}
    </div>
  );
};

export default Archive;
