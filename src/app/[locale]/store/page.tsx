import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import StoreColumns from '@/components/StoreColumns';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function StorePage({ params }: PageProps) {
  const { locale } = await params;
  // enable static render
  setRequestLocale(locale);
  
  const t = await getTranslations('store');

  // Mock product data - 12 products with different coffee types
  const products = [
    {
      id: 1,
      name: {
        en: 'Premium Arabic Coffee',
        ar: 'قهوة عربية مميزة',
        ku: 'قاوەی عەرەبی نایاب'
      },
      price: {
        en: '$24.99',
        ar: '٢٤.٩٩ دولار',
        ku: '$٢٤.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 2,
      name: {
        en: 'Ethiopian Blend',
        ar: 'مزيج إثيوبي',
        ku: 'تێکەڵاوی ئەسیۆپی'
      },
      price: {
        en: '$29.99',
        ar: '٢٩.٩٩ دولار',
        ku: '$٢٩.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 3,
      name: {
        en: 'Dark Roast Special',
        ar: 'تحميص داكن خاص',
        ku: 'تایبەتی برژاوی تاریک'
      },
      price: {
        en: '$26.99',
        ar: '٢٦.٩٩ دولار',
        ku: '$٢٦.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 4,
      name: {
        en: 'Medium Roast Classic',
        ar: 'تحميص متوسط كلاسيكي',
        ku: 'کلاسیکی برژاوی ناوەند'
      },
      price: {
        en: '$22.99',
        ar: '٢٢.٩٩ دولار',
        ku: '$٢٢.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 5,
      name: {
        en: 'Colombian Supreme',
        ar: 'كولومبي فاخر',
        ku: 'کۆلۆمبی نایاب'
      },
      price: {
        en: '$31.99',
        ar: '٣١.٩٩ دولار',
        ku: '$٣١.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 6,
      name: {
        en: 'Brazilian Santos',
        ar: 'برازيلي سانتوس',
        ku: 'برازیلی سانتۆس'
      },
      price: {
        en: '$25.99',
        ar: '٢٥.٩٩ دولار',
        ku: '$٢٥.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 7,
      name: {
        en: 'Yemen Mocha',
        ar: 'موكا يمني',
        ku: 'مۆکای یەمەنی'
      },
      price: {
        en: '$35.99',
        ar: '٣٥.٩٩ دولار',
        ku: '$٣٥.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 8,
      name: {
        en: 'Guatemalan Antigua',
        ar: 'غواتيمالي أنتيغوا',
        ku: 'گواتیمالی ئەنتیگوا'
      },
      price: {
        en: '$28.99',
        ar: '٢٨.٩٩ دولار',
        ku: '$٢٨.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 9,
      name: {
        en: 'Costa Rican Tarrazú',
        ar: 'كوستاريكي تارازو',
        ku: 'کۆستاریکی تارازو'
      },
      price: {
        en: '$30.99',
        ar: '٣٠.٩٩ دولار',
        ku: '$٣٠.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 10,
      name: {
        en: 'Jamaican Blue Mountain',
        ar: 'جامايكي الجبل الأزرق',
        ku: 'جامایکی چیای شین'
      },
      price: {
        en: '$45.99',
        ar: '٤٥.٩٩ دولار',
        ku: '$٤٥.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 11,
      name: {
        en: 'Hawaiian Kona',
        ar: 'هاوايي كونا',
        ku: 'هاوایی کۆنا'
      },
      price: {
        en: '$42.99',
        ar: '٤٢.٩٩ دولار',
        ku: '$٤٢.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    },
    {
      id: 12,
      name: {
        en: 'Espresso Blend',
        ar: 'مزيج إسبريسو',
        ku: 'تێکەڵاوی ئێسپرێسۆ'
      },
      price: {
        en: '$27.99',
        ar: '٢٧.٩٩ دولار',
        ku: '$٢٧.٩٩'
      },
      image: '/imgs/news/new2.jpg'
    }
  ];

  return (
    <main>
      {/* Store Section */}
      <section className="py-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-8xl">
            {/* Section Label */}
            <div className="flex flex-col items-start mb-6 w-full max-w-6xl mx-auto">
              {/* Our Products Label */}
              <h2 className={`text-8xl font-medium text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              }`}>
                {t('ourProducts')}
              </h2>
            </div>

            {/* Animated Store Columns */}
            <StoreColumns products={products} locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
} 