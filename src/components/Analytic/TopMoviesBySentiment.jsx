import styles from './Analytic.module.css';

const TopMoviesBySentiment = () => {
  // Example data
  const topMoviesBySentiment = [
    { id: 1, title: 'Movie1', positivePercentage: 95 },
    { id: 2, title: 'Movie2', positivePercentage: 90 },
    { id: 3, title: 'Movie3', positivePercentage: 85 },
    { id: 4, title: 'Movie4', positivePercentage: 80 },
    { id: 5, title: 'Movie5', positivePercentage: 75 },
    { id: 6, title: 'Movie6', positivePercentage: 70 },
    { id: 7, title: 'Movie7', positivePercentage: 65 },
    { id: 8, title: 'Movie8', positivePercentage: 60 },
    { id: 9, title: 'Movie9', positivePercentage: 55 },
    { id: 10, title: 'Movie10', positivePercentage: 50 },
  ];

  return (
    <div className={styles.cardStyle}>
      <h2 className={styles.titleStyle}>Топ фільмів за настроєм відгуків</h2>
      <ul>
        {topMoviesBySentiment.map((movie) => (
          <li key={movie.id} className={styles.listItemStyle}>
            <span>{movie.title}</span>
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
