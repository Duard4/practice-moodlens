import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import userData from '/src/data/topReviewers.json';
import styles from '../styles/UserPage.module.css';
import AvatarSection from '../components/User/AvatarSection';
import ProfileSection from '../components/User/ProfileSection';
import EmailSection from '../components/User/EmailSection';
import PasswordSection from '../components/User/PasswordSection';
import toast from 'react-hot-toast';

const UserPage = () => {
  const getCurrentUserId = () => {
    return localStorage.getItem('currentUserId');
  };

  const { id } = useParams();
  const currentUserId = getCurrentUserId();
  const isCurrentUser = id === currentUserId;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCurrentUser) {
      navigate('/');
    }
  }, [isCurrentUser, navigate]);

  const user = userData.find((user) => user.id === id);

  const [tempUser, setTempUser] = useState({
    avatar: user?.avatar || '/default_avatar.jpg',
    username: user?.name || 'Невідомий користувач',
    email: 'johndoe@example.com',
    about: user?.description || 'Опис відсутній.',
  });

  const [editMode, setEditMode] = useState({
    profile: false,
    email: false,
    password: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempUser((prev) => ({ ...prev, avatar: reader.result }));
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values, section) => {
    setTempUser((prev) => ({ ...prev, ...values }));
    setEditMode((prev) => ({ ...prev, [section]: false }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    console.log('Збереження змін на сервері:', tempUser);
    setHasChanges(false);
    toast.success('Зміни успішно збережено!', { position: 'bottom-right' });
  };

  const validationSchemas = {
    profile: Yup.object({
      username: Yup.string()
        .min(3, "Ім'я користувача має містити щонайменше 3 символи")
        .required("Ім'я користувача обов'язкове"),
      about: Yup.string().max(500, 'Опис має бути не більше 500 символів'),
    }),
    email: Yup.object({
      email: Yup.string()
        .email('Невірна адреса електронної пошти')
        .required("Електронна пошта обов'язкова"),
    }),
    password: Yup.object({
      oldPassword: Yup.string().required("Старий пароль обов'язковий"),
      newPassword: Yup.string()
        .min(6, 'Новий пароль має містити щонайменше 6 символів')
        .required("Новий пароль обов'язковий"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Паролі мають збігатися')
        .required("Підтвердження паролю обов'язкове"),
    }),
  };

  if (!user) {
    return <div className="text-center p-6">Користувача не знайдено.</div>;
  }

  const isAnySectionEditing = Object.values(editMode).some((mode) => mode);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">
        Профіль користувача
      </h1>

      <div className={styles.card}>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <AvatarSection
            avatar={tempUser.avatar}
            handleAvatarChange={handleAvatarChange}
          />
          <ProfileSection
            tempUser={tempUser}
            editMode={editMode}
            setEditMode={setEditMode}
            validationSchema={validationSchemas.profile}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>

      <EmailSection
        tempUser={tempUser}
        editMode={editMode}
        setEditMode={setEditMode}
        validationSchema={validationSchemas.email}
        handleFormSubmit={handleFormSubmit}
      />

      <PasswordSection
        editMode={editMode}
        setEditMode={setEditMode}
        validationSchema={validationSchemas.password}
        handleFormSubmit={handleFormSubmit}
      />

      {hasChanges && !isAnySectionEditing && (
        <div className={styles.saveButton}>
          <button onClick={handleSaveChanges} className="btn btn-primary">
            Зберегти всі зміни
          </button>
        </div>
      )}
    </>
  );
};

export default UserPage;
