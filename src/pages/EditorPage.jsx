import { useState } from 'react';
import { Card, CardContent, CardHeader } from '/src/components/ui/card';
import { Button } from '/src/components/ui/button';
import { motion } from 'framer-motion';
import EmotionFeedbackForm from '../components/EmotionFeedbackForm';

const EditorPage = () => {
  const [emotion, setEmotion] = useState('auto');
  const [showModal, setShowModal] = useState(false);

  const emotions = ['negative', 'neutral', 'positive'];

  const handleAutoEmotion = () => {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setEmotion(randomEmotion);
    setShowModal(true);
  };

  const handleSubmitFeedback = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-10 flex flex-col md:flex-row gap-6">
      {/* Left Panel */}
      <Card className="w-full md:w-1/3 p-4">
        <CardHeader>
          <h2 className="text-lg font-semibold">Editor Panel</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="reviewTitle"
            >
              Заголовок рецензії
            </label>
            <input
              id="reviewTitle"
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="filmTitle"
            >
              Назва фільму
            </label>
            <input
              id="filmTitle"
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Emotion</label>
            <select
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="auto">Auto</option>
              {emotions.map((emo) => (
                <option key={emo} value={emo}>
                  {emo.charAt(0).toUpperCase() + emo.slice(1)}
                </option>
              ))}
            </select>
            {emotion === 'auto' && (
              <Button onClick={handleAutoEmotion} className="mt-2 w-full">
                Визначити автоматично
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* White Paper for Review */}
      <motion.div
        className="w-full bg-white shadow-md rounded-xl p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <textarea
          placeholder="Write your review here..."
          className="w-full h-96 border rounded-md p-4 focus:outline-none focus:ring focus:ring-blue-300 resize-none"
        ></textarea>
      </motion.div>

      {/* Modal for Feedback */}
      <EmotionFeedbackForm
        isOpen={showModal}
        emotion={emotion}
        onSubmit={handleSubmitFeedback}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default EditorPage;
