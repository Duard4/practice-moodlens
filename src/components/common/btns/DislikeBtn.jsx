const DislikeBtn = ({ children, Icon }) => {
  return (
    <button type="button" className="btn btn-ghost">
      <Icon icon="thumb-down" classes="w-6 h-6 text-error" />
      <p className="text-error">{children}</p>
    </button>
  );
};

export default DislikeBtn;
