
import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useDarkMode = (): [Theme, (theme: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>('light');

  const setMode = (mode: Theme) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme;
    if (localTheme) {
      setTheme(localTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return [theme, setMode];
};
