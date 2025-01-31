const TrashbinBtn = ({ handleDelete, Icon }) => {
  return (
    <button type="button" className="btn btn-ghost" onClick={handleDelete}>
      <Icon icon="trashbin" classes="w-6 h-6 text-error" />
    </button>
  );
};

export default TrashbinBtn;
