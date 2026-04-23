/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext, themes } from './themeContextUtils';

// Separate hook into its own component file to satisfy fast refresh
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Main component export
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('theme');
    // Migrate old 'dark'/'light' values
    if (saved && saved in themes) return saved;
    return 'light';
  });

  const currentTheme = themes[theme] ?? themes.light;
  const darkMode = currentTheme.isDark;

  useEffect(() => {
    localStorage.setItem('theme', theme);

    // Set dark/light class for Tailwind dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    // Remove all theme classes, then add the current one
    Object.keys(themes).forEach((t) => document.documentElement.classList.remove(`theme-${t}`));
    document.documentElement.classList.add(`theme-${theme}`);

    // Set CSS custom properties
    document.documentElement.style.setProperty('--color-primary', currentTheme.primary);
    document.documentElement.style.setProperty('--color-accent', currentTheme.accent);
  }, [theme, darkMode, currentTheme]);

  const setTheme = (name: string) => {
    if (name in themes) setThemeState(name);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (themes[prev]?.isDark ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}
