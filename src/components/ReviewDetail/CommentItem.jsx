import LikeDislikeButton from '../common/btns/LikeDislikeButton';
import userData from '/src/data/topReviewers.json';

const CommentItem = ({ comment }) => {
  const user = userData.find((user) => user.id === comment.userId);

  return (
    <div className="border-b border-base-300 py-4">
      <div className="flex flex-col  gap-4">
        <div className="avatar flex items-center">
          <div className="w-12 h-12 rounded-full">
            <img src={user?.avatar} alt={user?.name} />
          </div>
          <p className="font-semibold text-primary ml-3">{user?.name}</p>
        </div>
        <div className="flex-1">
          <p className="text-base-100-content">{comment.content}</p>
        </div>

        <div className="flex gap-2 ml-auto">
          <LikeDislikeButton
            initialDislikes={comment.countDislikes}
            initialLikes={comment.countLikes}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
