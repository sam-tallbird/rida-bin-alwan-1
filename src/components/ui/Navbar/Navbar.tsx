'use client';
import { FC, useState } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Spiral as Hamburger } from 'hamburger-react';
import { isRtlLocale } from '@/lib/i18n/config';
import LocaleSwitcher from '../LocaleSwitcher';
import ThemeToggle from '../ThemeToggle';
import Container from '@/components/layout/Container';

// Left side navigation items
const leftNavItems = [
  { labelKey: 'home', path: '' },
  { labelKey: 'about', path: 'about' },
  { labelKey: 'campaign', path: 'campaign' },
  { labelKey: 'store', path: 'store' },
  { labelKey: 'offers', path: 'offers' },
];

// Right side navigation items  
const rightNavItems = [
  { labelKey: 'culture', path: 'culture' },
  { labelKey: 'quality', path: 'quality' },
  { labelKey: 'community', path: 'community' },
  { labelKey: 'branches', path: 'branches' },
  { labelKey: 'news', path: 'news' },
];

const Navbar: FC = () => {
  const { locale } = useParams() as { locale: string };
  const t = useTranslations('common.navbar');
  const isRtl = isRtlLocale(locale as 'en' | 'ar' | 'ku');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Get the appropriate logo based on locale (Kurdish uses Arabic logo since it's RTL)
  const logoPath = (locale === 'ar' || locale === 'ku') ? '/logo/ar-logo.svg' : '/logo/en-logo.svg';

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-white dark:bg-brand-black transition-colors duration-300">
      {/* Desktop/Laptop Navbar (lg and above) */}
      <nav className="hidden lg:block">
        <Container className="h-20">
          {/* 5-Container Grid Layout */}
          <div className={`grid h-full items-center gap-4 ${
            isRtl 
              ? 'grid-cols-[1fr_auto_auto_auto_1fr] [direction:rtl]' 
              : 'grid-cols-[1fr_auto_auto_auto_1fr]'
          }`}>
            
            {/* Container 01: Empty space for balance */}
            <div className="flex justify-start">
              {/* Intentionally empty for visual balance */}
            </div>

                         {/* Container 02: Left group of links */}
             <div className="flex items-center space-x-8 rtl:space-x-reverse">
               {leftNavItems.map(({ labelKey, path }) => (
                 <Link
                   key={labelKey}
                   href={`/${path}`}
                   className={`text-brand-black dark:text-brand-white font-medium nav-link transition-colors hover:text-brand-red ${
                     locale === 'ar' ? 'font-arabic' : locale === 'ku' ? 'font-kurdish' : 'font-sans'
                   }`}
                 >
                   <span>{t(labelKey)}</span>
                   <svg className="nav-link-graphic" width="100%" height="9" viewBox="0 0 101 9">
                     <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"/>
                   </svg>
                 </Link>
               ))}
             </div>

            {/* Container 03: Logo (Center) */}
            <div className="flex justify-center px-8">
              <Link href="/" aria-label="Home" className="block">
                <Image
                  src={logoPath}
                  alt="Logo"
                  width={80}
                  height={80}
                  priority
                  className="h-16 w-auto"
                />
              </Link>
            </div>

                         {/* Container 04: Right group of links */}
             <div className="flex items-center space-x-8 rtl:space-x-reverse">
               {rightNavItems.map(({ labelKey, path }) => (
                 <Link
                   key={labelKey}
                   href={`/${path}`}
                   className={`text-brand-black dark:text-brand-white font-medium nav-link transition-colors hover:text-brand-red ${
                     locale === 'ar' ? 'font-arabic' : locale === 'ku' ? 'font-kurdish' : 'font-sans'
                   }`}
                 >
                   <span>{t(labelKey)}</span>
                   <svg className="nav-link-graphic" width="100%" height="9" viewBox="0 0 101 9">
                     <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"/>
                   </svg>
                 </Link>
               ))}
             </div>

            {/* Container 05: Theme toggle and language switcher */}
            <div className="flex justify-end items-center space-x-4 rtl:space-x-reverse">
              <ThemeToggle />
              <LocaleSwitcher />
            </div>
          </div>
        </Container>
      </nav>

      {/* Tablet/Mobile Navbar (lg and below) */}
      <nav className="lg:hidden">
        <Container className="flex items-center justify-between h-16">
          {/* Mobile Logo */}
          <Link href="/" aria-label="Home" className="flex-shrink-0">
            <Image
              src={logoPath}
              alt="Logo"
              width={60}
              height={60}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Mobile Menu Controls */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <ThemeToggle />
            <LocaleSwitcher />
            <div className="p-2">
              <Hamburger
                toggled={isOpen}
                toggle={toggleMenu}
                size={24}
                color={undefined} // Let it inherit from CSS
                label={isOpen ? 'Close menu' : 'Open menu'}
              />
            </div>
          </div>
        </Container>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="bg-brand-white dark:bg-brand-black border-t border-gray-300 dark:border-gray-700 transition-colors duration-300">
            <Container className="py-4">
              <div className="space-y-3">
                                 {/* All navigation items in mobile */}
                 {[...leftNavItems, ...rightNavItems].map(({ labelKey, path }) => (
                   <Link
                     key={labelKey}
                     href={`/${path}`}
                     className={`block py-3 px-4 text-brand-black dark:text-brand-white font-medium nav-link transition-colors hover:text-brand-red hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md ${
                       locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans'
                     }`}
                     onClick={closeMenu}
                   >
                     <span>{t(labelKey)}</span>
                     <svg className="nav-link-graphic" width="100%" height="9" viewBox="0 0 101 9">
                       <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"/>
                     </svg>
                   </Link>
                 ))}
              </div>
            </Container>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar; 