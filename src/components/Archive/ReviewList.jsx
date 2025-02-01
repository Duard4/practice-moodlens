import styles from './Archive.module.css';
import ArchiveReview from './ArchiveReview';

const ReviewList = ({ reviews, isCurrentUser, onDelete }) => {
  return (
    <div>
      <h2 className={styles.archiveTitle}>Рецензії</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <ArchiveReview
              review={review}
              isCurrentUser={isCurrentUser}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
