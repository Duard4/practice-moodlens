// Filter.js - Refactored with cleaner search params handling
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReviews } from '/src/redux/review/operation';
import useSearchParamsFilters from '../../hooks/useSearchParamsFilters';
import Icon from './Icon';
import styles from './common.module.css';

const Filter = ({ userId = null }) => {
  const dispatch = useDispatch();
  const {
    currentValues,
    updateParams,
    getApiFilters,
    getSortParams,
    resetParams,
  } = useSearchParamsFilters();

  const formik = useFormik({
    initialValues: currentValues,
    enableReinitialize: true,
    onSubmit: updateParams,
  });

  // Trigger API call when URL params change
  useEffect(() => {
    const filters = getApiFilters();
    const { sortBy, sortOrder } = getSortParams();

    const apiParams = {
      page: 1,
      perPage: 10,
      sortBy,
      sortOrder,
      filters,
    };

    if (userId) {
      apiParams.userId = userId;
    }

    dispatch(getReviews(apiParams));
  }, [getApiFilters, getSortParams, dispatch, userId]);

  const handleSentimentChange = (sentiment) => {
    const newSentiments = formik.values.sentiments.includes(sentiment)
      ? formik.values.sentiments.filter((s) => s !== sentiment)
      : [...formik.values.sentiments, sentiment];

    formik.setFieldValue('sentiments', newSentiments);
  };

  const handleReset = () => {
    formik.resetForm();
    resetParams();
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            name="title"
            placeholder="Пошук за назвою фільму або текстом рецензії..."
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
            <option value="createdAt">Датою створення</option>
            <option value="date">Датою виходу</option>
            <option value="title">Назвою</option>
            <option value="rating">Рейтингом</option>
            <option value="likes">Кількістю вподобань</option>
            <option value="dislikes">Кількістю невподобань</option>
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
        <div className="collapse-title font-medium">Розширені фільтри</div>
        <div className="collapse-content flex flex-col gap-1 sm:gap-4">
          {/* Date Range */}
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

          {/* Likes Range */}
          <div className={styles.flexRow}>
            <div className={styles.formControl}>
              <label className="label">
                <span className="label-text">Мінімум вподобань</span>
              </label>
              <input
                type="number"
                className={styles.inputElement}
                {...formik.getFieldProps('minLikes')}
                min="0"
              />
            </div>
            <div className={styles.formControl}>
              <label className="label">
                <span className="label-text">Максимум вподобань</span>
              </label>
              <input
                type="number"
                className={styles.inputElement}
                {...formik.getFieldProps('maxLikes')}
                min="0"
              />
            </div>
          </div>

          {/* Dislikes Range */}
          <div className={styles.flexRow}>
            <div className={styles.formControl}>
              <label className="label">
                <span className="label-text">Мінімум невподобань</span>
              </label>
              <input
                type="number"
                className={styles.inputElement}
                {...formik.getFieldProps('minDislikes')}
                min="0"
              />
            </div>
            <div className={styles.formControl}>
              <label className="label">
                <span className="label-text">Максимум невподобань</span>
              </label>
              <input
                type="number"
                className={styles.inputElement}
                {...formik.getFieldProps('maxDislikes')}
                min="0"
              />
            </div>
          </div>

          {/* Sentiment Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Настрій відгуку</span>
            </label>
            <div className={styles.moodContainer}>
              {['positive', 'neutral', 'negative'].map((sentiment) => (
                <label key={sentiment} className={styles.moodLabel}>
                  <span className="label-text">
                    {
                      {
                        positive: 'Позитивний',
                        neutral: 'Нейтральний',
                        negative: 'Негативний',
                      }[sentiment]
                    }
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={formik.values.sentiments.includes(sentiment)}
                    onChange={() => handleSentimentChange(sentiment)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">
              Застосувати фільтри
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
            >
              Скинути
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Filter;
