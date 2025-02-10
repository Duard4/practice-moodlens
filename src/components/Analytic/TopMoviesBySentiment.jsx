import { Link } from 'react-router-dom';
import styles from './Analytic.module.css';
import reviewsData from '/src/data/reviews.json';

const TopMoviesBySentiment = () => {
  const movieSentimentCounts = reviewsData.reduce((acc, review) => {
    if (!acc[review.movieTitle]) {
      acc[review.movieTitle] = { positive: 0, total: 0 };
    }
    if (review.sentiment === 'positive') {
      acc[review.movieTitle].positive++;
    }
    acc[review.movieTitle].total++;
    return acc;
  }, {});

  const topMoviesBySentiment = Object.entries(movieSentimentCounts)
    .map(([title, counts]) => ({
      title,
      positivePercentage: Math.round((counts.positive / counts.total) * 100),
    }))
    .sort((a, b) => b.positivePercentage - a.positivePercentage)
    .slice(0, 10);

  return (
    <div className={styles.cardStyle}>
      <h2 className={styles.titleStyle}>Топ фільмів за настроєм відгуків</h2>
      <ul>
        {topMoviesBySentiment.map((movie, index) => (
          <li key={index} className={styles.listItemStyle}>
            <Link to={`/reviews?title=${movie.title}`}>
              <span>{movie.title}</span>
            </Link>
            <span className={styles.badgeStyle}>
              {movie.positivePercentage}% позитивних
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMoviesBySentiment;
