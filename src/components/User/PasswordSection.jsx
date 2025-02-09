import { Formik, Form, Field, ErrorMessage } from 'formik';
import Icon from '/src/components/common/Icon';
import styles from './UserPage.module.css';

const PasswordSection = ({
  editMode,
  setEditMode,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div className={styles.card}>
      {editMode.password ? (
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleFormSubmit(values, 'password')}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className={styles.formGroup}>
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
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.formGroup}>
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
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.formGroup}>
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
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Пароль: ********</p>
          <button
            onClick={() => setEditMode((prev) => ({ ...prev, password: true }))}
            className="btn btn-ghost btn-sm"
          >
            <Icon icon="pen" classes="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordSection;
