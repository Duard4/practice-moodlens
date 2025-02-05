import { Link } from 'react-router-dom';
import styles from './Analytic.module.css';

const TopMoviesByReviews = () => {
  const topMoviesByReviews = [
    { id: 1, title: 'Movie1', reviews: 150 },
    { id: 2, title: 'Movie2', reviews: 140 },
    { id: 3, title: 'Movie3', reviews: 130 },
    { id: 4, title: 'Movie4', reviews: 120 },
    { id: 5, title: 'Movie5', reviews: 110 },
    { id: 6, title: 'Movie6', reviews: 100 },
    { id: 7, title: 'Movie7', reviews: 90 },
    { id: 8, title: 'Movie8', reviews: 80 },
    { id: 9, title: 'Movie9', reviews: 70 },
    { id: 10, title: 'Movie10', reviews: 60 },
  ];

  return (
    <div className={styles.cardStyle}>
      <h2 className={styles.titleStyle}>Топ фільмів за кількістю відгуків</h2>
      <ul>
        {topMoviesByReviews.map((movie) => (
          <li key={movie.id} className={styles.listItemStyle}>
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
