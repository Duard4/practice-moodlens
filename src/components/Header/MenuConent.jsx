import { NavLink } from 'react-router-dom';
import { Icon } from '../common';
import styles from './styles.module.css';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';

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

const MenuContent = ({ isAuthorized, drawer = false }) => {
  const handleLogout = () => {
    toast.success('Вихід виконано', { position: 'bottom-right' });
  };
  const id = 1;
  const menuItems = [
    { to: '/reviews', label: 'Рецензії', icon: 'article' },
    { to: '/editor', label: 'Едітор', icon: 'feather' },
  ];

  if (isAuthorized) {
    menuItems.push({ to: `/archive/${id}`, label: 'Архів', icon: 'archive' });
    menuItems.push({
      onClick: handleLogout,
      label: 'Вихід',
      icon: 'logout',
    });
  } else {
    menuItems.push({
      to: '/login',
      label: 'Вхід',
      icon: 'login',
    });
  }

  return (
    <ul className={`${!drawer ? styles.nav : 'grid'} gap-3`}>
      {menuItems.map(({ to, onClick, label, icon }) => (
        <MenuItem key={nanoid()} to={to} icon={icon} onClick={onClick}>
          {label}
        </MenuItem>
      ))}
    </ul>
  );
};

export default MenuContent;
