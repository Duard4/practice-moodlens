// AnalyticsPage.jsx
import TopReviewers from '../components/Analytic/TopReviewers';
import TopMoviesByReviews from '../components/Analytic/TopMoviesByReviews';
import TopMoviesBySentiment from '../components/Analytic/TopMoviesBySentiment';

const AnalyticsPage = () => {
  return (
    <section>
      <h1
        className="text-3xl font-bold text-primary mb-4"
        style={{
          textShadow: '1px 1px 1px darkslategray',
        }}
      >
        Аналітика
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-2">
          <TopReviewers />
        </div>
        <TopMoviesByReviews />
        <TopMoviesBySentiment />
      </div>
    </section>
  );
};

export default AnalyticsPage;
