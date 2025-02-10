import { useSearchParams } from 'react-router-dom';

const useFilterReviews = (reviews) => {
  const [searchParams] = useSearchParams();

  const titleFilter = searchParams.get('title') || '';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const minLikes = parseInt(searchParams.get('minLikes')) || 0;
  const maxDislikes = parseInt(searchParams.get('maxDislikes')) || Infinity;
  const sortBy = searchParams.get('sortBy') || 'date';
  const invert = searchParams.get('invert') === 'true';
  const moods = searchParams.get('moods')
    ? searchParams.get('moods').split(',')
    : ['positive', 'neutral', 'negative'];

  const filteredReviews = reviews
    .filter((review) => {
      const titleMatch =
        review.title?.toLowerCase().includes(titleFilter.toLowerCase()) ||
        review.movieTitle?.toLowerCase().includes(titleFilter.toLowerCase());
      const dateMatch =
        (!startDate || review.date >= startDate) &&
        (!endDate || review.date <= endDate);
      const likesMatch = review.countLikes >= minLikes;
      const dislikesMatch = review.countDislikes <= maxDislikes;
      const moodMatch = moods.includes(review.sentiment);

      return (
        titleMatch && dateMatch && likesMatch && dislikesMatch && moodMatch
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return b.countLikes - a.countLikes;
        default:
          return 0;
      }
    });

  if (invert) {
    filteredReviews.reverse();
  }

  return filteredReviews;
};

export default useFilterReviews;
