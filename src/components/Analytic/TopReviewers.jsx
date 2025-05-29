import { Link } from 'react-router-dom';
import styles from './Analytic.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../../redux/auth/operation';

const TopReviewers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={styles.cardStyle}>
      <h2 className={styles.titleStyle}>Топ рецензентів</h2>
      <ul className="flex overflow-x-auto pb-4 gap-3">
        {users?.map((reviewer) => (
          <li key={reviewer._id} className="flex-shrink-0 mx-2 text-center">
            <Link to={`/archive/${reviewer._id}`}>
              <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                  <img src={reviewer.avatar} alt={reviewer.name} />
                </div>
              </div>
              <p className="mt-1 text-sm font-medium">{reviewer.name}</p>
              <p className="text-xs text-gray-500">
                {reviewer.totalLikes} лайків
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopReviewers;
