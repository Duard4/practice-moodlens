import Icon from '../common/Icon';

const NotionBtn = () => {
  return (
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <Icon icon="bell" classes="h-7 w-7" />
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  );
};

export default NotionBtn;
