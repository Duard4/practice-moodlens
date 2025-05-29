import { Link } from 'react-router-dom';
import styles from './Analytic.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTopMoviesByReviews } from '../../redux/review/operation';

const TopMoviesByReviews = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopMoviesByReviews());
  }, [dispatch]);

  const { topMoviesByReviews } = useSelector((state) => state.review);

  return (
    <div className={styles.cardStyle}>
      <h2 className={styles.titleStyle}>Топ фільмів за кількістю відгуків</h2>
      <ul>
        {topMoviesByReviews &&
          topMoviesByReviews.map((movie, index) => (
            <li key={index} className={styles.listItemStyle}>
              <Link to={`/reviews?title=${movie.filmName}`}>
                <span>{movie.filmName}</span>
              </Link>
              <span className={styles.badgeStyle}>
                {movie.reviewCount} відгук
                {movie.reviewCount % 10 !== 1 && 'и'}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopMoviesByReviews;
