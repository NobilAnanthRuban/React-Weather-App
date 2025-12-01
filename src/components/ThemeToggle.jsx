import React from 'react';
import { useTheme } from '../hooks/useTheme.js';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-between w-16 px-1 py-1 rounded-full bg-slate-900/80 border border-cyan-400/40 shadow-neon transition-colors duration-500 neo-focus"
      aria-label="Toggle color theme"
    >
      <span
        className={`absolute h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-fuchsia-500 transform transition-transform duration-500 ${
          isDark ? 'translate-x-0' : 'translate-x-7'
        }`}
      />
      <span className="relative z-10 text-xs text-yellow-300">☀️</span>
      <span className="relative z-10 text-xs text-slate-100">🌙</span>
    </button>
  );
};

export default ThemeToggle;
