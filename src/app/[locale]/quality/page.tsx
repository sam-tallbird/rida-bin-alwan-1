import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function QualityPage({ params }: PageProps) {
  const { locale } = await params;
  // enable static render
  setRequestLocale(locale);

  // Get translations using the same pattern as home page
  const t = await getTranslations('quality');

  return (
    <main>
      {/* Hero Section */}
      <section 
        className="w-full h-[60vh] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(/imgs/quality/quality-hero.jpg)' // You can change this image path
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-brand-black bg-opacity-50"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className={`text-6xl font-bold text-white ${
              locale === 'en' ? 'font-sans' : 'font-arabic'
            }`}>
              {t('title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Quality Content Section */}
      <section className="py-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-6xl mx-auto">
            
            {/* SCA Membership */}
            <div className="mb-16">
              <div className={`flex items-start gap-4 mb-6 ${
                locale === 'en' ? 'text-left' : 'text-right'
              }`}>
                {/* Red Dot */}
                <div className="w-4 h-4 bg-brand-red rounded-full flex-shrink-0 mt-2"></div>
                
                {/* Title */}
                <h2 className={`text-3xl font-bold text-brand-black dark:text-brand-white ${
                  locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                }`}>
                  {t('sca.title')}
                </h2>
              </div>
              
              {/* Description */}
              <div className={`${
                locale === 'en' ? 'text-left' : 'text-right'
              }`}>
                <p className={`text-lg leading-relaxed text-brand-black/80 dark:text-brand-white/80 ${
                  locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                }`}>
                  {t('sca.description')}
                </p>
              </div>
            </div>

            {/* ISO 22000 Certification */}
            <div className="mb-16">
              <div className={`flex items-start gap-4 mb-6 ${
                locale === 'en' ? 'text-left' : 'text-right'
              }`}>
                {/* Red Dot */}
                <div className="w-4 h-4 bg-brand-red rounded-full flex-shrink-0 mt-2"></div>
                
                {/* Title */}
                <h2 className={`text-3xl font-bold text-brand-black dark:text-brand-white ${
                  locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                }`}>
                  {t('iso.title')}
                </h2>
              </div>
              
              {/* Description */}
              <div className={`${
                locale === 'en' ? 'text-left' : 'text-right'
              }`}>
                <p className={`text-lg leading-relaxed text-brand-black/80 dark:text-brand-white/80 ${
                  locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                }`}>
                  {t('iso.description')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
} 