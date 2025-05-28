'use client';
import { FC, ReactNode } from 'react';
import { ThemeContext, useThemeLogic } from '@/hooks/useTheme';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const themeLogic = useThemeLogic();

  return (
    <ThemeContext.Provider value={themeLogic}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 