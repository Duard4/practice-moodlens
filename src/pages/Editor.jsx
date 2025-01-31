import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Panel from '../components/Editor/Panel';
import EditField from '../components/Editor/EditField';
import SentimentModal from '../components/Editor/SentimentModal';

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  console.log(state);
  const [reviewContent, setReviewContent] = useState(
    state?.reviewContent || '',
  );
  const [contentLength, setContentLength] = useState(reviewContent.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sentiment, setSentiment] = useState('neutral');

  useEffect(() => {
    if (state?.reviewContent) {
      setReviewContent(state.reviewContent);
      setContentLength(state.reviewContent.length);
    }
  }, [state]);

  const handleSubmit = (data) => {
    if (contentLength < 300) {
      alert('Your review must contain at least 300 characters.');
      return;
    }
    console.log('Review Data:', { ...data, content: reviewContent });
    setIsModalOpen(true);
  };

  const handleSentimentConfirm = (selectedSentiment) => {
    console.log('Chosen Sentiment:', sentiment);
    console.log('Confirmed Sentiment:', selectedSentiment);
    alert('Review submitted successfully!');
    setIsModalOpen(false);
    navigate('/archive/1');
  };

  const handleSentimentCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        {state ? 'Редагувати рецензію' : 'Написати рецензію'}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel
          onSubmit={handleSubmit}
          contentLength={contentLength}
          initialData={{
            reviewTitle: state?.reviewTitle || '',
            filmTitle: state?.filmTitle || '',
            rating: state?.rating || '',
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
    </div>
  );
};

export default Editor;
