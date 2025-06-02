import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import Image from 'next/image';

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

      {/* Quality Certifications Cards Section */}
      <section className="py-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-8xl mx-auto">
            
            {/* Certifications Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* SCA Membership Card */}
              <div className="bg-white dark:bg-brand-black-surface rounded-xl p-8">
                {/* Logo section - aligned to side */}
                <div className={`mb-6 ${locale === 'en' ? 'text-left' : 'text-right'}`}>
                  <div className="w-32 h-32 flex items-center justify-center inline-flex">
                    <Image
                      src="/quality/sca-logo.png"
                      alt="Specialty Coffee Association Logo"
                      width={128}
                      height={128}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                </div>
                
                {/* Content section */}
                <div>
                  {/* Red Dot and Title */}
                  <div className={`flex items-start gap-4 mb-4 ${
                    locale === 'en' ? 'text-left' : 'text-right'
                  }`}>
                    <div className="w-4 h-4 bg-brand-red rounded-full flex-shrink-0 mt-2"></div>
                    <h2 className={`text-2xl font-bold text-brand-black dark:text-brand-white ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}>
                      {t('sca.title')}
                    </h2>
                  </div>
                  
                  {/* Description */}
                  <div className={`${
                    locale === 'en' ? 'text-left' : 'text-right'
                  }`}>
                    <p className={`text-base leading-relaxed text-brand-black/80 dark:text-brand-white/80 ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}>
                      {t('sca.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* ISO 22000 Certification Card */}
              <div className="bg-white dark:bg-brand-black-surface rounded-xl p-8">
                {/* Logo section - aligned to side */}
                <div className={`mb-6 ${locale === 'en' ? 'text-left' : 'text-right'}`}>
                  <div className="w-24 h-24 flex items-center justify-center inline-flex">
                    <Image
                      src="/quality/iso-logo.png"
                      alt="ISO 22000 Certification Logo"
                      width={96}
                      height={96}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                </div>
                
                {/* Content section */}
                <div>
                  {/* Red Dot and Title */}
                  <div className={`flex items-start gap-4 mb-4 ${
                    locale === 'en' ? 'text-left' : 'text-right'
                  }`}>
                    <div className="w-4 h-4 bg-brand-red rounded-full flex-shrink-0 mt-2"></div>
                    <h2 className={`text-2xl font-bold text-brand-black dark:text-brand-white ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}>
                      {t('iso.title')}
                    </h2>
                  </div>
                  
                  {/* Description */}
                  <div className={`${
                    locale === 'en' ? 'text-left' : 'text-right'
                  }`}>
                    <p className={`text-base leading-relaxed text-brand-black/80 dark:text-brand-white/80 ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}>
                      {t('iso.description')}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 