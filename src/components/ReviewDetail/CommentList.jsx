import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
