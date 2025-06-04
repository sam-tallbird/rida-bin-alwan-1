import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import { locales as availableLocales } from '@/lib/i18n/config';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function CMSPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Redirect to login page
  redirect(`/${locale}/cms/login`);
} 