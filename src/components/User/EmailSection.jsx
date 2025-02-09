import { Formik, Form, Field, ErrorMessage } from 'formik';
import Icon from '/src/components/common/Icon';
import styles from './UserPage.module.css';

const EmailSection = ({
  tempUser,
  editMode,
  setEditMode,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div className={styles.card}>
      {editMode.email ? (
        <Formik
          initialValues={{ email: tempUser.email }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleFormSubmit(values, 'email')}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className={styles.formGroup}>
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
  );
};

export default EmailSection;
