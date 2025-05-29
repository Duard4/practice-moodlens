import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReviews } from '/src/redux/review/operation';
import Icon from './Icon';
import styles from './common.module.css';

const Filter = ({ userId = null }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const initialValues = {
    title: searchParams.get('title') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    minLikes: searchParams.get('minLikes') || '',
    maxLikes: searchParams.get('maxLikes') || '',
    minDislikes: searchParams.get('minDislikes') || '',
    maxDislikes: searchParams.get('maxDislikes') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    invert: searchParams.get('invert') === 'true',
    sentiments: searchParams.get('sentiments')?.split(',') ||
      searchParams.get('moods')?.split(',') || [
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
          if (value.length > 0) {
            if (key === 'sentiments') {
              params.set('sentiments', value.join(','));
            } else {
              params.set(key, value.join(','));
            }
          }
        } else if (value && value !== 'false' && value !== false) {
          params.set(key, value);
        }
      });

      // Handle boolean flags specifically
      if (values.invert) params.set('invert', 'true');

      setSearchParams(params);
    },
  });

  // Trigger API call when URL params change
  useEffect(() => {
    const filters = buildFiltersFromSearchParams(searchParams);
    const sortOrder = searchParams.get('invert') === 'true' ? 'desc' : 'asc';
    const sortBy = searchParams.get('sortBy') || 'createdAt';

    const apiParams = {
      page: 1,
      perPage: 10,
      sortBy,
      sortOrder,
      filters,
    };

    // Add userId if provided (for user-specific pages)
    if (userId) {
      apiParams.userId = userId;
    }

    dispatch(getReviews(apiParams));
  }, [searchParams, dispatch, userId]);

  const handleSentimentChange = (sentiment) => {
    const newSentiments = formik.values.sentiments.includes(sentiment)
      ? formik.values.sentiments.filter((s) => s !== sentiment)
      : [...formik.values.sentiments, sentiment];

    formik.setFieldValue('sentiments', newSentiments);
  };

  const handleReset = () => {
    formik.resetForm();
    setSearchParams(new URLSearchParams());
  };

  const buildFiltersFromSearchParams = (searchParams) => {
    const filters = {};

    // Text search
    if (searchParams.get('title')) {
      filters.title = searchParams.get('title');
    }

    // Date range
    if (searchParams.get('startDate')) {
      filters.startDate = searchParams.get('startDate');
    }
    if (searchParams.get('endDate')) {
      filters.endDate = searchParams.get('endDate');
    }

    // Likes range
    if (searchParams.get('minLikes')) {
      filters.minLikes = Number(searchParams.get('minLikes'));
    }
    if (searchParams.get('maxLikes')) {
      filters.maxLikes = Number(searchParams.get('maxLikes'));
    }

    // Dislikes range
    if (searchParams.get('minDislikes')) {
      filters.minDislikes = Number(searchParams.get('minDislikes'));
    }
    if (searchParams.get('maxDislikes')) {
      filters.maxDislikes = Number(searchParams.get('maxDislikes'));
    }

    // Sentiment filter
    if (searchParams.get('sentiments') || searchParams.get('moods')) {
      const sentiments =
        searchParams.get('sentiments') || searchParams.get('moods');
      filters.sentiments = sentiments.split(',');
    }

    return filters;
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
