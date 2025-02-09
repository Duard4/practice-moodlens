import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Icon from './Icon';
import style from './common.module.css';

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
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2 sm:gap-4 p-4 bg-base-300 rounded-lg shadow-lg"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center bg-base-200 rounded-lg p-2 flex-grow h-12 md:h-16">
          <input
            type="text"
            name="title"
            placeholder="Пошук..."
            className={style.search}
            {...formik.getFieldProps('title')}
          />
          <button type="submit" className="btn btn-ghost btn-circle">
            <Icon icon="search" classes="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 justify-between">
          <select
            className="select select-bordered h-12 md:h-16 shrink-0 sm:max-w-xs w-full md:w-auto"
            {...formik.getFieldProps('sortBy')}
          >
            <option disabled>Сортувати за</option>
            <option value="date">Датою виходу</option>
            <option value="title">Назвою</option>
            <option value="popularity">Популярністю</option>
          </select>
          <label className="label cursor-pointer ml-auto gap-2">
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
          <div className="flex flex-col md:flex-row gap-1 sm:gap-4">
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Початкова дата</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
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
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Кінцева дата</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...formik.getFieldProps('endDate')}
                min={formik.values.startDate}
              />
            </div>
          </div>

          {['minLikes', 'minSymbols', 'maxDislikes'].map((field) => (
            <div key={field} className="form-control">
              <label className="label">
                <span className="label-text">
                  {
                    {
                      minLikes: 'Мінімум лайків',
                      minSymbols: 'Мінімум символів',
                      maxDislikes: 'Максимум дизлайків',
                    }[field]
                  }
                </span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder={`Введіть ${field}`}
                {...formik.getFieldProps(field)}
                min="0" // Додаємо атрибут min="0" для запобігання введення від'ємних значень
              />
            </div>
          ))}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Настрій відгуку</span>
            </label>
            <div className="flex flex-col gap-2">
              {['positive', 'neutral', 'negative'].map((mood) => (
                <label key={mood} className="label cursor-pointer gap-2">
                  <span className="label-text">
                    {
                      {
                        positive: 'Включити позитивні',
                        neutral: 'Включити нейтральні',
                        negative: 'Включити негативні',
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
