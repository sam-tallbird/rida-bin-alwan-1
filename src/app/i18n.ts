import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/lib/i18n/config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request
  const locale = await requestLocale;
  
  // Validate that the incoming locale is valid
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  // Return messages and locale for next-intl compatibility
  return {
    locale,
    messages: (await import(`@/lib/i18n/locales/${locale}.json`)).default,
  };
}); 