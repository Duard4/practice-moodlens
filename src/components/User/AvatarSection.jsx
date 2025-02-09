import Icon from '/src/components/common/Icon';
import styles from './UserPage.module.css';

const AvatarSection = ({ avatar, handleAvatarChange }) => {
  return (
    <div className={styles.avatar}>
      <img
        src={avatar}
        alt="Аватар користувача"
        className="w-full h-full rounded-full border-2 border-base-300 object-cover"
      />
      <label htmlFor="avatar" className={styles.avatarLabel}>
        <Icon icon="pen" classes="w-4 h-4 text-white" />
      </label>
      <input
        id="avatar"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleAvatarChange}
      />
    </div>
  );
};

export default AvatarSection;
