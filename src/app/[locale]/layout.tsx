import type { ReactNode } from 'react';
import { isRtlLocale, Locale, locales as availableLocales } from '@/lib/i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/ui/Navbar/Navbar';
import Footer from '@/components/ui/Footer/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Noise from '@/components/ui/Noise';
import '../globals.css'; // Import globals.css here
import { aeonik, notoNaskhArabic } from '../fonts'; // Import fonts here

// Function to load messages based on locale
async function getMessages(locale: string) {
  try {
    return (await import(`../../lib/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    return {}; // Return empty object or fallback messages on error
  }
}

export function generateMetadata() {
  return {
    title: 'Ridha Alwan Coffee',
    description: 'Ridha Alwan Coffee - Premium coffee experience',
  };
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const isRtl = isRtlLocale(locale);

  // Tell next-intl the active locale for static rendering
  setRequestLocale(locale);

  // Fetch messages for the current locale
  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Meta tags, title, etc. can be managed by Next.js metadata API */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${aeonik.variable} ${notoNaskhArabic.variable} antialiased h-full`}>
        <SmoothScrollProvider>
          <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Noise 
                patternSize={200}
                patternRefreshInterval={3}
                patternAlpha={12}
                blendMode="multiply"
                excludeFromNavbar={true}
              />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
} 