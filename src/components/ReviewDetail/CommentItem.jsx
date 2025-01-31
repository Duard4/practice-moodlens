import Icon from '/src/components/common/Icon';
import userData from '/src/data/topReviewers.json';

const CommentItem = ({ comment }) => {
  const user = userData.find((user) => user.id === comment.userId);

  return (
    <div className="border-b border-base-300 py-4">
      <div className="flex items-center gap-4">
        {/* User Avatar */}
        <div className="avatar">
          <div className="w-12 h-12 rounded-full">
            <img src={user?.avatar} alt={user?.name} />
          </div>
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          <p className="font-semibold text-primary">{user?.name}</p>
          <p className="text-base-100-content">{comment.content}</p>
        </div>

        {/* Like/Dislike Buttons */}
        <div className="flex gap-2">
          <button type="button" className="btn btn-ghost">
            <Icon icon="thumb-down" classes="w-6 h-6 text-error" />
            <p className="text-error">{comment.dislikes || 0}</p>
          </button>
          <button type="button" className="btn btn-ghost">
            <Icon icon="thumb-up" classes="w-6 h-6 text-success" />
            <p className="text-success">{comment.likes || 0}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
