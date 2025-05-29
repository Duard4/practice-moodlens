import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import {
  addOrUpdateReaction,
  removeReaction,
} from '/src/redux/reaction/operation';
import {
  resetReactionState,
  selectReactionByUserAndTarget,
  selectReactionLoading,
  selectReactionError,
  selectReactionSuccess,
} from '/src/redux/reaction/slice';

const LikeDislikeButton = ({
  initialLikes,
  initialDislikes,
  targetId,
  targetType,
  userId,
}) => {
  const dispatch = useDispatch();

  // Use selectors for better performance
  const userReactionFromStore = useSelector((state) =>
    selectReactionByUserAndTarget(state, userId, targetId),
  );
  const loading = useSelector(selectReactionLoading);
  const error = useSelector(selectReactionError);
  const success = useSelector(selectReactionSuccess);

  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get current user reaction (from Redux store or initial state)
  const userReaction = userReactionFromStore;

  // Handle successful backend response
  useEffect(() => {
    if (success && !loading) {
      setIsProcessing(false);
      dispatch(resetReactionState());
    }
  }, [success, loading, dispatch]);

  // Handle errors - revert optimistic updates
  useEffect(() => {
    if (error) {
      setIsProcessing(false);
      // Revert to initial values on error
      setLikes(initialLikes);
      setDislikes(initialDislikes);
      console.error('Reaction error:', error);
      dispatch(resetReactionState());
    }
  }, [error, dispatch, initialLikes, initialDislikes]);

  const handleReaction = async (reaction) => {
    if (isProcessing || loading) return;

    setIsProcessing(true);

    try {
      if (reaction === 'like') {
        if (userReaction === 'like') {
          // Remove like reaction
          setLikes((prev) => prev - 1);

          await dispatch(
            removeReaction({
              targetId,
              targetType,
            }),
          ).unwrap();
        } else {
          // Add/change to like reaction
          setLikes((prev) => prev + 1);
          if (userReaction === 'dislike') {
            setDislikes((prev) => prev - 1);
          }

          await dispatch(
            addOrUpdateReaction({
              targetId,
              targetType,
              reactionType: 'like',
            }),
          ).unwrap();
        }
      } else if (reaction === 'dislike') {
        if (userReaction === 'dislike') {
          // Remove dislike reaction
          setDislikes((prev) => prev - 1);

          await dispatch(
            removeReaction({
              targetId,
              targetType,
            }),
          ).unwrap();
        } else {
          // Add/change to dislike reaction
          setDislikes((prev) => prev + 1);
          if (userReaction === 'like') {
            setLikes((prev) => prev - 1);
          }

          await dispatch(
            addOrUpdateReaction({
              targetId,
              targetType,
              reactionType: 'dislike',
            }),
          ).unwrap();
        }
      }
    } catch (error) {
      // Error handling is done in useEffect
      console.error('Failed to update reaction:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        icon="thumb-down"
        classes={userReaction === 'dislike' ? 'text-error' : 'hover:text-error'}
        onClick={() => handleReaction('dislike')}
        disabled={isProcessing || loading}
      >
        {dislikes}
      </Button>
      <Button
        icon="thumb-up"
        classes={
          userReaction === 'like' ? 'text-success' : 'hover:text-success'
        }
        onClick={() => handleReaction('like')}
        disabled={isProcessing || loading}
      >
        {likes}
      </Button>
      {error && (
        <span className="text-error text-sm">Failed to update reaction</span>
      )}
    </div>
  );
};

export default LikeDislikeButton;
