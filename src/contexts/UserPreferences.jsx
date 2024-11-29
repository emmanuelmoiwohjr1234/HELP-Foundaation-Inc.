import { createContext, useContext, useEffect, useState } from 'react';

const UserPreferencesContext = createContext({});

export const useUserPreferences = () => useContext(UserPreferencesContext);

export const UserPreferencesProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'normal';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    const handleMotionChange = (e) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = {
      small: '14px',
      normal: '16px',
      large: '18px',
      'extra-large': '20px'
    }[fontSize];
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  const value = {
    theme,
    toggleTheme,
    fontSize,
    changeFontSize,
    reducedMotion,
    isLoading,
    setIsLoading
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
