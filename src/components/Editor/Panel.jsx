import { useState, useEffect } from 'react';
import styles from './Editor.module.css';

const Panel = ({ onSubmit, initialData }) => {
  const [reviewTitle, setReviewTitle] = useState(initialData.reviewTitle);
  const [movieTitle, setMovieTitle] = useState(initialData.movieTitle);
  const [rating, setRating] = useState(initialData.rating);

  useEffect(() => {
    const savedReviewTitle = localStorage.getItem('reviewTitle');
    const savedMovieTitle = localStorage.getItem('movieTitle');
    const savedRating = localStorage.getItem('rating');

    if (savedReviewTitle) setReviewTitle(savedReviewTitle);
    if (savedMovieTitle) setMovieTitle(savedMovieTitle);
    if (savedRating) setRating(savedRating);
  }, []);

  useEffect(() => {
    localStorage.setItem('reviewTitle', reviewTitle);
  }, [reviewTitle]);

  useEffect(() => {
    localStorage.setItem('movieTitle', movieTitle);
  }, [movieTitle]);

  useEffect(() => {
    localStorage.setItem('rating', rating);
  }, [rating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ reviewTitle, movieTitle, rating });
    localStorage.removeItem('reviewTitle');
    localStorage.removeItem('movieTitle');
    localStorage.removeItem('rating');
    localStorage.removeItem('text');
  };

  return (
    <div className={styles.panel}>
      <form onSubmit={handleSubmit} className="grid">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Назва рецензії
          </label>
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className={styles.inputField}
            placeholder="Введіть назву рецензії"
            required
          />
        </div>

        {/* Movie Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Назва фільму</label>
          <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            className={styles.inputField}
            placeholder="Введіть назву фільму"
            required
          />
        </div>

        {/* Rating (Optional) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Оцінка (1-10)
          </label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className={styles.inputField}
            placeholder="Введіть оцінку (optional)"
            min="1"
            max="10"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.modalButtonPrimary}>
          Підтвердити
        </button>
      </form>
    </div>
  );
};

export default Panel;
