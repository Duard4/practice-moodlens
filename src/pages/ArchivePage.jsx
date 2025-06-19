import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReviews from '../hooks/useReviews';
import { Filter, Pagination, SentimentStats } from '../components/common';
import UserInfo from '../components/Archive/UserInfo';
import ReviewList from '../components/ReviewList';
import ArchiveReview from '../components/Archive/ArchiveReview';
import { deleteReview } from '../redux/review/operation';
import { resetReviews } from '../redux/review/slice';
import { getUserById } from '../redux/auth/operation';
import styles from '../styles/Archive.module.css';

const Archive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reviews, sentimentStats, pagination, loading, error } = useSelector(
    (state) => state.review,
  );

  const currentUser = useSelector((state) => state.auth?.user);
  const openUser = useSelector((state) => state.auth?.openUser);

  // Отримуємо loadReviews з хука
  const { handlePageChange, currentPage, loadReviews } = useReviews(id);

  const isCurrentUser = useMemo(() => {
    if (!currentUser || !id) return false;
    return currentUser._id === id.toString();
  }, [currentUser, id]);

  useEffect(() => {
    dispatch(resetReviews());
    dispatch(getUserById(id));
  }, [dispatch, id]);

  const handleDeleteReview = async (reviewId) => {
    if (!isCurrentUser) {
      alert('Ви не можете видаляти чужі рецензії');
      return;
    }

    if (window.confirm('Ви впевнені, що хочете видалити цю рецензію?')) {
      try {
        await dispatch(deleteReview(reviewId));
        // Після успішного видалення перезавантажуємо список
        loadReviews();
      } catch (error) {
        console.error('Failed to delete review:', error);
        alert('Помилка при видаленні рецензії');
      }
    }
  };

  const handleAddReview = () => {
    if (!isCurrentUser) {
      alert('Ви можете додавати рецензії тільки до свого архіву');
      return;
    }
    navigate('/editor');
  };

  if (error) {
    return (
      <section className={styles.archiveContainer}>
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.archiveContainer}>
      <UserInfo user={openUser} isCurrentUser={isCurrentUser} />
      <SentimentStats sentimentStats={sentimentStats} />
      <Filter userId={id} />

      <h2 className={styles.archiveTitle}>
        {isCurrentUser ? 'Мої рецензії' : 'Рецензії користувача'}
      </h2>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {!loading && (
        <>
          <ReviewList
            reviews={reviews}
            Review={ArchiveReview}
            grid={false}
            isCurrentUser={isCurrentUser}
            onDelete={handleDeleteReview}
          />

          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      )}

      {!loading && reviews.length === 0 && (
        <div className="text-center py-8">
          <p>
            {isCurrentUser
              ? 'У вас поки немає рецензій.'
              : 'У цього користувача поки немає рецензій.'}
          </p>
          {isCurrentUser && (
            <button className="btn btn-primary mt-4" onClick={handleAddReview}>
              Написати першу рецензію
            </button>
          )}
        </div>
      )}

      {isCurrentUser && reviews.length > 0 && (
        <button className={styles.addReviewButton} onClick={handleAddReview}>
          Додати рецензію
        </button>
      )}
    </section>
  );
};

export default Archive;
