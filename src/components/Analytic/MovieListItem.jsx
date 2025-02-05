import { Link } from 'react-router-dom';

const MovieListItem = ({ movie }) => {
  return (
    <li className="p-2 bg-gray-100 rounded-md shadow-sm">
      <Link to={`/reviews&title=${movie.title}`}>
        <p className="font-medium text-lg cursor-pointer">{movie.title}</p>
      </Link>
      <p className="text-sm text-gray-600">
        Настрій: {movie.sentiment} ({movie.percentage}%)
      </p>
    </li>
  );
};

export default MovieListItem;
