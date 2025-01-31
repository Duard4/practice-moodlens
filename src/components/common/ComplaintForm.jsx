import { useState } from 'react';
import complaintReasons from '/src/data/complaintReasons';
import toast from 'react-hot-toast';

const ComplaintForm = ({ reviewId, onDismiss }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);

  const handleReasonChange = (reasonId) => {
    if (selectedReasons.includes(reasonId)) {
      setSelectedReasons(selectedReasons.filter((id) => id !== reasonId));
    } else {
      setSelectedReasons([...selectedReasons, reasonId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedReasons.length === 0) {
      toast.error('Будь ласка, оберіть причину скарги.', {
        duration: 4000,
        position: 'bottom-center',
      });
      return;
    }

    // Simulate submitting the complaint
    console.log('Review id:', reviewId);
    console.log('Selected Reasons:', selectedReasons);
    toast.success('Скаргу успішно надіслано!', {
      duration: 4000,
      position: 'bottom-right',
    });

    onDismiss();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {complaintReasons.map((reason) => (
          <div key={reason.id} className="collapse collapse-arrow bg-base-200">
            <input
              type="checkbox"
              className="peer"
              id={`reason-${reason.id}`}
            />
            <div className="collapse-title font-medium flex items-center justify-between cursor-pointer p-4">
              <label htmlFor={`reason-${reason.id}`} className="cursor-pointer">
                {reason.label}
              </label>
            </div>
            <div className="collapse-content">
              <p className="text-sm text-gray-600 mb-2">{reason.description}</p>
              <label
                htmlFor={`reason-${reason.id}-checkbox`}
                className="flex items-center cursor-pointer"
              >
                <span className="text-sm mr-2">Обрати</span>
                <input
                  type="checkbox"
                  id={`reason-${reason.id}-checkbox`}
                  className="checkbox checkbox-primary "
                  checked={selectedReasons.includes(reason.id)}
                  onChange={() => handleReasonChange(reason.id)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button type="button" className="btn btn-ghost" onClick={onDismiss}>
          Відмінити
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={selectedReasons.length === 0}
        >
          Відправити
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;
