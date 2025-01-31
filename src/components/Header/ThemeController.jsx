import { useState } from 'react';
import Icon from '../common/Icon';

// const dark = 'coffee';
// const light = 'bumblebee';
// const ThemeController = () => {
const ThemeController = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    html.setAttribute('data-theme', newTheme);
  };

  return (
    <label
      className="btn btn-ghost btn-circle swap swap-rotate"
      onClick={toggleTheme}
    >
      <input
        type="checkbox"
        className="theme-controller hidden"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />

      <Icon icon="sun" classes="swap-off h-8 w-8" />
      <Icon icon="moon" classes="swap-on h-8 w-8" />
    </label>
  );
};

export default ThemeController;
