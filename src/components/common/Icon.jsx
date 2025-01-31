const Icon = ({ icon, classes }) => {
  return (
    <svg className={`${classes} fill-current`}>
      <use xlinkHref={`/sprite.svg#${icon}`}></use>
    </svg>
  );
};

export default Icon;
