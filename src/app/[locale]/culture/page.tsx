import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function CulturePage({ params }: PageProps) {
  const { locale } = await params;
  // enable static render
  setRequestLocale(locale);

  const cultureContent = {
    heroTitle: {
      en: 'Rida Alwan Cultural Foundation',
      ar: 'مؤسسة رضا علوان الثقافیة',
      ku: 'دامەزراوەی کولتووری ڕیدا علوان'
    },
    heroSubtitle: {
      en: 'We initiate to inspire!',
      ar: 'نُبادر لنُلھم!',
      ku: 'ئێمە دەستپێدەکەین بۆ ئیلهام بەخشین!'
    },
    missionTitle: {
      en: 'Our Cultural Mission',
      ar: 'مهمتنا الثقافية',
      ku: 'ئەرکی کولتوورییمان'
    },
    missionText: {
      en: 'The Rida Alwan Cultural Foundation was born to support Iraqi arts, thought, and creativity. We believe that every small idea has wings, and with every initiative, we nurture it until it soars high. Our events, seminars, exhibitions, and cultural programs are bridges we cross towards a more beautiful Iraq, where free voices are heard and literature and art flourish.',
      ar: 'ولدت مؤسسة بن رضا علوان الثقافیة لدعم الفنون، الفكر، والإبداع العراقي. نؤمن أن لكل فكرة صغیرة جناحین، ومع كل مبادرة، نرعاھا حتّق عالیًا. فعالیاتنا، ندواتنا، معارضنا، وبرامجنا الثقافیة ھي جسور نعبر بھا نحو عراق أجمل، یُنصت فیھ الصوت الحر، ویزدھر فیھ الحرف والفن.',
      ku: 'دامەزراوەی کولتووری ڕیدا علوان لەدایک بووە بۆ پشتگیریکردنی هونەر، بیر، و داهێنانی عێراقی. ئێمە باوەڕمان وایە هەر بیرۆکەیەکی بچووک باڵی هەیە، و لەگەڵ هەر پێشخستنێک، ئەوە پەروەردە دەکەین تا بەرز بفڕێت. چالاکی، کۆنفرانس، پێشانگا و بەرنامە کولتوورییەکانمان پردەکانن کە پێیاندا دەپەڕینەوە بەرەو عێراقێکی جوانتر، کە تێیدا دەنگی ئازاد گوێ لێ دەگیرێت و نووسین و هونەر گەشە دەکات.'
    },
    creativeSloganTitle: {
      en: 'We Create Space for Creativity!',
      ar: 'نصنع مساحة للإبداع!',
      ku: 'ئێمە شوێن بۆ داهێنان دروست دەکەین!'
    },
    creativeSloganText: {
      en: 'At the Rida Alwan Foundation, we create space for creativity! We initiate to inspire!',
      ar: 'في مؤسسة بُن رضا علوان نصنع مساحة للإبداع! نُبادر لنُلھم!',
      ku: 'لە دامەزراوەی ڕیدا علوان ئێمە شوێن بۆ داهێنان دروست دەکەین! ئێمە دەستپێدەکەین بۆ ئیلهام بەخشین!'
    },
    programsTitle: {
      en: 'Our Cultural Programs',
      ar: 'برامجنا الثقافية',
      ku: 'بەرنامە کولتوورییەکانمان'
    },
    programs: [
      {
        title: {
          en: 'Cultural Events',
          ar: 'فعالیاتنا الثقافية',
          ku: 'چالاکی کولتوورییەکانمان'
        },
        description: {
          en: 'Regular cultural events that celebrate Iraqi heritage and contemporary arts',
          ar: 'فعاليات ثقافية منتظمة تحتفي بالتراث العراقي والفنون المعاصرة',
          ku: 'چالاکی کولتووری بەردەوام کە ڕێزگرتن لە میراتی عێراقی و هونەری سەردەم دەکات'
        }
      },
      {
        title: {
          en: 'Seminars & Workshops',
          ar: 'ندواتنا وورش العمل',
          ku: 'کۆنفرانس و وۆرکشۆپەکانمان'
        },
        description: {
          en: 'Educational seminars and hands-on workshops for artists and cultural enthusiasts',
          ar: 'ندوات تعليمية وورش عمل تطبيقية للفنانين ومحبي الثقافة',
          ku: 'کۆنفرانسی پەروەردەیی و وۆرکشۆپی عەملی بۆ هونەرمەندان و حەزخوازانی کولتوور'
        }
      },
      {
        title: {
          en: 'Art Exhibitions',
          ar: 'معارضنا الفنية',
          ku: 'پێشانگا هونەرییەکانمان'
        },
        description: {
          en: 'Showcasing the works of talented Iraqi artists and promoting artistic expression',
          ar: 'عرض أعمال الفنانين العراقيين الموهوبين وتعزيز التعبير الفني',
          ku: 'نیشاندانی کارەکانی هونەرمەندە بەهرەمەندەکانی عێراقی و پشتگیریکردنی دەربڕینی هونەری'
        }
      },
      {
        title: {
          en: 'Literary Programs',
          ar: 'البرامج الأدبية',
          ku: 'بەرنامە ئەدەبییەکان'
        },
        description: {
          en: 'Supporting writers and poets through literary evenings and publishing opportunities',
          ar: 'دعم الكتاب والشعراء من خلال الأمسيات الأدبية وفرص النشر',
          ku: 'پشتگیریکردنی نووسەر و شاعیران لە ڕێگەی ئێوارە ئەدەبییەکان و دەرفەتەکانی بڵاوکردنەوە'
        }
      }
    ]
  };

  return (
    <main>
      {/* Hero Section */}
      <section 
        className="w-full h-[70vh] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(/imgs/culture/culture-hero.jpg)' // You can change this image path
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 to-brand-black/40"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center max-w-4xl px-8 ${
            locale === 'en' ? 'text-left' : 'text-right'
          }`}>
            <h1 className={`text-6xl font-bold text-white mb-6 ${
              locale === 'en' ? 'font-sans' : 'font-arabic'
            }`}>
              {cultureContent.heroTitle[locale as keyof typeof cultureContent.heroTitle]}
            </h1>
            <p className={`text-2xl text-white/90 ${
              locale === 'en' ? 'font-sans' : 'font-arabic'
            }`}>
              {cultureContent.heroSubtitle[locale as keyof typeof cultureContent.heroSubtitle]}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Title */}
            <div className={`mb-12 ${
              locale === 'en' ? 'text-left' : 'text-right'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 bg-brand-red rounded-full flex-shrink-0"></div>
                <h2 className={`text-4xl font-bold text-brand-black dark:text-brand-white ${
                  locale === 'en' ? 'font-sans' : 'font-arabic'
                }`}>
                  {cultureContent.missionTitle[locale as keyof typeof cultureContent.missionTitle]}
                </h2>
              </div>
            </div>

            {/* Mission Text */}
            <div className={`mb-16 ${
              locale === 'en' ? 'text-left' : 'text-right'
            }`}>
              <p className={`text-xl leading-relaxed text-brand-black/80 dark:text-brand-white/80 max-w-5xl ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              }`}>
                {cultureContent.missionText[locale as keyof typeof cultureContent.missionText]}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Title */}
            <div className={`mb-16 ${
              locale === 'en' ? 'text-left' : 'text-right'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 bg-brand-red rounded-full flex-shrink-0"></div>
                <h2 className={`text-4xl font-bold text-brand-black dark:text-brand-white ${
                  locale === 'en' ? 'font-sans' : 'font-arabic'
                }`}>
                  {cultureContent.programsTitle[locale as keyof typeof cultureContent.programsTitle]}
                </h2>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {cultureContent.programs.map((program, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-brand-black rounded-xl p-8 transition-shadow duration-300"
                >
                  <h3 className={`text-2xl font-bold text-brand-black dark:text-brand-white mb-4 ${
                    locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                  }`}>
                    {program.title[locale as keyof typeof program.title]}
                  </h3>
                  <p className={`text-lg text-brand-black/70 dark:text-brand-white/70 ${
                    locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                  }`}>
                    {program.description[locale as keyof typeof program.description]}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Creative Slogan Section */}
      <section className="py-20 bg-brand-red">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className={`text-5xl font-bold text-white mb-8 ${
              locale === 'en' ? 'font-sans' : 'font-arabic'
            }`}>
              {cultureContent.creativeSloganTitle[locale as keyof typeof cultureContent.creativeSloganTitle]}
            </h2>
            
            <p className={`text-2xl text-white/90 ${
              locale === 'en' ? 'font-sans' : 'font-arabic'
            }`}>
              {cultureContent.creativeSloganText[locale as keyof typeof cultureContent.creativeSloganText]}
            </p>

          </div>
    </div>
      </section>
    </main>
  );
} 