import { useSelector } from 'react-redux';
import LikeDislikeButton from '../common/btns/LikeDislikeButton';
// import userData from '/src/data/topReviewers.json';

const CommentItem = ({ comment }) => {
  // const user = userData.find((user) => user.id === comment.userId);

  const globalUser = useSelector((state) => state.auth.user);
  return (
    <div className="border-b border-base-300 py-4">
      <div className="flex flex-col  gap-4">
        <div className="avatar flex items-center">
          <div className="w-12 h-12 rounded-full">
            <img src={comment?.avatar} alt={comment?.name} />
          </div>
          <p className="font-semibold text-primary ml-3">{comment?.name}</p>
        </div>
        <div className="flex-1">
          <p className="text-base-100-content">{comment.comment}</p>
        </div>

        <div className="flex gap-2 ml-auto">
          <LikeDislikeButton
            targetId={comment._id}
            targetType="comments"
            userId={globalUser?._id || globalUser?.id}
            initialDislikes={Number(comment.dislikes)}
            initialLikes={Number(comment.likes)}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
