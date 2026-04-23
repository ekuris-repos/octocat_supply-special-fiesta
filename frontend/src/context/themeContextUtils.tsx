import { createContext } from 'react';

export interface ThemeDefinition {
  name: string;
  label: string;
  isDark: boolean;
  primary: string;
  accent: string;
}

export const themes: Record<string, ThemeDefinition> = {
  light: { name: 'light', label: 'Light', isDark: false, primary: '#76B852', accent: '#8BC34A' },
  dark: { name: 'dark', label: 'Dark', isDark: true, primary: '#76B852', accent: '#8BC34A' },
  ocean: { name: 'ocean', label: 'Ocean', isDark: true, primary: '#0EA5E9', accent: '#38BDF8' },
  sunset: { name: 'sunset', label: 'Sunset', isDark: false, primary: '#F97316', accent: '#FB923C' },
  forest: { name: 'forest', label: 'Forest', isDark: true, primary: '#14B8A6', accent: '#2DD4BF' },
  lavender: { name: 'lavender', label: 'Lavender', isDark: false, primary: '#8B5CF6', accent: '#A78BFA' },
};

export type ThemeContextType = {
  theme: string;
  setTheme: (name: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
