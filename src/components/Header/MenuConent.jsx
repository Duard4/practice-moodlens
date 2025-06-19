import { NavLink } from 'react-router-dom';
import { Icon } from '../common';
import styles from './styles.module.css';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/auth/operation';

const MenuItem = ({ to, onClick, icon, children }) => (
  <li>
    {to ? (
      <NavLink to={to} className={`${styles.link}`}>
        {children}
        <Icon
          icon={icon}
          classes={`menu-icon md:hidden lg:block h-6 w-6 ml-1`}
        />
      </NavLink>
    ) : (
      <button onClick={onClick} className={`${styles.link} w-full text-left`}>
        {children}
        <Icon
          icon={icon}
          classes={`menu-icon md:hidden lg:block h-6 w-6 ml-1`}
        />
      </button>
    )}
  </li>
);

const MenuContent = ({ drawer = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Вихід виконано', { position: 'bottom-right' });
      navigate('/');
    } catch (error) {
      toast.error('Помилка при виході', { position: 'bottom-right' });
    }
  };

  const menuItems = [
    { to: '/reviews?invert=true', label: 'Рецензії', icon: 'article' },
  ];

  if (isAuthenticated) {
    menuItems.push(
      { to: '/editor', label: 'Едітор', icon: 'feather' },
      {
        to: `/archive/${user?._id || user?.id}?invert=true`,
        label: 'Архів',
        icon: 'archive',
      },
    );
  }

  return (
    <ul className={`${!drawer ? styles.nav : 'grid'} gap-3`}>
      {menuItems.map((item) => (
        <MenuItem key={item.to} to={item.to} icon={item.icon}>
          {item.label}
        </MenuItem>
      ))}

      {isAuthenticated ? (
        <li className="dropdown dropdown-hover text-center flex items-center">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={user.avatar} alt="User Avatar" />
            </div>
          </div>
          <ul className="dropdown-content menu p-2 shadow bg-base-200 text-base-content rounded-box w-52 right-0 top-12 hover:text-primary">
            <li>
              <NavLink
                to={`/user/${user?._id || user?.id}`}
                className="w-full text-left hover:bg-base-300"
              >
                Мій профіль
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left hover:bg-base-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Вихід'
                )}
              </button>
            </li>
          </ul>
        </li>
      ) : (
        <MenuItem to="/login" icon="login">
          Вхід
        </MenuItem>
      )}
    </ul>
  );
};

export default MenuContent;
