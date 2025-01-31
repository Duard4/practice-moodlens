import toast from 'react-hot-toast';
import ComplaintForm from '../ComplaintForm'; // A new component for the form

const ReportBtn = ({ reviewId, Icon }) => {
  const handleReport = () => {
    toast.custom(
      (t) => (
        <div className="bg-base-100 rounded-lg p-6 w-full max-w-md shadow-lg custom-toast">
          <h2 className="text-lg font-semibold mb-4">
            Відправити скаргу, причина:
          </h2>
          <ComplaintForm
            reviewId={reviewId}
            onDismiss={() => toast.dismiss(t.id)}
          />
        </div>
      ),
      {
        duration: Infinity,
      },
    );
  };

  return (
    <button
      type="button"
      className="btn btn-ghost mr-auto"
      onClick={handleReport}
    >
      <Icon icon="flag" classes="h-5 w-5 text-error" />
    </button>
  );
};

export default ReportBtn;
