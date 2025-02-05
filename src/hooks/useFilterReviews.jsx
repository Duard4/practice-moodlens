import { useSearchParams } from 'react-router-dom';

const useFilteredReviews = (reviews) => {
  const [searchParams] = useSearchParams();

  const titleFilter = searchParams.get('title') || '';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const minLikes = parseInt(searchParams.get('minLikes')) || 0;
  const minSymbols = parseInt(searchParams.get('minSymbols')) || 0;
  const maxDislikes = parseInt(searchParams.get('maxDislikes')) || Infinity;
  const sortBy = searchParams.get('sortBy') || 'date';
  const invert = searchParams.get('invert') === 'true';
  const moods = searchParams.get('moods')
    ? searchParams.get('moods').split(',')
    : ['positive', 'neutral', 'negative'];

  const filteredReviews = reviews
    .filter((review) => {
      return (
        review.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
        (!startDate || review.date >= startDate) &&
        (!endDate || review.date <= endDate) &&
        review.countLikes >= minLikes &&
        review.content.length >= minSymbols &&
        review.countDislikes <= maxDislikes &&
        moods.includes(review.sentiment)
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

export default useFilteredReviews;
