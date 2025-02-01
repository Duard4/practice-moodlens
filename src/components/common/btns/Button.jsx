import Icon from '../Icon';

const Button = ({ children, icon, color, onClick, classes }) => {
  return (
    <button
      type="button"
      className={`btn p-1 sm:p-2 md:p-3 btn-ghost ${classes}`}
      onClick={onClick}
    >
      <Icon icon={icon} classes={`w-6 h-6 ${color}`} />
      {children && <p className={color}>{children}</p>}
    </button>
  );
};

export default Button;
