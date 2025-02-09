import toast from 'react-hot-toast';
import ComplaintForm from '../ComplaintForm';
import Button from './Button';

const ReportBtn = ({ reviewId, ...rest }) => {
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

  return <Button {...rest} onClick={handleReport} />;
};

export default ReportBtn;
