import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Panel from '../components/Editor/Panel';
import EditField from '../components/Editor/EditField';
import SentimentModal from '../components/Editor/SentimentModal';
import toast from 'react-hot-toast';
import {
  addReview,
  addReviewFeedback,
  updateReview,
} from '../redux/review/operation';

const EditorPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { loading, error } = useSelector((state) => state.review);
  const addedReview = useSelector((state) => state.review.addedReview);

  const [reviewContent, setReviewContent] = useState(state?.text || '');
  const [contentLength, setContentLength] = useState(
    (state?.text || '').length,
  );

  const currentUser = useSelector((state) => state.auth?.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sentiment, setSentiment] = useState('positive');
  const [formData, setFormData] = useState({
    reviewTitle: state?.title || '',
    movieTitle: state?.movieTitle || '',
    rating: state?.rating || '',
    isEditing: state?.isEditing || false,
    reviewId: state?.reviewId,
  });

  useEffect(() => {
    if (state?.text) {
      setReviewContent(state.text);
      setContentLength(state.text.length);
    }
  }, [state]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center' });
    }
  }, [error]);

  const handleSubmit = async (data) => {
    if (contentLength < 100) {
      toast.error('Ваш отзыв должен содержать не менее 100 символов.', {
        position: 'top-center',
      });
      return;
    }

    // Set form data first, then use it to create review data
    setFormData(data);

    const reviewData = {
      title: data.reviewTitle, // Use data directly instead of formData
      movieTitle: data.movieTitle,
      text: reviewContent,
    };
    if (data.rating) reviewData.rating = Number(data.rating);
    if (formData.isEditing) reviewData.reviewId = formData.reviewId;

    try {
      const op = formData.isEditing
        ? updateReview(reviewData)
        : addReview(reviewData);
      const result = await dispatch(op);

      // Check if the review was added successfully
      if (result.type.endsWith('/fulfilled')) {
        let { review } = result.payload;
        const reviewSentiment = formData.isEditing
          ? review.sentiment
          : result.payload?.data.sentiment || 'positive';
        setSentiment(reviewSentiment);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  const handleSentimentConfirm = async (selectedSentiment) => {
    setSentiment(selectedSentiment);
    setIsModalOpen(false);

    try {
      // Make sure addedReview exists and has the necessary data
      if (!addedReview?.data) {
        toast.error('Помилка: дані рецензії недоступні', {
          position: 'top-center',
        });
        return;
      }
      let reviewId = addedReview.data._id;
      const reviewData = {
        reviewId: reviewId,
        sentiment: selectedSentiment,
        isNew: true,
      };
      const feedBackData = {
        reviewId: reviewId,
        sentimentResult: addedReview.data.sentiment,
        sentimentCorrect: selectedSentiment,
      };
      console.log('feedBackData:', feedBackData);

      await dispatch(updateReview(reviewData)).unwrap();
      dispatch(addReviewFeedback(feedBackData));

      toast.success('Рецензію успішно додано!', { position: 'top-center' });
      navigate(`/archive/${currentUser._id}`);
    } catch (err) {
      console.error('Error updating review sentiment:', err);
    }
  };

  const handleSentimentCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">
        {state ? 'Редагувати рецензію' : 'Написати рецензію'}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel
          onSubmit={handleSubmit}
          contentLength={contentLength}
          initialData={{
            reviewTitle: formData.reviewTitle,
            movieTitle: formData.movieTitle,
            rating: formData.rating,
          }}
          isLoading={loading}
        />
        <EditField
          onContentChange={setReviewContent}
          onLengthChange={setContentLength}
          initialContent={state?.text || ''}
        />
      </div>

      {isModalOpen && (
        <SentimentModal
          sentiment={sentiment}
          onConfirm={handleSentimentConfirm}
          onCancel={handleSentimentCancel}
          isLoading={loading}
        />
      )}
    </section>
  );
};

export default EditorPage;
