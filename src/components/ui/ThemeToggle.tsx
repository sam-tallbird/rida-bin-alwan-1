'use client';
import { FC } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 bg-brand-white-surface dark:bg-brand-black-surface rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-brand-white dark:focus:ring-offset-brand-black hover:bg-brand-white dark:hover:bg-brand-black"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      {/* Track background */}
      <div 
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          theme === 'dark' ? 'bg-brand-black-surface' : 'bg-brand-white-surface'
        }`}
      />
      
      {/* Toggle circle with icon */}
      <div
        className={`relative flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-3 rtl:-translate-x-3' : '-translate-x-3 rtl:translate-x-3'
        }`}
      >
        {theme === 'light' ? (
          <Sun size={12} className="text-brand-red" />
        ) : (
          <Moon size={12} className="text-brand-black" />
        )}
      </div>
      
      {/* Background icons for better visual context */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        <Sun 
          size={10} 
          className={`transition-opacity duration-300 ${
            theme === 'light' ? 'opacity-0' : 'opacity-40 text-brand-white'
          }`}
        />
        <Moon 
          size={10} 
          className={`transition-opacity duration-300 ${
            theme === 'dark' ? 'opacity-0' : 'opacity-40 text-brand-black'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle; 