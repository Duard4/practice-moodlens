const EditBtn = ({ handleEdit, Icon }) => {
  return (
    <button type="button" className="btn btn-ghost" onClick={handleEdit}>
      <Icon icon="edit" classes="w-6 h-6 text-info" />
    </button>
  );
};

export default EditBtn;
