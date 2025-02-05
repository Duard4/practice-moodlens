import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentInput from '../components/ReviewDetail/CommentInput';
import CommentList from '../components/ReviewDetail/CommentList';
import reviewsData from '/src/data/reviews.json'; // Example data
import BaseButtons from '../components/common/btns/BaseButtons';
import SentimentLabel from '../components/common/SentimentLabel';

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
        <h3 className="card-title ">
          <h2 className="text-xl font-bold mt-4">{review.movieTitle}</h2>
          <SentimentLabel sentiment={review.sentiment} />
        </h3>
        <div className="flex justify-between mt-2 mb-3">
          <Link to={`/archive/${review.userId}`}>
            <span className="text-md opacity-75  cursor-pointer hover:text-secondary">
              {review.author}
            </span>
          </Link>
          <span className="text-md opacity-50">04.04.2004</span>
        </div>

        <p className="text-base-100-content">{review.content}</p>
        <div className="flex mt-2">
          <BaseButtons review={review} />
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
