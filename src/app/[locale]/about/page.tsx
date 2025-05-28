import { locales as availableLocales } from '@/lib/i18n/config';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/config';
import Image from 'next/image';

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  // enable static render
  setRequestLocale(locale);
  
  const aboutContent = {
    title: {
      en: 'Who We Are',
      ar: 'من نحن',
      ku: 'ئێمە کێین'
    },
    paragraphs: {
      en: [
        'Rida Bin Alwan Company was established in the sixties of the last century in the Karrada district. The heart of Baghdad pulsates as one of the commercial landmarks owned by the Samour Company for the production of coffee in Iraq and the food industry. It started as a specialized shop for coffee and markets for coffee. With the passage of time, it evolved to become one of the largest commercial landmarks in the world of coffee in Iraq.',
        'With the transition to the second generation, the company witnessed a qualitative leap. Where it was promoted to enhance the quality and service and the value provided by benefiting from the early lessons learned to provide a unique coffee experience. Today, it continues the chain of success and dialogue, and the place of Rida Bin Alwan can be a sophisticated and comfortable place for its customers during their visits through its commitment to quality. And providing coffee that suits different tastes.',
        'The beginnings were modest with passion... The coffee that we are passionate about. We grew up with generations of coffee lovers. Our coffee grew with the taste and traditions. Our traditions and our story continue. We are more than just a coffee shop. We are a living memory.'
      ],
      ar: [
        'تأسست شركة رضا بن علوان في ستينيات القرن الماضي في منطقة الكرادة. قلب بغداد النابض كواحدة من المعالم التجارية المملوكة لشركة الصمور لإنتاج القهوة في العراق والصناعة الغذائية المحدودة. بدأت كمحمصة وأسواق للقهوة. ومع مرور الزمن، تطورت لتصبح واحدة من أكبر المعالم التجارية في عالم القهوة في العراق.',
        'مع الانتقال إلى الجيل الثاني، شهدت الشركة نقلة نوعية. حيث تم تعزيز الجودة والخدمة والقيمة المقدمة من خلال الاستفادة من الدروس المبكرة لتقديم تجربة قهوة فريدة. اليوم، تواصل سلسلة نجاح ومكان رضا بن علوان يكان يمكن أن يكون مكانًا متطورًا ومريحًا لزبائنها في خلال زياراتها من خلال التزامها بالجودة. وتقديم قهوة تناسب مختلف الأذواق.',
        'كانت البدايات متواضعة بالشغف... الشغف بالقهوة التي نحرص على عمل. وتقدم بحب. كبرنا مع أجيال عشقت قهوتنا. قهوتنا أرت الطعم والتقاليد. وتواصلنا السير نحو وتجدد. نحن أكثر من مجرد قهوة. نحن ذاكرة.'
      ],
      ku: [
        'کۆمپانیای ڕیدا بن عەلوان لە شەستەکانی سەدەی ڕابردوودا لە ناوچەی کەرادەدا دامەزرا. دڵی بەغداد وەک یەکێک لە نیشانە بازرگانییەکان کە موڵکی کۆمپانیای سەموورە بۆ بەرهەمهێنانی قاوە لە عێراق و پیشەسازی خۆراک. وەک دوکانێکی تایبەت بۆ قاوە و بازاڕەکان بۆ قاوە دەستی پێکرد. لەگەڵ تێپەڕینی کات، گەشەی کرد بۆ ئەوەی ببێتە یەکێک لە گەورەترین نیشانە بازرگانییەکان لە جیهانی قاوە لە عێراق.',
        'لەگەڵ گواستنەوە بۆ نەوەی دووەم، کۆمپانیاکە شایەتی جۆلەیەکی کوالیتی بوو. لەوێدا بەرزکرایەوە بۆ بەهێزکردنی کوالیتی و خزمەتگوزاری و بەهای پێشکەشکراو لە ڕێگەی سوودوەرگرتن لە وانە زووەکانەوە بۆ پێشکەشکردنی ئەزموونێکی تایبەتی قاوە. ئەمڕۆ، زنجیرەی سەرکەوتن و گفتوگۆ بەردەوامە، و شوێنی ڕیدا بن عەلوان دەتوانێت شوێنێکی پێشکەوتوو و ئاسوودە بێت بۆ کڕیارەکانی لە کاتی سەردانەکانیان لە ڕێگەی پابەندبوونیان بە کوالیتییەوە. و پێشکەشکردنی قاوەیەک کە گونجاو بێت لەگەڵ تامە جیاوازەکان.',
        'دەستپێکەکان بچووک بوون لەگەڵ حەز... حەزی قاوەکە کە ئێمە حەزمان لێیە. لەگەڵ نەوەکانی حەزخوازانی قاوە گەورە بووین. قاوەکەمان لەگەڵ تام و نەریتەکان گەورە بوو. نەریت و چیرۆکەکەمان بەردەوامە. ئێمە زیاتر لە تەنها دوکانێکی قاوەین. ئێمە یادەوەرییەکی زیندووین.'
      ]
    }
  };

  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black">
      {/* Header Images Section */}
      <section className="w-full h-[32rem] flex px-8 py-6 gap-4">
        {/* Left Image */}
        <div className="w-1/2">
          <Image 
            src="/imgs/about-us/header-left.JPG" 
            alt="Coffee shop interior left"
            className="w-full h-full object-cover rounded-lg"
            width={800}
            height={600}
            priority
          />
        </div>

        {/* Right Image */}
        <div className="w-1/2">
          <Image 
            src="/imgs/about-us/header-right.JPG" 
            alt="Coffee shop interior right"
            className="w-full h-full object-cover rounded-lg"
            width={800}
            height={600}
            priority
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-8xl">
            {/* Title */}
            <div className="mb-16">
              <h1 className={`text-6xl font-bold text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
              }`}>
                {aboutContent.title[locale as keyof typeof aboutContent.title]}
              </h1>
            </div>

            {/* Content Paragraphs */}
            <div className="max-w-7xl mb-16">
              <div className="space-y-8">
                {aboutContent.paragraphs[locale as keyof typeof aboutContent.paragraphs].map((paragraph, index) => (
                  <p 
                    key={index}
                    className={`text-lg leading-relaxed text-brand-black/80 dark:text-brand-white/80 ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
    </div>
      </section>
    </main>
  );
} 