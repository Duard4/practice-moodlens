import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Icon from '/src/components/common/Icon'; // Ваш компонент Icon
import userData from '/src/data/topReviewers.json'; // Отримання даних користувача з JSON

const UserPage = () => {
  const getCurrentUserId = () => {
    return localStorage.getItem('currentUserId');
  };

  const { id } = useParams();
  const currentUserId = getCurrentUserId();
  const isCurrentUser = id === currentUserId;
  const navigate = useNavigate();

  // Перенаправлення, якщо userID не відповідає поточному користувачу
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
    alert('Зміни успішно збережено!');
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Профіль користувача
      </h1>

      {/* Аватар та інформація про профіль */}
      <div className="card bg-base-200 shadow-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Аватар */}
          <div className="relative w-32 h-32">
            <img
              src={tempUser.avatar}
              alt="Аватар користувача"
              className="w-full h-full rounded-full border-2 border-base-300 object-cover"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:bg-primary-focus"
            >
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

          {/* Інформація про профіль */}
          <div className="flex-1">
            {editMode.profile ? (
              <Formik
                initialValues={{
                  username: tempUser.username,
                  about: tempUser.about,
                }}
                validationSchema={validationSchemas.profile}
                onSubmit={(values) => handleFormSubmit(values, 'profile')}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label htmlFor="username" className="label">
                        Ім'я користувача
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="input input-bordered w-full"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-error text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="about" className="label">
                        Про мене
                      </label>
                      <Field
                        as="textarea"
                        id="about"
                        name="about"
                        rows="4"
                        className="textarea textarea-bordered w-full"
                      />
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="text-error text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Зберегти зміни
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold">{tempUser.username}</p>
                  <button
                    onClick={() =>
                      setEditMode((prev) => ({ ...prev, profile: true }))
                    }
                    className="btn btn-ghost btn-sm"
                  >
                    <Icon icon="pen" classes="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">{tempUser.about}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Розділ електронної пошти */}
      <div className="card bg-base-200 shadow-xl p-6 mb-6">
        {editMode.email ? (
          <Formik
            initialValues={{ email: tempUser.email }}
            validationSchema={validationSchemas.email}
            onSubmit={(values) => handleFormSubmit(values, 'email')}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="email" className="label">
                    Електронна пошта
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-error text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Зберегти зміни
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Email: {tempUser.email}</p>
            <button
              onClick={() => setEditMode((prev) => ({ ...prev, email: true }))}
              className="btn btn-ghost btn-sm"
            >
              <Icon icon="pen" classes="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Розділ паролю */}
      <div className="card bg-base-200 shadow-xl p-6 mb-6">
        {editMode.password ? (
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchemas.password}
            onSubmit={(values) => handleFormSubmit(values, 'password')}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="oldPassword" className="label">
                    Старий пароль
                  </label>
                  <Field
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="text-error text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="label">
                    Новий пароль
                  </label>
                  <Field
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-error text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="label">
                    Підтвердження паролю
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-error text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Зберегти зміни
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Пароль: ********</p>
            <button
              onClick={() =>
                setEditMode((prev) => ({ ...prev, password: true }))
              }
              className="btn btn-ghost btn-sm"
            >
              <Icon icon="pen" classes="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Кнопка збереження змін */}
      {hasChanges && (
        <div className="text-center mt-6">
          <button onClick={handleSaveChanges} className="btn btn-primary">
            Зберегти всі зміни
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
