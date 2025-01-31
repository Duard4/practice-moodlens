import { Icon } from '../common';
import MenuContent from './MenuConent';
import ThemeController from './ThemeController';

const Drawer = ({ isDrawerOpen, toggleDrawer, isAuthorized }) => {
  return (
    <div
      className={`fixed md:hidden z-50 inset-y-0 right-0 w-full bg-primary text-accent pt-4 shadow-lg transform transition-transform ${
        !isDrawerOpen ? 'translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="container flex flex-col m-auto justify-between items-center">
        <button
          onClick={toggleDrawer}
          className="text-primary-content ml-auto p-2 hover:text-base-100"
        >
          <Icon icon="close" classes="h-7 w-7" />
        </button>

        <nav className="mt-4 w-full space-y-2">
          <MenuContent drawer={true} isAuthorized={isAuthorized} />
        </nav>

        <div className="mt-4 p-3 text-primary-content">
          <ThemeController />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
