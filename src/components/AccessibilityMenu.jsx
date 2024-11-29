import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useUserPreferences } from '../contexts/UserPreferences';

const AccessibilityMenu = () => {
  const { theme, toggleTheme, fontSize, changeFontSize } = useUserPreferences();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label="Accessibility settings"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {/* Theme Toggle */}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={toggleTheme}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  role="menuitem"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
              )}
            </Menu.Item>

            {/* Font Size Controls */}
            <div className="px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Font Size
            </div>
            {['small', 'normal', 'large', 'extra-large'].map((size) => (
              <Menu.Item key={size}>
                {({ active }) => (
                  <button
                    onClick={() => changeFontSize(size)}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } ${
                      fontSize === size ? 'text-primary' : ''
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    role="menuitem"
                    aria-label={`Set font size to ${size}`}
                  >
                    <span className="w-5 h-5 mr-2 flex items-center justify-center">
                      {fontSize === size && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AccessibilityMenu;
