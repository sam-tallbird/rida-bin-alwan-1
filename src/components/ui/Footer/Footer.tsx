'use client';

import { FC } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { isRtlLocale } from '@/lib/i18n/config';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

// Import navigation items from navbar (we'll reuse them)
const leftNavItems = [
  { labelKey: 'home', path: '' },
  { labelKey: 'about', path: 'about' },
  { labelKey: 'campaign', path: 'campaign' },
  { labelKey: 'store', path: 'store' },
  { labelKey: 'offers', path: 'offers' },
];

const rightNavItems = [
  { labelKey: 'culture', path: 'culture' },
  { labelKey: 'quality', path: 'quality' },
  { labelKey: 'community', path: 'community' },
  { labelKey: 'branches', path: 'branches' },
  { labelKey: 'news', path: 'news' },
];

const usefulLinks = [
  { labelKey: 'privacyPolicy', path: 'privacy-policy' },
  { labelKey: 'termsConditions', path: 'terms-conditions' },
  { labelKey: 'cookiePolicy', path: 'cookie-policy' },
  { labelKey: 'faq', path: 'faq' },
  { labelKey: 'contact', path: 'contact' },
  { labelKey: 'careers', path: 'careers' },
];

const socialLinks = [
  { 
    labelKey: 'facebook', 
    href: 'https://facebook.com/ridhaalwancoffee', 
    icon: Facebook,
    hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400'
  },
  { 
    labelKey: 'instagram', 
    href: 'https://instagram.com/ridhaalwancoffee', 
    icon: Instagram,
    hoverColor: 'hover:text-pink-600 dark:hover:text-pink-400'
  },
  { 
    labelKey: 'twitter', 
    href: 'https://twitter.com/ridhaalwancoffee', 
    icon: Twitter,
    hoverColor: 'hover:text-blue-500 dark:hover:text-blue-300'
  },
  { 
    labelKey: 'youtube', 
    href: 'https://youtube.com/@ridhaalwancoffee', 
    icon: Youtube,
    hoverColor: 'hover:text-red-600 dark:hover:text-red-400'
  },
];

const Footer: FC = () => {
  const { locale } = useParams() as { locale: string };
  const tNavbar = useTranslations('common.navbar');
  const tFooter = useTranslations('common.footer');
  const isRtl = isRtlLocale(locale as 'en' | 'ar' | 'ku');

  // Get the appropriate logo based on locale
  const logoPath = (locale === 'ar' || locale === 'ku') ? '/logo/ar-logo.svg' : '/logo/en-logo.svg';

  return (
    <footer className="bg-brand-white dark:bg-brand-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-12 max-w-full py-16">
        <div className="max-w-8xl">
          <div className={`grid gap-12 ${
            isRtl 
              ? 'lg:grid-cols-[2fr_1fr_1fr_1fr] [direction:rtl]' 
              : 'lg:grid-cols-[2fr_1fr_1fr_1fr]'
          } md:grid-cols-2 grid-cols-1`}>
            
            {/* Company Info Section */}
            <div className={`space-y-6 ${isRtl ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
              {/* Logo */}
              <Link href="/" aria-label="Home" className="inline-block">
                <Image
                  src={logoPath}
                  alt="Ridha Alwan Coffee Logo"
                  width={120}
                  height={120}
                  className="h-20 w-auto"
                />
              </Link>
              
              {/* Description */}
              <p className={`text-brand-black/70 dark:text-brand-white/70 leading-relaxed max-w-md ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              } ${isRtl ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                {tFooter('description')}
              </p>
              
              {/* Social Media */}
              <div className="space-y-4">
                <h4 className={`font-semibold text-brand-black dark:text-brand-white ${
                  locale === 'en' ? 'font-sans' : 'font-arabic'
                }`}>
                  {tFooter('socialMedia.followUs')}
                </h4>
                <div className="flex space-x-4 rtl:space-x-reverse justify-center lg:justify-start">
                  {socialLinks.map(({ labelKey, href, icon: Icon, hoverColor }) => (
                    <a
                      key={labelKey}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-brand-black/60 dark:text-brand-white/60 transition-colors ${hoverColor}`}
                      aria-label={tFooter(`socialMedia.${labelKey}`)}
                    >
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Column 1 - Left Nav Items */}
            <div className={`space-y-6 ${isRtl ? 'text-right' : 'text-left'} text-center lg:text-left`}>
              <h4 className={`font-semibold text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              }`}>
                {tNavbar('home')} & {tNavbar('about')}
              </h4>
              <ul className="space-y-3">
                {leftNavItems.map(({ labelKey, path }) => (
                  <li key={labelKey}>
                    <Link
                      href={`/${path}`}
                      className={`text-brand-black/70 dark:text-brand-white/70 hover:text-brand-red dark:hover:text-brand-red transition-colors nav-link ${
                        locale === 'en' ? 'font-sans' : 'font-arabic'
                      }`}
                    >
                      <span>{tNavbar(labelKey)}</span>
                      <svg className="nav-link-graphic" width="100%" height="9" viewBox="0 0 101 9">
                        <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"/>
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Column 2 - Right Nav Items */}
            <div className={`space-y-6 ${isRtl ? 'text-right' : 'text-left'} text-center lg:text-left`}>
              <h4 className={`font-semibold text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              }`}>
                {tNavbar('culture')} & {tNavbar('community')}
              </h4>
              <ul className="space-y-3">
                {rightNavItems.map(({ labelKey, path }) => (
                  <li key={labelKey}>
                    <Link
                      href={`/${path}`}
                      className={`text-brand-black/70 dark:text-brand-white/70 hover:text-brand-red dark:hover:text-brand-red transition-colors nav-link ${
                        locale === 'en' ? 'font-sans' : 'font-arabic'
                      }`}
                    >
                      <span>{tNavbar(labelKey)}</span>
                      <svg className="nav-link-graphic" width="100%" height="9" viewBox="0 0 101 9">
                        <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"/>
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links Column */}
            <div className={`space-y-6 ${isRtl ? 'text-right' : 'text-left'} text-center lg:text-left`}>
              <h4 className={`font-semibold text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              }`}>
                {tFooter('usefulLinks.title')}
              </h4>
              <ul className="space-y-3">
                {usefulLinks.map(({ labelKey, path }) => (
                  <li key={labelKey}>
                    <Link
                      href={`/${path}`}
                      className={`text-brand-black/70 dark:text-brand-white/70 hover:text-brand-red dark:hover:text-brand-red transition-colors nav-link ${
                        locale === 'en' ? 'font-sans' : 'font-arabic'
                      }`}
                    >
                      <span>{tFooter(`usefulLinks.${labelKey}`)}</span>
                      <svg className="nav-link-graphic" width="100%" height="9" viewBox="0 0 101 9">
                        <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.10 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"/>
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-brand-black transition-colors duration-300">
        <div className="container mx-auto px-12 max-w-full py-6">
          <div className="max-w-8xl">
            <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${
              isRtl ? 'md:flex-row-reverse' : ''
            }`}>
              {/* Copyright Text */}
              <p className={`text-sm text-brand-black/60 dark:text-brand-white/60 ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              } ${isRtl ? 'text-right' : 'text-left'} text-center md:text-left`}>
                {tFooter('copyright')}
              </p>
              
              {/* Additional Info */}
              <div className={`flex items-center space-x-6 rtl:space-x-reverse text-sm text-brand-black/60 dark:text-brand-white/60 ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              }`}>
                <span>Baghdad, Iraq</span>
                <span>•</span>
                <span>Since 1960</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 