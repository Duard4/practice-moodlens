import { useState } from 'react';
import Button from './Button';

const LikeDislikeButton = ({ initialLikes, initialDislikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState(null);

  const handleReaction = (reaction) => {
    if (reaction === 'like') {
      if (userReaction === 'like') {
        setLikes(likes - 1);
        setUserReaction(null);
      } else {
        setLikes(likes + 1);
        if (userReaction === 'dislike') setDislikes(dislikes - 1);
        setUserReaction('like');
      }
    } else if (reaction === 'dislike') {
      if (userReaction === 'dislike') {
        setDislikes(dislikes - 1);
        setUserReaction(null);
      } else {
        setDislikes(dislikes + 1);
        if (userReaction === 'like') setLikes(likes - 1);
        setUserReaction('dislike');
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        icon="thumb-down"
        classes={userReaction === 'dislike' ? 'text-error' : 'hover:text-error'}
        onClick={() => handleReaction('dislike')}
      >
        {dislikes}
      </Button>
      <Button
        icon="thumb-up"
        classes={
          userReaction === 'like' ? 'text-success' : 'hover:text-success'
        }
        onClick={() => handleReaction('like')}
      >
        {likes}
      </Button>
    </div>
  );
};

export default LikeDislikeButton;
