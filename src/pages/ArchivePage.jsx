import { useParams, useNavigate } from 'react-router-dom';
import UserInfo from '../components/Archive/UserInfo';
import ReviewList from '../components/ReviewList';
import Filter from '../components/common/Filter';
import styles from '../styles/Archive.module.css';
import userData from '/src/data/topReviewers.json';
import reviewsData from '/src/data/reviews.json';
import ArchiveReview from '../components/Archive/ArchiveReview';
import useFilteredReviews from '../hooks/useFilterReviews';
import ReviewSentimentStats from '../components/common/SentimentStats';

const Archive = () => {
  const getCurrentUserId = () => {
    return localStorage.getItem('currentUserId');
  };

  const { id } = useParams();
  const currentUserId = getCurrentUserId();
  const isCurrentUser = id === currentUserId;

  const navigate = useNavigate();

  const user = userData.find((user) => user.id === id);
  const reviews = reviewsData.filter((review) => review.userId === id);
  const visibleReviews = useFilteredReviews(reviews);

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
    <section className={styles.archiveContainer}>
      <UserInfo userId={id} />
      <ReviewSentimentStats reviews={visibleReviews} />
      <Filter />
      <h2 className={styles.archiveTitle}>Рецензії</h2>
      <ReviewList
        reviews={visibleReviews}
        Review={ArchiveReview}
        grid={false}
        isCurrentUser={isCurrentUser}
        onDelete={handleDeleteReview}
      />
      {isCurrentUser && (
        <button className={styles.addReviewButton} onClick={handleAddReview}>
          Додати рецензію
        </button>
      )}
    </section>
  );
};

export default Archive;
