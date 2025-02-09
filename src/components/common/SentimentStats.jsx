// import { Progress } from '@/components/ui/progress';
import { useMemo } from 'react';

const ReviewSentimentStats = ({ reviews }) => {
  const sentimentCounts = useMemo(() => {
    const counts = { negative: 0, neutral: 0, positive: 0 };
    reviews.forEach((review) => {
      if (counts[review.sentiment] !== undefined) {
        counts[review.sentiment]++;
      }
    });
    const total = counts.negative + counts.neutral + counts.positive;
    return {
      total,
      negative: Math.round((counts.negative / total) * 100) || 0,
      neutral: Math.round((counts.neutral / total) * 100) || 0,
      positive: Math.round((counts.positive / total) * 100) || 0,
    };
  }, [reviews]);

  return (
    <div className="w-full bg-base-200 p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-base-300-content mb-2">
        Розподіл настроїв
      </h3>
      <div className="grid sm:flex items-center gap-2 sm:gap-8 text-sm text-white mb-2">
        <span className="text-red-300">
          Негативний: {sentimentCounts.negative}%
        </span>
        <span className="text-yellow-800">
          Нейтральний: {sentimentCounts.neutral}%
        </span>
        <span className="text-green-300">
          Позитивний: {sentimentCounts.positive}%
        </span>
      </div>
      {sentimentCounts.total !== 0 && (
        <div className="flex w-full h-3 rounded-full overflow-hidden">
          <div
            className="bg-red-300 transition-all duration-300"
            style={{ width: `max(${sentimentCounts.negative}%, 1%)` }}
          ></div>
          <div
            className="bg-yellow-300 transition-all duration-300"
            style={{ width: `max(${sentimentCounts.neutral}%, 1%)` }}
          ></div>
          <div
            className="bg-green-300 transition-all duration-300"
            style={{ width: `max(${sentimentCounts.positive}%, 1%)` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ReviewSentimentStats;
