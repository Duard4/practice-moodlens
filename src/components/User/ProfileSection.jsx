import { Formik, Form, Field, ErrorMessage } from 'formik';
import Icon from '/src/components/common/Icon';
import styles from './UserPage.module.css';

const ProfileSection = ({
  tempUser,
  editMode,
  setEditMode,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div className="flex-1">
      {editMode.profile ? (
        <Formik
          initialValues={{
            username: tempUser.username,
            about: tempUser.about,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleFormSubmit(values, 'profile')}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className={styles.formGroup}>
                <label htmlFor="username" className="label">
                  Ім&apos;я користувача
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
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.formGroup}>
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
                  className={styles.errorMessage}
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
  );
};

export default ProfileSection;
