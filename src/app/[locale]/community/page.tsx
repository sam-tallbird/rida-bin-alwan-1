import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function CommunityPage({ params }: PageProps) {
  const { locale } = await params;
  // enable static render
  setRequestLocale(locale);

  const communityContent = {
    heroTitle: {
      en: "Coffee & Tea Festival",
      ar: "مهرجان القهوة والشاي",
      ku: "فێستیڤاڵی قاوە و چا"
    },
    heroSubtitle: {
      en: "A Convergence of Taste & Flavor",
      ar: "ملتقى الطعم والنكهة",
      ku: "کۆبوونەوەی تام و تێم"
    },
    festivalDescription: {
      en: "The Coffee & Tea Festival was launched in Baghdad by Ridha Alwan as a founding partner, creating a unique platform for coffee and tea enthusiasts. What began as an inaugural edition has grown to welcome thousands of visitors annually, becoming a cornerstone event held every October.",
      ar: "تم إطلاق مهرجان القهوة والشاي في بغداد من قبل رضا علوان كشريك مؤسس، مما خلق منصة فريدة لعشاق القهوة والشاي. ما بدأ كنسخة افتتاحية نما ليرحب بآلاف الزوار سنوياً، ليصبح حدثاً أساسياً يقام كل أكتوبر.",
      ku: "فێستیڤاڵی قاوە و چا لە بەغدا دەستپێکرا لەلایەن ڕیدا عەلوانەوە وەک هاوبەشێکی دامەزرێنەر، پلاتفۆرمێکی ناوازەی بۆ ئارەزووکارانی قاوە و چا دروستکرد. ئەوەی وەک وەشانێکی دەستپێکەر دەستی پێکرد گەشەی کرد بۆ پێشوازی لە هەزاران سەردان ساڵانە، بووە ڕووداوێکی بنەڕەتی کە هەموو ئۆکتۆبەرێک بەڕێوەدەچێت."
    },
    growth: {
      en: "The festival has evolved into a premier destination for specialty coffee and tea, serving professionals, merchants, artisans, and enthusiasts alike.",
      ar: "تطور المهرجان ليصبح وجهة رائدة للقهوة والشاي المتخصصة، يخدم المهنيين والتجار والحرفيين والمتحمسين على حد سواء.",
      ku: "فێستیڤاڵەکە گەشەی کردووە بۆ شوێنێکی پێشەنگ بۆ قاوە و چای تایبەت، خزمەت بە پیشەییەکان و بازرگانان و هونەرمەندان و ئارەزووکارانەکان دەکات."
    },
    highlights2024: {
      en: "2024 Festival Highlights",
      ar: "أبرز أحداث مهرجان 2024",
      ku: "گرنگترین ڕووداوەکانی فێستیڤاڵی 2024"
    },
    visitorsNumber: {
      en: "62,000+",
      ar: "أكثر من 62,000",
      ku: "زیاتر لە 62,000"
    },
    visitorsText: {
      en: "Visitors",
      ar: "زائر",
      ku: "سەردان"
    },
    companiesNumber: {
      en: "58",
      ar: "58",
      ku: "58"
    },
    companiesText: {
      en: "Participating Companies",
      ar: "شركة مشاركة",
      ku: "کۆمپانیای بەشدار"
    },
    workshopsInfo: {
      en: "Professional Workshops & Tastings",
      ar: "ورش عمل مهنية وتذوق",
      ku: "وۆرکشۆپی پیشەیی و تام کردن"
    },
    specialtyFocus: {
      en: "Specialty Coffee & Tea Focus",
      ar: "التركيز على القهوة والشاي المتخصصة",
      ku: "گرنگیدان بە قاوە و چای تایبەت"
    },
    galleryTitle: {
      en: "Festival Gallery",
      ar: "معرض المهرجان",
      ku: "گاڵەرییی فێستیڤاڵ"
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/coffee-festival-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${
            locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
          }`}>
            {communityContent.heroTitle[locale as keyof typeof communityContent.heroTitle]}
          </h1>
          <p className={`text-xl md:text-2xl ${
            locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
          }`}>
            {communityContent.heroSubtitle[locale as keyof typeof communityContent.heroSubtitle]}
          </p>
        </div>
      </section>

      {/* Main Festival Content */}
      <section className="py-16 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-8xl mx-auto">
            <div className={`space-y-8 ${
              locale === 'en' ? 'text-left' : 'text-right'
            }`}>
              <p className={`text-lg leading-relaxed text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              }`}>
                {communityContent.festivalDescription[locale as keyof typeof communityContent.festivalDescription]}
              </p>
              <p className={`text-lg leading-relaxed text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans' : 'font-arabic'
              }`}>
                {communityContent.growth[locale as keyof typeof communityContent.growth]}
              </p>
            </div>

            {/* 2024 Highlights */}
            <div className="mt-16">
              <h2 className={`text-4xl font-bold mb-8 text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'text-left font-sans' : 'text-right font-arabic'
              }`}>
                {communityContent.highlights2024[locale as keyof typeof communityContent.highlights2024]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-brand-white-surface dark:bg-brand-black-surface rounded-lg">
                  <div className="text-3xl font-bold text-brand-red mb-2">
                    {communityContent.visitorsNumber[locale as keyof typeof communityContent.visitorsNumber]}
                  </div>
                  <div className={`text-lg font-semibold text-brand-black dark:text-brand-white ${
                    locale === 'en' ? 'font-sans' : 'font-arabic'
                  }`}>
                    {communityContent.visitorsText[locale as keyof typeof communityContent.visitorsText]}
                  </div>
                </div>
                <div className="text-center p-6 bg-brand-white-surface dark:bg-brand-black-surface rounded-lg">
                  <div className="text-3xl font-bold text-brand-red mb-2">
                    {communityContent.companiesNumber[locale as keyof typeof communityContent.companiesNumber]}
                  </div>
                  <div className={`text-lg font-semibold text-brand-black dark:text-brand-white ${
                    locale === 'en' ? 'font-sans' : 'font-arabic'
                  }`}>
                    {communityContent.companiesText[locale as keyof typeof communityContent.companiesText]}
                  </div>
                </div>
                <div className="text-center p-6 bg-brand-white-surface dark:bg-brand-black-surface rounded-lg">
                  <div className="text-2xl font-bold text-brand-red mb-2">
                    Professional Workshops
                  </div>
                  <div className={`text-lg font-semibold text-brand-black dark:text-brand-white ${
                    locale === 'en' ? 'font-sans' : 'font-arabic'
                  }`}>
                    & Tastings
                  </div>
                </div>
                <div className="text-center p-6 bg-brand-white-surface dark:bg-brand-black-surface rounded-lg">
                  <div className="text-2xl font-bold text-brand-red mb-2">
                    Specialty Coffee
                  </div>
                  <div className={`text-lg font-semibold text-brand-black dark:text-brand-white ${
                    locale === 'en' ? 'font-sans' : 'font-arabic'
                  }`}>
                    & Tea Focus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-brand-white-surface dark:bg-brand-black-surface">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-8xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 text-center text-brand-black dark:text-brand-white ${
              locale === 'en' ? 'font-sans' : 'font-arabic'
            }`}>
              {communityContent.galleryTitle[locale as keyof typeof communityContent.galleryTitle]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="aspect-square bg-gray-300 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                    <span className="text-amber-800 font-semibold">Festival Photo {index}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 