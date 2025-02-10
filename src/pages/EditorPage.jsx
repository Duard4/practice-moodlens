import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Panel from '../components/Editor/Panel';
import EditField from '../components/Editor/EditField';
import SentimentModal from '../components/Editor/SentimentModal';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [reviewContent, setReviewContent] = useState(
    state?.reviewContent || '',
  );
  const [contentLength, setContentLength] = useState(reviewContent.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sentiment, setSentiment] = useState('neutral');
  const [formData, setFormData] = useState({
    reviewTitle: state?.reviewTitle || '',
    filmTitle: state?.filmTitle || '',
    rating: state?.rating || '',
  });

  useEffect(() => {
    if (state?.reviewContent) {
      setReviewContent(state.reviewContent);
      setContentLength(state.reviewContent.length);
    }
  }, [state]);

  const handleSubmit = (data) => {
    if (contentLength < 100) {
      toast.error('Ваш отзыв должен содержать не менее 100 символов.', {
        position: 'top-center',
      });
      return;
    }

    console.log('Review Data:', { ...data, content: reviewContent });
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleSentimentConfirm = (selectedSentiment) => {
    console.log('Chosen Sentiment:', sentiment);
    setSentiment(selectedSentiment);
    console.log('Confirmed Sentiment:', selectedSentiment);
    setIsModalOpen(false);
    navigate(`/archive/1`);
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
            filmTitle: formData.filmTitle,
            rating: formData.rating,
          }}
        />
        <EditField
          onContentChange={setReviewContent}
          onLengthChange={setContentLength}
          initialContent={state?.reviewContent || ''}
        />
      </div>

      {isModalOpen && (
        <SentimentModal
          sentiment={sentiment}
          onConfirm={handleSentimentConfirm}
          onCancel={handleSentimentCancel}
        />
      )}
    </section>
  );
};

export default EditorPage;
