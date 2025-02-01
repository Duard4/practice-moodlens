import { useState } from 'react';

const CommentInput = ({ onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 sm:mt-5">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Додати коментар..."
          className="input input-bordered w-full p-3 flex-1"
        />
        <button type="submit" className="btn btn-primary">
          Надіслати
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
