import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('neo-theme', 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, toggleTheme } },
    React.createElement(
      'div',
      {
        className:
          `min-h-screen neo-bg transition-colors duration-700 ease-out ` +
          (theme === 'dark'
            ? 'text-slate-100'
            : 'text-slate-900')
      },
      children
    )
  );
};

export const useTheme = () => useContext(ThemeContext);
