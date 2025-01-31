import styles from './Archive.module.css';
import ArchiveReview from './ArchiveReview';

const ReviewList = ({ reviews, isCurrentUser, onDelete }) => {
  return (
    <div className={styles.reviewList}>
      <h2 className={styles.archiveTitle}>Рецензії</h2>
      {reviews.map((review) => (
        <ArchiveReview
          key={review.id}
          review={review}
          isCurrentUser={isCurrentUser}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReviewList;
