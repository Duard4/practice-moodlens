import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentInput from '../components/ReviewDetail/CommentInput';
import CommentList from '../components/ReviewDetail/CommentList';
import BaseButtons from '../components/common/btns/BaseButtons';
import SentimentLabel from '../components/common/SentimentLabel';
import Icon from '../components/common/Icon';
import { getComments, addComment } from '../redux/comment/operation';
import { getReview } from '../redux/review/operation';
import toast from 'react-hot-toast';

const ReviewDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Get data from Redux store
  const {
    currentReview: review,
    loading: reviewLoading,
    error: reviewError,
  } = useSelector((state) => state.review);

  const reviewData = review
    ? {
        ...review,
        date: review.createdAt
          ? new Date(review.createdAt).toISOString().split('T')[0]
          : 'Unknown date',
      }
    : null;

  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    success,
  } = useSelector((state) => state.comment);

  // Fetch review and comments on mount
  useEffect(() => {
    dispatch(getReview(id));
    dispatch(getComments(id));
  }, [dispatch, id]);

  // Handle errors
  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError);
    }
    if (commentsError) {
      toast.error(commentsError);
    }
  }, [reviewError, commentsError]);

  const handleAddComment = async (text) => {
    try {
      await dispatch(
        addComment({
          targetType: 'reviews',
          targetId: id,
          comment: text,
        }),
      ).unwrap();

      toast.success('Comment added successfully!');
    } catch (error) {
      // Error is already handled by the slice
    }
  };

  if (reviewLoading) {
    return <div className="text-center p-6">Loading review...</div>;
  }

  if (!review) {
    return <div className="text-center p-6">Review not found</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        {reviewData.title}
      </h1>

      {/* Review Content */}
      <section className="card bg-base-200 shadow-xl p-6 mb-6">
        <div className="card-title flex flex-wrap justify-between items-baseline">
          <h2 className="text-xl font-bold mt-4">{reviewData.movieTitle}</h2>
          <div className="flex ml-auto">
            <SentimentLabel sentiment={reviewData.sentiment} />
            {reviewData.rating && (
              <div className="flex items-center text-sm bg-base-300 rounded-full px-2 py-1 ml-2">
                <span className="text-base-content">{reviewData.rating}</span>
                <Icon icon="star" classes="ml-1 h-5 w-5" />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-2 mb-3">
          <Link to={`/archive/${reviewData.userId}`}>
            <span className="text-md opacity-75 cursor-pointer hover:text-secondary">
              {reviewData.userName}
            </span>
          </Link>
          <span className="text-md opacity-50">
            {new Date(reviewData?.date)
              .toLocaleDateString()
              .split('/')
              .join('.')}
          </span>
        </div>

        <p className="text-base-100-content">{reviewData.text}</p>
        <div className="flex mt-2">
          <BaseButtons review={review} />
        </div>
      </section>

      {/* Comments Section */}
      <section className="card bg-base-200 shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4" id="comments">
          Comments
        </h2>
        <CommentInput
          onAddComment={handleAddComment}
          isLoading={commentsLoading && success === false}
        />
        {commentsLoading && success ? (
          <div className="text-center p-4">Loading comments...</div>
        ) : (
          <CommentList comments={comments} isLoading={commentsLoading} />
        )}
      </section>
    </>
  );
};

export default ReviewDetail;
