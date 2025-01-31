const SentimentLabel = ({ sentiment }) => {
  return (
    <div
      className={`badge ml-auto py-3 ${
        {
          positive: 'bg-green-300 text-green-900',
          neutral: 'bg-yellow-300 text-yellow-900',
          negative: 'bg-red-300 text-red-900',
        }[sentiment] || 'bg-gray-300 text-gray-900'
      }`}
    >
      {sentiment}
    </div>
  );
};

export default SentimentLabel;
