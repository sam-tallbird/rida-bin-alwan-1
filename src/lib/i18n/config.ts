export const locales = ['en', 'ar', 'ku'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'عربي',
  ku: 'كوردي',
};

export const isRtlLocale = (locale: Locale): boolean => {
  return locale === 'ar' || locale === 'ku';
}; 