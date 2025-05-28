'use client';
import { FC, useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n/config';

const LocaleSwitcher: FC = () => {
  const { locale } = useParams() as { locale: string };
  const router = useRouter();
  const t = useTranslations('common.locale');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);
    
    // Get current path without locale
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '') || '/';
    
    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 rtl:space-x-reverse text-brand-black dark:text-brand-white hover:text-brand-red transition-colors duration-200 py-2 px-3 rounded-md hover:bg-brand-white-surface dark:hover:bg-brand-black-surface"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={18} />
        <span className={`text-sm font-medium ${
          locale === 'ar' ? 'font-arabic' : locale === 'ku' ? 'font-kurdish' : 'font-sans'
        }`}>
          {t(locale as Locale)}
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 rtl:left-0 rtl:right-auto bg-brand-white dark:bg-brand-black border border-brand-white-surface dark:border-brand-black-surface rounded-md shadow-lg min-w-[140px] z-50">
          <div className="py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-full text-left rtl:text-right px-4 py-2 text-sm transition-colors duration-150 ${
                  loc === locale
                    ? 'bg-brand-red text-brand-white'
                    : 'text-brand-black dark:text-brand-white hover:bg-brand-white-surface dark:hover:bg-brand-black-surface hover:text-brand-red'
                } ${
                  loc === 'ar' ? 'font-arabic' : loc === 'ku' ? 'font-kurdish' : 'font-sans'
                }`}
                role="menuitem"
              >
                {t(loc)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocaleSwitcher; 