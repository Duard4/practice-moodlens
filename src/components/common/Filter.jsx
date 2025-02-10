import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Icon from './Icon';
import styles from './common.module.css';

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValues = {
    title: searchParams.get('title') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    minLikes: searchParams.get('minLikes') || '',
    minSymbols: searchParams.get('minSymbols') || '',
    maxDislikes: searchParams.get('maxDislikes') || '',
    sortBy: searchParams.get('sortBy') || 'Датою виходу',
    invert: searchParams.get('invert') === 'true',
    moods: searchParams.get('moods')?.split(',') || [
      'positive',
      'neutral',
      'negative',
    ],
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const params = new URLSearchParams();

      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) params.set(key, value.join(','));
        } else if (value && value !== 'false') {
          params.set(key, value);
        }
      });

      if (values.invert) params.set('invert', 'true');

      setSearchParams(params);
    },
  });

  const handleMoodChange = (mood) => {
    const newMoods = formik.values.moods.includes(mood)
      ? formik.values.moods.filter((m) => m !== mood)
      : [...formik.values.moods, mood];

    formik.setFieldValue('moods', newMoods);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            name="title"
            placeholder="Пошук..."
            className={styles.search}
            {...formik.getFieldProps('title')}
          />
          <button type="submit" className={styles.searchButton}>
            <Icon icon="search" classes="w-6 h-6" />
          </button>
        </div>

        <div className={styles.selectContainer}>
          <select
            className={styles.selectElement}
            {...formik.getFieldProps('sortBy')}
          >
            <option disabled>Сортувати за</option>
            <option value="date">Датою виходу</option>
            <option value="title">Назвою</option>
            <option value="popularity">Популярністю</option>
          </select>
          <label className={styles.checkboxLabel}>
            <span className="label-text">Інверсія</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={formik.values.invert}
              onChange={formik.handleChange}
              name="invert"
            />
          </label>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title font-medium">Фільтри</div>
        <div className="collapse-content flex flex-col gap-1 sm:gap-4">
          <div className={styles.flexRow}>
            <div className={styles.formControl}>
              <label className="label">
                <span className="label-text">Початкова дата</span>
              </label>
              <input
                type="date"
                className={styles.inputElement}
                {...formik.getFieldProps('startDate')}
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue('startDate', value);
                  if (formik.values.endDate && value > formik.values.endDate) {
                    formik.setFieldValue('endDate', value);
                  }
                }}
              />
            </div>
            <div className={styles.formControl}>
              <label className="label">
                <span className="label-text">Кінцева дата</span>
              </label>
              <input
                type="date"
                className={styles.inputElement}
                {...formik.getFieldProps('endDate')}
                min={formik.values.startDate}
              />
            </div>
          </div>

          <div className={styles.flexRow}>
            {['minLikes', 'maxDislikes'].map((field) => (
              <div key={field} className={styles.formControl}>
                <label className="label">
                  <span className="label-text">
                    {
                      {
                        minLikes: 'Мінімум вподобань',
                        maxDislikes: 'Максимум невподобань',
                      }[field]
                    }
                  </span>
                </label>
                <input
                  type="number"
                  className={styles.inputElement}
                  {...formik.getFieldProps(field)}
                  min="0"
                />
              </div>
            ))}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Настрій відгуку</span>
            </label>
            <div className={styles.moodContainer}>
              {['positive', 'neutral', 'negative'].map((mood) => (
                <label key={mood} className={styles.moodLabel}>
                  <span className="label-text">
                    {
                      {
                        positive: 'Позитивний',
                        neutral: 'Нейтральний',
                        negative: 'Негативний',
                      }[mood]
                    }
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={formik.values.moods.includes(mood)}
                    onChange={() => handleMoodChange(mood)}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Filter;
