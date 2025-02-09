import { NavLink } from 'react-router-dom';
import Icon from './common/Icon';

const Footer = () => {
  const id = 1;

  return (
    <footer className="bg-gradient-to-tr from-base-200 to-base-300 text-base-content mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row justify-between gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Навігація</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-primary transition-colors"
                >
                  Головна
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reviews"
                  className="hover:text-primary transition-colors"
                >
                  Рецензії
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/editor"
                  className="hover:text-primary transition-colors"
                >
                  Едітор
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/archive/${id}`}
                  className="hover:text-primary transition-colors"
                >
                  Архів
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ми у соцмережах</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Icon icon="twitter" classes="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Icon icon="facebook" classes="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Icon icon="instagram" classes="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-200 py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MoodLens. Всі права захищені.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
