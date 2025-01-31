const CommentBtn = ({ Icon }) => {
  return (
    <button type="button" className="btn btn-ghost">
      <Icon icon="comments" classes="w-6 h-6 text-info" />
    </button>
  );
};

export default CommentBtn;
