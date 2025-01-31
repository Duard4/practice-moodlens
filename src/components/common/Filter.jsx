import { useState } from 'react';
import Icon from './Icon';
import style from './common.module.css';

const Filter = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateChange = (e, type) => {
    const value = e.target.value;
    if (type === 'start') {
      setStartDate(value);
      if (endDate && value > endDate) {
        setEndDate(value);
      }
    } else {
      setEndDate(value);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-base-300 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Field */}
        <div className="flex items-center bg-base-200 rounded-lg p-2 flex-grow">
          <input type="text" placeholder="Пошук..." className={style.search} />
          <button className="btn btn-ghost btn-circle">
            <Icon icon="search" classes="w-6 h-6" />
          </button>
        </div>

        {/* Sorting Options */}
        <div className="flex items-center gap-4 justify-between">
          <select className="select select-bordered shrink-0 max-w-xs">
            <option disabled defaultValue>
              Сортувати за
            </option>
            <option>Датою виходу</option>
            <option>Назвою</option>
            <option>Популярністю</option>
          </select>
          <label className="label cursor-pointer gap-2">
            <span className="label-text">Інверсія</span>
            <input type="checkbox" className="checkbox" />
          </label>
        </div>
      </div>

      {/* Collapsible Filter Options */}
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title font-medium">Фільтри</div>
        <div className="collapse-content flex flex-col gap-4">
          {/* Date Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Початкова дата</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange(e, 'start')}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Кінцева дата</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange(e, 'end')}
                min={startDate}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Min Likes Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Мінімум лайків</span>
            </label>
            <input
              type="number"
              placeholder="Введіть мінімум лайків"
              className="input input-bordered w-full"
            />
          </div>

          {/* Min Symbols Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Мінімум символів</span>
            </label>
            <input
              type="number"
              placeholder="Введіть мінімум символів"
              className="input input-bordered w-full"
            />
          </div>

          {/* Max Dislikes Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Максимум дизлайків</span>
            </label>
            <input
              type="number"
              placeholder="Введіть максимум дизлайків"
              className="input input-bordered w-full"
            />
          </div>

          {/* Mood Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Настрій відгуку</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Включити позитивні</span>
                <input type="checkbox" defaultChecked className="checkbox" />
              </label>
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Включити нейтральні</span>
                <input type="checkbox" defaultChecked className="checkbox" />
              </label>
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Включити негативні</span>
                <input type="checkbox" defaultChecked className="checkbox" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
