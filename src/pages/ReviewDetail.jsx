import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '/src/components/common/Icon';
import CommentInput from '../components/ReviewDetail/CommentInput';
import CommentList from '../components/ReviewDetail/CommentList';
import reviewsData from '/src/data/reviews.json'; // Example data

const ReviewDetail = () => {
  const { id } = useParams();
  const review = reviewsData.find((review) => review.id === parseInt(id));

  const [comments, setComments] = useState(review.comments || []);

  const handleAddComment = (text) => {
    const newComment = {
      id: comments.length + 1,
      text,
      likes: 0,
      dislikes: 0,
    };
    setComments([...comments, newComment]);
  };

  if (!review) {
    return <div className="text-center p-6">Рецензію не знайдено.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        {review.title}
      </h1>

      {/* Review Content */}
      <div className="card bg-base-200 shadow-xl p-6 mb-6">
        <h2 className="text-xl font-bold mt-4">{review.movieTitle}</h2>
        <div className="flex justify-between">
          <Link to={`/archive/${review.userId}`}>
            <span className="text-md opacity-75 mt-1 cursor-pointer mb-3 hover:text-secondary">
              {review.author}
            </span>
          </Link>
          <span className="text-md opacity-50 mt-1 mb-3">04.04.2004</span>
        </div>

        <p className="text-base-100-content">{review.content}</p>
        <div className="flex justify-end  mt-4">
          <button type="button" className="btn btn-ghost">
            <Icon icon="thumb-down" classes="w-6 h-6 text-error" />
            <p className="text-error">{review.countDislikes}</p>
          </button>
          <button type="button" className="btn btn-ghost">
            <Icon icon="thumb-up" classes="w-6 h-6 text-success" />
            <p className="text-success">{review.countLikes}</p>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card bg-base-200 shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4" id="comments">
          Коментарі
        </h2>
        <CommentInput onAddComment={handleAddComment} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default ReviewDetail;
