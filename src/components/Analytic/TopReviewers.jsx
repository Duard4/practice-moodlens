import { Link } from 'react-router-dom';
import styles from './Analytic.module.css';
import topReviewers from '/src/data/topReviewers.json';

const TopReviewers = () => {
  return (
    <div className={styles.cardStyle}>
      <h2 className={styles.titleStyle}>Топ рецензентів</h2>
      <ul className="flex overflow-x-auto pb-4 gap-3">
        {topReviewers.map((reviewer) => (
          <li key={reviewer.id} className="flex-shrink-0 mx-2 text-center">
            <Link to={`/archive/${reviewer.id}`}>
              <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                  <img src={reviewer.avatar} alt={reviewer.name} />
                </div>
              </div>
              <p className="mt-1 text-sm font-medium">{reviewer.name}</p>
              <p className="text-xs text-gray-500">{reviewer.likes} лайків</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopReviewers;
