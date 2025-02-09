import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentInput from '../components/ReviewDetail/CommentInput';
import CommentList from '../components/ReviewDetail/CommentList';
import reviewsData from '/src/data/reviews.json';
import BaseButtons from '../components/common/btns/BaseButtons';
import SentimentLabel from '../components/common/SentimentLabel';
import Icon from '../components/common/Icon'; // Import the Icon component

const ReviewDetail = () => {
  const { id } = useParams();
  const review = reviewsData.find((review) => review.id === parseInt(id));

  const [comments, setComments] = useState(review.comments || []);

  const handleAddComment = (text) => {
    const newComment = {
      id: comments.length + 1,
      content: text,
      userId: '1',
      countLikes: 0,
      countDislikes: 0,
    };
    setComments([...comments, newComment]);
  };

  if (!review) {
    return <div className="text-center p-6">Рецензію не знайдено.</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        {review.title}
      </h1>

      {/* Review Content */}
      <section className="card bg-base-200 shadow-xl p-6 mb-6">
        <div className="card-title flex flex-wrap justify-between items-baseline">
          <h2 className="text-xl font-bold mt-4">{review.movieTitle}</h2>
          <div className="flex ml-auto">
            <SentimentLabel sentiment={review.sentiment} />
            {review.rating && (
              <div className="flex items-center text-sm bg-base-300 rounded-full px-2 py-1 ml-2">
                <span className="text-base-content">{review.rating}</span>
                <Icon icon="star" classes="ml-1 h-5 w-5" />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-2 mb-3">
          <Link to={`/archive/${review.userId}`}>
            <span className="text-md opacity-75 cursor-pointer hover:text-secondary">
              {review.author}
            </span>
          </Link>
          <span className="text-md opacity-50">04.04.2004</span>
        </div>

        <p className="text-base-100-content">{review.content}</p>
        <div className="flex mt-2">
          <BaseButtons review={review} />
        </div>
      </section>

      {/* Comments Section */}
      <section className="card bg-base-200 shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4" id="comments">
          Коментарі
        </h2>
        <CommentInput onAddComment={handleAddComment} />
        <CommentList comments={comments} />
      </section>
    </>
  );
};

export default ReviewDetail;
