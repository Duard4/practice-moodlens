// Archive.js - Updated to work with Redux and backend
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from '../components/Archive/UserInfo';
import ReviewList from '../components/ReviewList';
import Filter from '../components/common/Filter';
import styles from '../styles/Archive.module.css';
import ArchiveReview from '../components/Archive/ArchiveReview';
import ReviewSentimentStats from '../components/common/SentimentStats';
import { getReviews, deleteReview } from '../redux/review/operation';
import { resetReviews } from '../redux/review/slice';
import { getUser, getUserById } from '../redux/auth/operation';

const Archive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reviews, sentimentStats, pagination, loading, error } = useSelector(
    (state) => state.review,
  );

  const currentUser = useSelector((state) => state.auth?.user);
  const openUser = useSelector((state) => state.auth?.openUser);

  const isCurrentUser = useMemo(() => {
    console.log('current user ', currentUser);
    if (!currentUser || !id) return false;
    const currentUserId = currentUser._id;
    return currentUserId === id.toString();
  }, [currentUser, id]);

  useEffect(() => {
    dispatch(resetReviews());
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Load user's reviews when id changes or user is loaded
    if (id) {
      dispatch(
        getReviews({
          userId: id,
          page: 1,
          perPage: 10,
          sortBy: 'date',
          sortOrder: 'desc', // Show newest first for user archive
          filters: {},
        }),
      );
    }
  }, [dispatch, id]);

  const handleDeleteReview = async (reviewId) => {
    if (!isCurrentUser) {
      alert('Ви не можете видаляти чужі рецензії');
      return;
    }

    if (window.confirm('Ви впевнені, що хочете видалити цю рецензію?')) {
      try {
        await dispatch(deleteReview(reviewId));
        // Reload reviews after deletion
        handlePageChange(1);
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

  const handlePageChange = (page) => {
    // Get current URL params to maintain filters
    const urlParams = new URLSearchParams(window.location.search);

    const filters = {
      title: urlParams.get('title') || undefined,
      startDate: urlParams.get('startDate') || undefined,
      endDate: urlParams.get('endDate') || undefined,
      minLikes: urlParams.get('minLikes')
        ? Number(urlParams.get('minLikes'))
        : undefined,
      maxLikes: urlParams.get('maxLikes')
        ? Number(urlParams.get('maxLikes'))
        : undefined,
      minDislikes: urlParams.get('minDislikes')
        ? Number(urlParams.get('minDislikes'))
        : undefined,
      maxDislikes: urlParams.get('maxDislikes')
        ? Number(urlParams.get('maxDislikes'))
        : undefined,
      sentiments: urlParams.get('sentiments')?.split(',') || undefined,
    };

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    dispatch(
      getReviews({
        userId: id,
        page,
        perPage: 10,
        sortBy: urlParams.get('sortBy') || 'date',
        sortOrder: urlParams.get('invert') === 'true' ? 'asc' : 'desc',
        filters: cleanFilters,
      }),
    );
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

      {/* Sentiment Stats */}
      <ReviewSentimentStats sentimentStats={sentimentStats} />

      {/* Filter Component - Updated to work with user-specific reviews */}
      <Filter userId={id} />

      <h2 className={styles.archiveTitle}>
        {isCurrentUser ? 'Мої рецензії' : 'Рецензії користувача'}
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {/* Reviews List */}
      {!loading && (
        <>
          <ReviewList
            reviews={reviews}
            Review={ArchiveReview}
            grid={false}
            isCurrentUser={isCurrentUser}
            onDelete={handleDeleteReview}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button
                  className="join-item btn"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                  «
                </button>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    className={`join-item btn ${
                      page === pagination.currentPage ? 'btn-active' : ''
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="join-item btn"
                  disabled={!pagination.hasNextPage}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* No Results */}
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

      {/* Add Review Button - Only for current user */}
      {isCurrentUser && reviews.length > 0 && (
        <button className={styles.addReviewButton} onClick={handleAddReview}>
          Додати рецензію
        </button>
      )}
    </section>
  );
};

export default Archive;
