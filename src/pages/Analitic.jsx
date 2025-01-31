// AnalyticsPage.jsx
import TopReviewers from '../components/Analytic/TopReviewers';
import TopMoviesByReviews from '../components/Analytic/TopMoviesByReviews';
import TopMoviesBySentiment from '../components/Analytic/TopMoviesBySentiment';

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-4">Аналітика</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <TopReviewers />
        </div>
        <TopMoviesByReviews />
        <TopMoviesBySentiment />
      </div>
    </div>
  );
};

export default AnalyticsPage;
