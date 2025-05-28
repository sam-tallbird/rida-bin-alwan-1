import { createTranslator } from 'next-intl';

export function getTranslations(namespace: string) {
  return async (locale: string) => {
    const messages = (await import(`./locales/${locale}.json`)).default;
    return createTranslator({ locale, messages, namespace });
  };
}

export { useTranslations } from 'next-intl'; 