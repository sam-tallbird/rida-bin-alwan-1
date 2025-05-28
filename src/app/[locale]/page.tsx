import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import AboutImagesCarousel from '@/components/AboutImagesCarousel';
import TasteCoffeeSection from '@/components/TasteCoffeeSection';
import AnimatedServicesSection from '@/components/AnimatedServicesSection';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  // enable static render
  setRequestLocale(locale);
  
  const t = await getTranslations('home');

  // Services cards data with random rotations
  const servicesCardsData = [
    { cardKey: 'card01', imageSrc: '/services-cards/ss-img-1.jpg', rotation: -2 },
    { cardKey: 'card02', imageSrc: '/services-cards/ss-img-2.jpg', rotation: 1 },
    { cardKey: 'card03', imageSrc: '/services-cards/ss-img-3.jpg', rotation: 3 },
    { cardKey: 'card04', imageSrc: '/services-cards/ss-img-4.jpg', rotation: -1 },
    { cardKey: 'card05', imageSrc: '/services-cards/ss-img-1.jpg', rotation: 2 },
    { cardKey: 'card06', imageSrc: '/services-cards/ss-img-2.jpg', rotation: -0.5 },
    { cardKey: 'card07', imageSrc: '/services-cards/ss-img-3.jpg', rotation: 1.5 },
    { cardKey: 'card08', imageSrc: '/services-cards/ss-img-4.jpg', rotation: -2.5 },
  ];
  
  return (
    <main>
      {/* Hero Section */}
      <section 
        className="w-full h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(/imgs/banner.jpg)'
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-brand-black bg-opacity-30"></div>
        
        {/* Hero content can be added here later */}
        <div className="relative z-10 flex items-center justify-center h-full">
          {/* Hero content placeholder */}
        </div>
      </section>

      {/* Home About Section */}
      <section className="py-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-8xl">
            {/* Section Label */}
            <div className="flex flex-col items-start mb-12">
              {/* Coffee Stain Icon - Smaller */}
              <div className="mb-6">
                <Image
                  src="/red-dot.svg"
                  alt="Coffee Stain Icon"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </div>
              
              {/* About Us Label - Bigger */}
              <h2 className={`text-2xl font-medium text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans' : locale === 'ku' ? 'font-arabic' : 'font-arabic'
              }`}>
                {t('about.label')}
              </h2>
            </div>

            {/* Description Text - Bigger with proper alignment */}
            <div className="max-w-7xl mb-16">
              <p className={`text-4xl leading-tight text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
              }`}>
                {t('about.description')}
              </p>
            </div>

            {/* About Images Animated Carousel */}
            <AboutImagesCarousel />
          </div>
        </div>
      </section>

      {/* Home About Taste Coffee Section */}
      <TasteCoffeeSection />

      {/* Animated Services Section */}
      <AnimatedServicesSection servicesCardsData={servicesCardsData} />
    </main>
  );
} 