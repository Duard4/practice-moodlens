// SentimentStats.js - Updated to work with backend data structure
import React from 'react';

const ReviewSentimentStats = ({ sentimentStats }) => {
  if (!sentimentStats) {
    return null;
  }

  const total = Object.values(sentimentStats).reduce(
    (sum, count) => sum + count,
    0,
  );

  if (total === 0) {
    return (
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Загальна кількість відгуків</div>
          <div className="stat-value">0</div>
        </div>
      </div>
    );
  }

  const getPercentage = (count) =>
    total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Загальна кількість</div>
        <div className="stat-value">{total}</div>
        <div className="stat-desc">відгуків</div>
      </div>

      <div className="stat">
        <div className="stat-title">Позитивні</div>
        <div className="stat-value text-success">
          {sentimentStats.positive || 0}
        </div>
        <div className="stat-desc">
          {getPercentage(sentimentStats.positive || 0)}%
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Нейтральні</div>
        <div className="stat-value text-warning">
          {sentimentStats.neutral || 0}
        </div>
        <div className="stat-desc">
          {getPercentage(sentimentStats.neutral || 0)}%
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Негативні</div>
        <div className="stat-value text-error">
          {sentimentStats.negative || 0}
        </div>
        <div className="stat-desc">
          {getPercentage(sentimentStats.negative || 0)}%
        </div>
      </div>

      {sentimentStats.null > 0 && (
        <div className="stat">
          <div className="stat-title">Без оцінки</div>
          <div className="stat-value text-base-content">
            {sentimentStats.null}
          </div>
          <div className="stat-desc">{getPercentage(sentimentStats.null)}%</div>
        </div>
      )}
    </div>
  );
};

export default ReviewSentimentStats;
