const SentimentLabel = ({ sentiment }) => {
  const getSentimentStyles = (sentiment) => {
    const styles = {
      positive: 'bg-green-100 text-green-800 border border-green-200',
      neutral: 'bg-amber-100 text-amber-800 border border-amber-200',
      negative: 'bg-red-100 text-red-800 border border-red-200',
    };

    return (
      styles[sentiment] || 'bg-gray-100 text-gray-800 border border-gray-200'
    );
  };

  return (
    <div
      className={`badge ml-auto py-3 px-3 rounded-full text-sm font-medium ${getSentimentStyles(
        sentiment,
      )}`}
    >
      {sentiment}
    </div>
  );
};

export default SentimentLabel;
