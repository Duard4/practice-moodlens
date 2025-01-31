// MovieListItem.jsx

const MovieListItem = ({ movie }) => {
  return (
    <li className="p-2 bg-gray-100 rounded-md shadow-sm">
      <p className="font-medium text-lg">{movie.title}</p>
      <p className="text-sm text-gray-600">
        Настрій: {movie.sentiment} ({movie.percentage}%)
      </p>
    </li>
  );
};

export default MovieListItem;
