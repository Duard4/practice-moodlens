import Icon from '../Icon';

const Button = ({ icon, children, classes, ...props }) => {
  return (
    <button
      type="button"
      className={`btn p-1 sm:p-2 md:p-3 btn-ghost text-base-content ${classes}`}
      {...props}
    >
      {icon && <Icon icon={icon} classes={`w-6 h-6  fill-current`} />}
      {children}
    </button>
  );
};

export default Button;
