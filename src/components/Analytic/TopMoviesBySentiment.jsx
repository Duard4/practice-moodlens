import { Link } from 'react-router-dom';
import styles from './Analytic.module.css';
import { getTopMoviesBySentiment } from '../../redux/review/operation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TopMoviesBySentiment = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopMoviesBySentiment());
  }, [dispatch]);

  const { topMoviesBySentiment } = useSelector((state) => state.review);

  // Helper function to get sentiment type for styling
  const getSentimentType = (classification) => {
    switch (classification) {
      case 'highly-positive':
        return 'positive';
      case 'highly-negative':
        return 'negative';
      case 'neutral-mixed':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  // Helper function to get sentiment badge classes
  const getSentimentClasses = (sentimentType) => {
    const styles = {
      positive: 'bg-green-100 text-green-800 border border-green-200',
      neutral: 'bg-amber-100 text-amber-800 border border-amber-200',
      negative: 'bg-red-100 text-red-800 border border-red-200',
    };

    return (
      styles[sentimentType] ||
      'bg-gray-100 text-gray-800 border border-gray-200'
    );
  };

  // Helper function to get dominant sentiment percentage
  const getDominantSentiment = (movie) => {
    const { sentimentBreakdown } = movie;
    const max = Math.max(
      sentimentBreakdown.positive,
      sentimentBreakdown.negative,
      sentimentBreakdown.neutral,
    );

    if (max === sentimentBreakdown.positive) {
      return { percentage: sentimentBreakdown.positive, type: 'позитивний' };
    } else if (max === sentimentBreakdown.negative) {
      return { percentage: sentimentBreakdown.negative, type: 'негативний' };
    } else {
      return { percentage: sentimentBreakdown.neutral, type: 'нейтральний' };
    }
  };

  // Access movies from the nested data structure
  const movies = topMoviesBySentiment || [];

  return (
    <div className={styles.cardStyle}>
      <h2 className={styles.titleStyle}>Топ фільмів за настроєм відгуків</h2>
      {movies.length === 0 ? (
        <p>Завантаження...</p>
      ) : (
        <ul>
          {movies.map((movie, index) => {
            const dominantSentiment = getDominantSentiment(movie);

            return (
              <li key={index} className={styles.listItemStyle}>
                <Link
                  to={`/reviews?title=${encodeURIComponent(movie.filmName)}`}
                >
                  <div className={styles.movieInfo}>
                    <span className={styles.movieTitle}>{movie.filmName}</span>
                  </div>
                </Link>
                <div className={styles.sentimentInfo}>
                  <span
                    className={` badge badge-outline 
                      ${getSentimentClasses(
                        getSentimentType(movie.classification),
                      )}`}
                  >
                    {dominantSentiment.percentage}% {dominantSentiment.type}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Pagination info if needed */}
      {topMoviesBySentiment?.data && (
        <div className={styles.paginationInfo}>
          Показано {movies.length} з {topMoviesBySentiment.data.totalItems}{' '}
          фільмів
        </div>
      )}
    </div>
  );
};

export default TopMoviesBySentiment;
