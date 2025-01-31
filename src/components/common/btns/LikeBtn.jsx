const LikeBtn = ({ children, Icon }) => {
  return (
    <button type="button" className="btn btn-ghost">
      <Icon icon="thumb-up" classes="w-6 h-6 text-success" />
      <p className="text-success">{children}</p>
    </button>
  );
};

export default LikeBtn;
