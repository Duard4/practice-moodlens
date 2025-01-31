import { useState } from 'react';

const SentimentModal = ({ sentiment, onConfirm, onCancel }) => {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState(sentiment);

  const sentiments = ['positive', 'neutral', 'negative'];

  const handleSubmit = () => {
    onConfirm(selectedSentiment);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-base-100 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Аналіз настрою</h2>
        <p className="mb-4">
          Настрій вашої рецензії було визначено як{' '}
          <span className="font-semibold">{sentiment}</span>.
        </p>

        {/* Was that correct? */}
        <div className="mb-4">
          <p className="mb-2">Чи дійсне це твердження?</p>
          <div className="flex gap-4">
            <button
              className={`btn ${
                isCorrect === true ? 'btn-primary' : 'btn-ghost'
              }`}
              onClick={() => setIsCorrect(true)}
            >
              Так
            </button>
            <button
              className={`btn ${
                isCorrect === false ? 'btn-primary' : 'btn-ghost'
              }`}
              onClick={() => setIsCorrect(false)}
            >
              Ні
            </button>
          </div>
        </div>

        {/* Sentiment Correction (if "No" is selected) */}
        {isCorrect === false && (
          <div className="mb-4">
            <p className="mb-2">Будь ласка оберіть вірний настрій:</p>
            <div className="flex gap-4">
              {sentiments.map((sent) => (
                <button
                  key={sent}
                  className={`btn ${
                    selectedSentiment === sent ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={() => setSelectedSentiment(sent)}
                >
                  {sent}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="btn btn-ghost" onClick={onCancel}>
            Відмінити
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentimentModal;
