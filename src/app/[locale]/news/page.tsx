import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

// Mock news data - will be connected to database later
const newsArticles = [
  {
    id: 1,
    slug: 'coffee-culture-reading-corner-experience',
    image: '/imgs/news/news1.jpg',
    headline: {
      en: 'Coffee Culture Meets Literature: Our Reading Corner Experience',
      ar: 'ثقافة القهوة تلتقي بالأدب: تجربة ركن القراءة لدينا',
      ku: 'کولتووری قاوە دەگاتە ئەدەبیات: ئەزموونی گۆشەی خوێندنەوەمان'
    }
  },
  {
    id: 2,
    slug: 'traditional-iraqi-coffee-blend-launch',
    image: '/imgs/news/new2.jpg',
    headline: {
      en: 'Introducing Our Heritage Blend: Traditional Iraqi Coffee',
      ar: 'نقدم خليط التراث: القهوة العراقية التقليدية',
      ku: 'پێشکەشکردنی تێکەڵەی میراتمان: قاوەی تەقلیدی عێراقی'
    }
  },
  {
    id: 3,
    slug: 'historic-baghdad-branch-grand-opening',
    image: '/imgs/news/news3.jpg',
    headline: {
      en: 'Historic Baghdad Branch: A Grand Opening Celebration',
      ar: 'فرع بغداد التاريخي: احتفال افتتاح كبير',
      ku: 'لقی مێژوویی بەغداد: ئاهەنگی کردنەوەی گەورە'
    }
  }
];

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  // enable static render
  setRequestLocale(locale);
  
  const t = await getTranslations('news');
  const isRtl = locale === 'ar' || locale === 'ku';

  return (
    <main>
      {/* News Section */}
      <section className="pt-60 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-8xl">
            {/* News Title with Dot */}
            <div className={`flex items-center justify-between mb-16`}>
              <h1 className={`text-8xl font-medium text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              } ${isRtl ? 'order-1' : 'order-1'}`}>
                {t('title')}
              </h1>
              <div className={`w-16 h-16 bg-brand-black dark:bg-brand-white rounded-full flex-shrink-0 ${
                isRtl ? 'order-2' : 'order-2'
              }`} />
            </div>

            {/* News Cards */}
            <div className="space-y-0">
              {/* Mock news data - will be connected to database later */}
              {newsArticles.map((article) => (
                <div key={article.id}>
                  {/* Top Divider */}
                  <div className="border-t border-brand-black dark:border-brand-white pt-8"></div>
                  
                  {/* Clickable News Card */}
                  <Link 
                    href={`/news/${article.slug}`}
                    className="block group cursor-pointer"
                  >
                    <div className="flex gap-8 items-start rtl:space-x-reverse">
                      {/* Image */}
                      <div className="w-[30rem] h-80 rounded-lg flex-shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                        <Image 
                          src={article.image} 
                          alt={article.headline[locale as keyof typeof article.headline]}
                          className="w-full h-full object-cover"
                          width={480}
                          height={320}
                        />
                      </div>
                      
                      {/* Headline */}
                      <div className="flex-1 relative">
                        <h3 className={`text-5xl font-medium text-brand-black dark:text-brand-white transition-colors duration-300 group-hover:text-brand-red ${
                          locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                        }`}>
                          {article.headline[locale as keyof typeof article.headline]}
                        </h3>
                        
                        {/* Arrow */}
                        <div className={`absolute top-0 ${
                          isRtl ? 'left-0' : 'right-0'
                        } text-brand-black dark:text-brand-white transition-all duration-300 group-hover:text-brand-red group-hover:translate-x-1`}>
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            className="w-8 h-8"
                          >
                            <path 
                              d="M5 12H19M19 12L12 5M19 12L12 19" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Bottom Divider with more padding */}
                  <div className="border-b border-brand-black dark:border-brand-white pb-12 mt-8"></div>
                </div>
              ))}
            </div>
          </div>
    </div>
      </section>
    </main>
  );
} 