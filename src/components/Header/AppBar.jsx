import { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuConent from './MenuConent';
import Drawer from './Drawer';
import Icon from '../common/Icon';
import ThemeController from './ThemeController';

const AppBar = ({ isAuthorized = true }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <header className="w-full bg-primary text-primary-content  shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <p className="text-2xl font-bold text-primary-content transition-colors hover:text-white">
            MoodLens
          </p>
        </Link>

        {/* Navigation (Hidden on small screens) */}
        <nav className="hidden md:flex items-center space-x-4">
          <MenuConent isAuthorized={isAuthorized} />

          {/* Theme Switcher */}
          <div className="hidden md:flex items-center ">
            <ThemeController />
          </div>
        </nav>

        {/* Drawer Toggle Button */}
        <button
          onClick={toggleDrawer}
          className="md:hidden p-2 transition-colors  hover:text-base-100"
        >
          <Icon icon="menu" classes="h-8 w-8" />
        </button>
      </div>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        isAuthorized={isAuthorized}
      />
    </header>
  );
};

export default AppBar;
