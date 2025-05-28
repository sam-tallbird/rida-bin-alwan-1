import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
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
    },
    content: {
      en: 'At Ridha Alwan Coffee, we believe that the perfect cup of coffee is best enjoyed with a good book. Our reading corner has become a sanctuary for coffee lovers and literature enthusiasts alike. With carefully curated newspapers, magazines, and books, we create an atmosphere where the aroma of freshly brewed coffee mingles with the rustle of turning pages. This unique experience reflects our commitment to fostering intellectual conversations and cultural exchange, making every visit not just about coffee, but about enriching the mind and soul.',
      ar: 'في قهوة رضا علوان، نؤمن أن فنجان القهوة المثالي يُستمتع به بأفضل شكل مع كتاب جيد. لقد أصبح ركن القراءة لدينا ملاذًا لعشاق القهوة وهواة الأدب على حد سواء. مع الصحف والمجلات والكتب المختارة بعناية، نخلق أجواءً تمتزج فيها رائحة القهوة المحضرة حديثًا مع حفيف تقليب الصفحات. تعكس هذه التجربة الفريدة التزامنا بتعزيز الحوارات الفكرية والتبادل الثقافي، مما يجعل كل زيارة ليست فقط عن القهوة، بل عن إثراء العقل والروح.',
      ku: 'لە قاوەی ڕەزا عەلوان، ئێمە باوەڕمان وایە کە کوپە قاوەی تەواو باشترین چێژ لەگەڵ کتێبێکی باشدا وەردەگیرێت. گۆشەی خوێندنەوەمان بووەتە پەناگایەک بۆ خۆشەویستانی قاوە و ئەدەبیات. لەگەڵ ڕۆژنامە و گۆڤار و کتێبە بە وریاییەوە هەڵبژێراوەکان، کەشوهەوایەک دروست دەکەین کە بۆنی قاوەی تازە ئامادەکراو لەگەڵ دەنگی هەڵگەڕانەوەی لاپەڕەکان تێکەڵ دەبێت. ئەم ئەزموونە بێوێنەیە پابەندیمان بۆ پەرەپێدانی گفتوگۆی بیرکاریانە و ئاڵوگۆڕی کولتووری ڕەنگ دەداتەوە، وا دەکات هەر سەردانێک تەنها دەربارەی قاوە نەبێت، بەڵکو دەربارەی دەوڵەمەندکردنی مێشک و گیان بێت.'
    },
    date: '2025-01-15'
  },
  {
    id: 2,
    slug: 'traditional-iraqi-coffee-blend-launch',
    image: '/imgs/news/new2.jpg',
    headline: {
      en: 'Introducing Our Heritage Blend: Traditional Iraqi Coffee',
      ar: 'نقدم خليط التراث: القهوة العراقية التقليدية',
      ku: 'پێشکەشکردنی تێکەڵەی میراتمان: قاوەی تەقلیدی عێراقی'
    },
    content: {
      en: 'We are proud to unveil our Heritage Blend, a tribute to the rich coffee traditions of Iraq. This special blend captures the essence of our cultural identity, featuring traditional Iraqi patterns on our packaging that tell the story of our land. Each cup carries the warmth of Iraqi hospitality and the depth of flavors that have been cherished for generations. Our Heritage Blend represents more than just coffee – it is a celebration of our roots, our history, and our commitment to preserving the authentic taste that has made Iraqi coffee renowned throughout the region.',
      ar: 'نحن فخورون بالكشف عن خليط التراث، تحية لتقاليد القهوة الغنية في العراق. يلتقط هذا المزيج الخاص جوهر هويتنا الثقافية، ويتميز بالأنماط العراقية التقليدية على عبواتنا التي تحكي قصة أرضنا. كل فنجان يحمل دفء الضيافة العراقية وعمق النكهات التي تم الاعتزاز بها لأجيال. يمثل خليط التراث أكثر من مجرد قهوة - إنه احتفال بجذورنا وتاريخنا والتزامنا بالحفاظ على الطعم الأصيل الذي جعل القهوة العراقية مشهورة في جميع أنحاء المنطقة.',
      ku: 'ئێمە شانازی بە ئاشکراکردنی تێکەڵەی میراتمان دەکەین، ڕێزگرتنێک بۆ نەریتە دەوڵەمەندەکانی قاوەی عێراق. ئەم تێکەڵە تایبەتە جەوهەری ناسنامەی کولتووریمان دەگرێت، نەخشە تەقلیدییەکانی عێراقی لەسەر پاکەتەکانمان دەخاتە ڕوو کە چیرۆکی خاکەکەمان دەگێڕنەوە. هەر کوپێک گەرمی میوانداری عێراقی و قووڵایی تامەکان هەڵدەگرێت کە بۆ نەوەکان بەنرخ زانراون. تێکەڵەی میراتمان زیاتر لە تەنها قاوە نوێنەرایەتی دەکات - ئەوە ئاهەنگگێڕانێکە بۆ ڕەگەکانمان، مێژوومان، و پابەندیمان بۆ پاراستنی تامە ڕاستەقینەکە کە قاوەی عێراقی لە سەرانسەری هەرێمەکەدا ناودارکردووە.'
    },
    date: '2025-01-10'
  },
  {
    id: 3,
    slug: 'historic-baghdad-branch-grand-opening',
    image: '/imgs/news/news3.jpg',
    headline: {
      en: 'Historic Baghdad Branch: A Grand Opening Celebration',
      ar: 'فرع بغداد التاريخي: احتفال افتتاح كبير',
      ku: 'لقی مێژوویی بەغداد: ئاهەنگی کردنەوەی گەورە'
    },
    content: {
      en: 'Our historic Baghdad branch opened its doors with a grand celebration that brought together coffee enthusiasts, local dignitaries, and longtime customers. The beautiful architecture of our new location reflects the timeless elegance of Baghdad, while the vintage car parked outside adds a touch of nostalgia to the scene. This branch represents a milestone in our journey, combining modern coffee culture with the rich heritage of our beloved city. The opening ceremony was a testament to our deep roots in Baghdad and our commitment to serving the community that has supported us for over six decades.',
      ar: 'افتتح فرعنا التاريخي في بغداد أبوابه باحتفال كبير جمع عشاق القهوة والشخصيات المحلية البارزة والعملاء القدامى. تعكس العمارة الجميلة لموقعنا الجديد الأناقة الخالدة لبغداد، بينما تضيف السيارة الكلاسيكية المتوقفة خارجًا لمسة من الحنين إلى المشهد. يمثل هذا الفرع معلمًا في رحلتنا، يجمع بين ثقافة القهوة الحديثة والتراث الغني لمدينتنا الحبيبة. كان حفل الافتتاح شاهدًا على جذورنا العميقة في بغداد والتزامنا بخدمة المجتمع الذي دعمنا لأكثر من ستة عقود.',
      ku: 'لقی مێژوویی بەغدادمان دەرگاکانی بە ئاهەنگێکی گەورە کردەوە کە خۆشەویستانی قاوە، کەسایەتییە ناوخۆییەکان، و کڕیارە کۆنەکانی کۆکردەوە. تەلارسازی جوانی شوێنە نوێیەکەمان ئەلقەی هەمیشەیی بەغداد ڕەنگ دەداتەوە، لە کاتێکدا ئۆتۆمبێلە کۆنەکەی لە دەرەوە ڕاوەستاو دەستێکی ئارەزوومەندی بۆ دیمەنەکە زیاد دەکات. ئەم لقە بەردەوامێک لە گەشتەکەماندا نوێنەرایەتی دەکات، کولتووری قاوەی سەردەم لەگەڵ میراتی دەوڵەمەندی شارە خۆشەویستەکەمان تێکەڵ دەکات. ئاهەنگی کردنەوەکە شایەتی ڕەگە قووڵەکانمان لە بەغداد و پابەندیمان بۆ خزمەتکردنی کۆمەڵگایەک بوو کە زیاتر لە شەش دەیە پشتگیریمانی کردووە.'
    },
    date: '2025-01-05'
  }
];

export async function generateStaticParams() {
  const params = [];
  
  for (const locale of availableLocales) {
    for (const article of newsArticles) {
      params.push({
        locale,
        slug: article.slug
      });
    }
  }
  
  return params;
}

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  // enable static render
  setRequestLocale(locale);
  
  const t = await getTranslations('news');
  
  // Find the article by slug
  const article = newsArticles.find(a => a.slug === slug);
  
  if (!article) {
    notFound();
  }
  
  const isRtl = locale === 'ar' || locale === 'ku';

  return (
    <main>
      {/* Article Section */}
      <section className="pt-32 pb-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-6xl mx-auto">
            {/* Back to News Button */}
            <div className="mb-8">
              <Link 
                href="/news"
                className={`inline-flex items-center gap-3 text-brand-black dark:text-brand-white hover:text-brand-red dark:hover:text-brand-red transition-colors duration-300 ${
                  locale === 'en' ? 'font-sans' : 'font-arabic'
                }`}
              >
                {/* Arrow Icon */}
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className={`transition-transform duration-300 group-hover:-translate-x-1 ${
                    isRtl ? 'rotate-180' : ''
                  }`}
                >
                  <path 
                    d="M19 12H5M5 12L12 19M5 12L12 5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-lg">{t('backToNews')}</span>
              </Link>
            </div>

            {/* Article Header */}
            <div className="mb-16">
              <h1 className={`text-6xl font-medium text-brand-black dark:text-brand-white mb-8 ${
                locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
              }`}>
                {article.headline[locale as keyof typeof article.headline]}
              </h1>
              
              {/* Date */}
              <p className={`text-lg text-brand-black/60 dark:text-brand-white/60 ${
                locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
              }`}>
                {new Date(article.date).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ar' ? 'ar-EG' : 'ku-IQ')}
              </p>
            </div>

            {/* Article Image */}
            <div className="w-full h-[34rem] rounded-lg overflow-hidden mb-16">
              <Image 
                src={article.image} 
                alt={article.headline[locale as keyof typeof article.headline]}
                className="w-full h-full object-cover"
                width={1200}
                height={544}
                priority
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className={`text-xl leading-relaxed text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
              }`}>
                {article.content[locale as keyof typeof article.content]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 