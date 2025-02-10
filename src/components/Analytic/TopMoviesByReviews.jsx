import { Link } from 'react-router-dom';
import styles from './Analytic.module.css';
import reviewsData from '/src/data/reviews.json';

const TopMoviesByReviews = () => {
  // Підрахунок кількості відгуків для кожного фільму
  const movieReviewCounts = reviewsData.reduce((acc, review) => {
    acc[review.movieTitle] = (acc[review.movieTitle] || 0) + 1;
    return acc;
  }, {});

  // Перетворення об'єкта в масив та сортування за кількістю відгуків
  const topMoviesByReviews = Object.entries(movieReviewCounts)
    .map(([title, reviews]) => ({ title, reviews }))
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 10); // Вибір топ-10 фільмів

  return (
    <div className={styles.cardStyle}>
      <h2 className={styles.titleStyle}>Топ фільмів за кількістю відгуків</h2>
      <ul>
        {topMoviesByReviews.map((movie, index) => (
          <li key={index} className={styles.listItemStyle}>
            <Link to={`/reviews?title=${movie.title}`}>
              <span>{movie.title}</span>
            </Link>
            <span className={styles.badgeStyle}>{movie.reviews} відгуків</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMoviesByReviews;
