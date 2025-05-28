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

export default async function BranchesPage({ params }: PageProps) {
  const { locale } = await params;
  // enable static render
  setRequestLocale(locale);

  const branches = [
    {
      id: 1,
      name: {
        en: 'Baghdad Central Branch',
        ar: 'فرع بغداد المركزي',
        ku: 'لقی ناوەندی بەغداد'
      },
      address: {
        en: '123 Al-Karrada Street, Baghdad',
        ar: '123 شارع الكرادة، بغداد',
        ku: '123 شەقامی کەرادە، بەغداد'
      },
      phone: '+964 770 123 4567',
      location: {
        en: 'Al-Karrada District',
        ar: 'منطقة الكرادة',
        ku: 'ناوچەی کەرادە'
      },
      image: '/imgs/branches/Screenshot2025-05-2417390.jpeg'
    },
    {
      id: 2,
      name: {
        en: 'Erbil Heritage Branch',
        ar: 'فرع أربيل التراثي',
        ku: 'لقی میراتی هەولێر'
      },
      address: {
        en: '456 Citadel Road, Erbil',
        ar: '456 طريق القلعة، أربيل',
        ku: '456 ڕێگای قەڵا، هەولێر'
      },
      phone: '+964 750 234 5678',
      location: {
        en: 'Citadel Area',
        ar: 'منطقة القلعة',
        ku: 'ناوچەی قەڵا'
      },
      image: '/imgs/branches/Screenshot2025-05-2417393.jpeg'
    },
    {
      id: 3,
      name: {
        en: 'Basra Waterfront Branch',
        ar: 'فرع البصرة الواجهة المائية',
        ku: 'لقی کەناری ئاوی بەسرە'
      },
      address: {
        en: '789 Corniche Street, Basra',
        ar: '789 شارع الكورنيش، البصرة',
        ku: '789 شەقامی کۆرنیش، بەسرە'
      },
      phone: '+964 740 345 6789',
      location: {
        en: 'Corniche Street',
        ar: 'شارع الكورنيش',
        ku: 'شەقامی کۆرنیش'
      },
      image: '/imgs/branches/Screenshot2025-05-2417405.jpeg'
    },
    {
      id: 4,
      name: {
        en: 'Mosul Historic Branch',
        ar: 'فرع الموصل التاريخي',
        ku: 'لقی مێژوویی موسڵ'
      },
      address: {
        en: '321 Old City Street, Mosul',
        ar: '321 شارع المدينة القديمة، الموصل',
        ku: '321 شەقامی شاری کۆن، موسڵ'
      },
      phone: '+964 760 456 7890',
      location: {
        en: 'Old City Quarter',
        ar: 'حي المدينة القديمة',
        ku: 'گەڕەکی شاری کۆن'
      },
      image: '/imgs/branches/Screenshot2025-05-2417412.jpeg'
    },
    {
      id: 5,
      name: {
        en: 'Najaf Cultural Branch',
        ar: 'فرع النجف الثقافي',
        ku: 'لقی کولتووری نەجەف'
      },
      address: {
        en: '654 University Avenue, Najaf',
        ar: '654 شارع الجامعة، النجف',
        ku: '654 شەقامی زانکۆ، نەجەف'
      },
      phone: '+964 780 567 8901',
      location: {
        en: 'University District',
        ar: 'منطقة الجامعة',
        ku: 'ناوچەی زانکۆ'
      },
      image: '/imgs/branches/Screenshot2025-05-2417422.jpeg'
    },
    {
      id: 6,
      name: {
        en: 'Sulaymaniyah Modern Branch',
        ar: 'فرع السليمانية الحديث',
        ku: 'لقی نوێی سلێمانی'
      },
      address: {
        en: '987 City Center Mall, Sulaymaniyah',
        ar: '987 مول مركز المدينة، السليمانية',
        ku: '987 مۆڵی ناوەندی شار، سلێمانی'
      },
      phone: '+964 770 678 9012',
      location: {
        en: 'City Center Mall',
        ar: 'مول مركز المدينة',
        ku: 'مۆڵی ناوەندی شار'
      },
      image: '/imgs/branches/Screenshot2025-05-2417424.jpeg'
    },
    {
      id: 7,
      name: {
        en: 'Karbala Pilgrimage Branch',
        ar: 'فرع كربلاء الزيارة',
        ku: 'لقی زیارەتی کەربەلا'
      },
      address: {
        en: '147 Holy Shrine Street, Karbala',
        ar: '147 شارع الحرم الشريف، كربلاء',
        ku: '147 شەقامی حەرەمی پیرۆز، کەربەلا'
      },
      phone: '+964 750 789 0123',
      location: {
        en: 'Holy Shrine Area',
        ar: 'منطقة الحرم الشريف',
        ku: 'ناوچەی حەرەمی پیرۆز'
      },
      image: '/imgs/branches/Screenshot2025-05-2417425.jpeg'
    },
    {
      id: 8,
      name: {
        en: 'Dohuk Mountain Branch',
        ar: 'فرع دهوك الجبلي',
        ku: 'لقی چیایی دهۆک'
      },
      address: {
        en: '258 Mountain View Plaza, Dohuk',
        ar: '258 ساحة إطلالة الجبل، دهوك',
        ku: '258 یاساگای دیمەنی چیا، دهۆک'
      },
      phone: '+964 740 890 1234',
      location: {
        en: 'Mountain View Plaza',
        ar: 'ساحة إطلالة الجبل',
        ku: 'یاساگای دیمەنی چیا'
      },
      image: '/imgs/branches/Screenshot2025-05-2417431.jpeg'
    },
    {
      id: 9,
      name: {
        en: 'Kirkuk Heritage Branch',
        ar: 'فرع كركوك التراثي',
        ku: 'لقی میراتی کەرکووک'
      },
      address: {
        en: '369 Citadel District, Kirkuk',
        ar: '369 منطقة القلعة، كركوك',
        ku: '369 ناوچەی قەڵا، کەرکووک'
      },
      phone: '+964 760 901 2345',
      location: {
        en: 'Citadel District',
        ar: 'منطقة القلعة',
        ku: 'ناوچەی قەڵا'
      },
      image: '/imgs/branches/Screenshot2025-05-2417433.jpeg'
    },
    {
      id: 10,
      name: {
        en: 'Ramadi Riverside Branch',
        ar: 'فرع الرمادي النهري',
        ku: 'لقی کەناری ڕووباری ڕەمادی'
      },
      address: {
        en: '741 Euphrates Corniche, Ramadi',
        ar: '741 كورنيش الفرات، الرمادي',
        ku: '741 کۆرنیشی فورات، ڕەمادی'
      },
      phone: '+964 780 012 3456',
      location: {
        en: 'Euphrates Corniche',
        ar: 'كورنيش الفرات',
        ku: 'کۆرنیشی فورات'
      },
      image: '/imgs/branches/Screenshot2025-05-2417434.jpeg'
    },
    {
      id: 11,
      name: {
        en: 'Fallujah Traditional Branch',
        ar: 'فرع الفلوجة التقليدي',
        ku: 'لقی تەقلیدی فەلووجە'
      },
      address: {
        en: '852 Old Market Street, Fallujah',
        ar: '852 شارع السوق القديم، الفلوجة',
        ku: '852 شەقامی بازاڕی کۆن، فەلووجە'
      },
      phone: '+964 770 123 4567',
      location: {
        en: 'Old Market Area',
        ar: 'منطقة السوق القديم',
        ku: 'ناوچەی بازاڕی کۆن'
      },
      image: '/imgs/branches/Screenshot2025-05-2417435.jpeg'
    },
    {
      id: 12,
      name: {
        en: 'Tikrit Historic Branch',
        ar: 'فرع تكريت التاريخي',
        ku: 'لقی مێژوویی تکریت'
      },
      address: {
        en: '963 Palace District, Tikrit',
        ar: '963 منطقة القصر، تكريت',
        ku: '963 ناوچەی کۆشک، تکریت'
      },
      phone: '+964 750 234 5678',
      location: {
        en: 'Palace District',
        ar: 'منطقة القصر',
        ku: 'ناوچەی کۆشک'
      },
      image: '/imgs/branches/Screenshot2025-05-2417441.jpeg'
    },
    {
      id: 13,
      name: {
        en: 'Samarra Cultural Branch',
        ar: 'فرع سامراء الثقافي',
        ku: 'لقی کولتووری سامەڕا'
      },
      address: {
        en: '174 Minaret Square, Samarra',
        ar: '174 ساحة المئذنة، سامراء',
        ku: '174 گۆڕەپانی مناڕە، سامەڕا'
      },
      phone: '+964 740 345 6789',
      location: {
        en: 'Minaret Square',
        ar: 'ساحة المئذنة',
        ku: 'گۆڕەپانی مناڕە'
      },
      image: '/imgs/branches/Screenshot2025-05-2417442.jpeg'
    },
    {
      id: 14,
      name: {
        en: 'Baqubah Garden Branch',
        ar: 'فرع بعقوبة الحديقة',
        ku: 'لقی باخچەی بەعقووبە'
      },
      address: {
        en: '285 Central Park Avenue, Baqubah',
        ar: '285 شارع الحديقة المركزية، بعقوبة',
        ku: '285 شەقامی پارکی ناوەندی، بەعقووبە'
      },
      phone: '+964 760 456 7890',
      location: {
        en: 'Central Park Area',
        ar: 'منطقة الحديقة المركزية',
        ku: 'ناوچەی پارکی ناوەندی'
      },
      image: '/imgs/branches/Screenshot2025-05-2417443.jpeg'
    },
    {
      id: 15,
      name: {
        en: 'Hillah Ancient Branch',
        ar: 'فرع الحلة الأثري',
        ku: 'لقی کۆنی حیلە'
      },
      address: {
        en: '396 Babylon Ruins Road, Hillah',
        ar: '396 طريق آثار بابل، الحلة',
        ku: '396 ڕێگای کەلووپەلی بابل، حیلە'
      },
      phone: '+964 780 567 8901',
      location: {
        en: 'Babylon Ruins Area',
        ar: 'منطقة آثار بابل',
        ku: 'ناوچەی کەلووپەلی بابل'
      },
      image: '/imgs/branches/Screenshot2025-05-2417444.jpeg'
    },
    {
      id: 16,
      name: {
        en: 'Nasiriyah Marsh Branch',
        ar: 'فرع الناصرية الأهوار',
        ku: 'لقی زەویی ناسریە'
      },
      address: {
        en: '507 Marshlands District, Nasiriyah',
        ar: '507 منطقة الأهوار، الناصرية',
        ku: '507 ناوچەی زەوی، ناسریە'
      },
      phone: '+964 770 678 9012',
      location: {
        en: 'Marshlands District',
        ar: 'منطقة الأهوار',
        ku: 'ناوچەی زەوی'
      },
      image: '/imgs/branches/Screenshot2025-05-2417445.jpeg'
    },
    {
      id: 17,
      name: {
        en: 'Amara Riverside Branch',
        ar: 'فرع العمارة النهري',
        ku: 'لقی کەناری ڕووباری عەمارە'
      },
      address: {
        en: '618 Tigris Waterfront, Amara',
        ar: '618 واجهة دجلة المائية، العمارة',
        ku: '618 کەناری ئاوی دجلە، عەمارە'
      },
      phone: '+964 750 789 0123',
      location: {
        en: 'Tigris Waterfront',
        ar: 'واجهة دجلة المائية',
        ku: 'کەناری ئاوی دجلە'
      },
      image: '/imgs/branches/Screenshot2025-05-2417451.jpeg'
    },
    {
      id: 18,
      name: {
        en: 'Kut Traditional Branch',
        ar: 'فرع الكوت التقليدي',
        ku: 'لقی تەقلیدی کووت'
      },
      address: {
        en: '729 Heritage Quarter, Kut',
        ar: '729 حي التراث، الكوت',
        ku: '729 گەڕەکی میرات، کووت'
      },
      phone: '+964 740 890 1234',
      location: {
        en: 'Heritage Quarter',
        ar: 'حي التراث',
        ku: 'گەڕەکی میرات'
      },
      image: '/imgs/branches/Screenshot2025-05-2417452.jpeg'
    },
    {
      id: 19,
      name: {
        en: 'Diwaniyah Cultural Branch',
        ar: 'فرع الديوانية الثقافي',
        ku: 'لقی کولتووری دیوانیە'
      },
      address: {
        en: '830 Arts District, Diwaniyah',
        ar: '830 منطقة الفنون، الديوانية',
        ku: '830 ناوچەی هونەر، دیوانیە'
      },
      phone: '+964 760 901 2345',
      location: {
        en: 'Arts District',
        ar: 'منطقة الفنون',
        ku: 'ناوچەی هونەر'
      },
      image: '/imgs/branches/Screenshot2025-05-2417453.jpeg'
    },
    {
      id: 20,
      name: {
        en: 'Samawah Desert Branch',
        ar: 'فرع السماوة الصحراوي',
        ku: 'لقی بیابانی سەماوە'
      },
      address: {
        en: '941 Desert Highway, Samawah',
        ar: '941 طريق الصحراء، السماوة',
        ku: '941 ڕێگای بیابان، سەماوە'
      },
      phone: '+964 780 012 3456',
      location: {
        en: 'Desert Highway',
        ar: 'طريق الصحراء',
        ku: 'ڕێگای بیابان'
      },
      image: '/imgs/branches/Screenshot2025-05-2417463.jpeg'
    },
    {
      id: 21,
      name: {
        en: 'Zakho Border Branch',
        ar: 'فرع زاخو الحدودي',
        ku: 'لقی سنووری زاخۆ'
      },
      address: {
        en: '152 Border Crossing Area, Zakho',
        ar: '152 منطقة المعبر الحدودي، زاخو',
        ku: '152 ناوچەی پەڕینەوەی سنوور، زاخۆ'
      },
      phone: '+964 770 123 4567',
      location: {
        en: 'Border Crossing Area',
        ar: 'منطقة المعبر الحدودي',
        ku: 'ناوچەی پەڕینەوەی سنوور'
      },
      image: '/imgs/branches/Screenshot2025-05-2417464.jpeg'
    },
    {
      id: 22,
      name: {
        en: 'Halabja Memorial Branch',
        ar: 'فرع هەڵەبجە التذكاري',
        ku: 'لقی یادگاری هەڵەبجە'
      },
      address: {
        en: '263 Memorial Park, Halabja',
        ar: '263 حديقة النصب التذكاري، هەڵەبجە',
        ku: '263 پارکی یادگاری، هەڵەبجە'
      },
      phone: '+964 750 234 5678',
      location: {
        en: 'Memorial Park',
        ar: 'حديقة النصب التذكاري',
        ku: 'پارکی یادگاری'
      },
      image: '/imgs/branches/Screenshot2025-05-2417465.jpeg'
    },
    {
      id: 23,
      name: {
        en: 'Rania Mountain Branch',
        ar: 'فرع رانية الجبلي',
        ku: 'لقی چیایی ڕانیە'
      },
      address: {
        en: '374 Mountain Resort, Rania',
        ar: '374 منتجع الجبل، رانية',
        ku: '374 پشووگەی چیا، ڕانیە'
      },
      phone: '+964 740 345 6789',
      location: {
        en: 'Mountain Resort',
        ar: 'منتجع الجبل',
        ku: 'پشووگەی چیا'
      },
      image: '/imgs/branches/Screenshot2025-05-2417470.jpeg'
    },
    {
      id: 24,
      name: {
        en: 'Shaqlawa Resort Branch',
        ar: 'فرع شقلاوة المنتجع',
        ku: 'لقی پشووگەی شەقڵاوە'
      },
      address: {
        en: '485 Tourist Area, Shaqlawa',
        ar: '485 المنطقة السياحية، شقلاوة',
        ku: '485 ناوچەی گەشتیاری، شەقڵاوە'
      },
      phone: '+964 760 456 7890',
      location: {
        en: 'Tourist Area',
        ar: 'المنطقة السياحية',
        ku: 'ناوچەی گەشتیاری'
      },
      image: '/imgs/branches/Screenshot2025-05-2417471.jpeg'
    },
    {
      id: 25,
      name: {
        en: 'Penjwin Border Branch',
        ar: 'فرع پەنجوین الحدودي',
        ku: 'لقی سنووری پەنجوین'
      },
      address: {
        en: '596 Mountain Border, Penjwin',
        ar: '596 الحدود الجبلية، پەنجوین',
        ku: '596 سنووری چیایی، پەنجوین'
      },
      phone: '+964 780 567 8901',
      location: {
        en: 'Mountain Border',
        ar: 'الحدود الجبلية',
        ku: 'سنووری چیایی'
      },
      image: '/imgs/branches/Screenshot2025-05-2417473.jpeg'
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section 
        className="w-full h-[40vh] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(/imgs/branches/Screenshot2025-05-2417431.jpeg)'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-brand-black bg-opacity-40"></div>
      </section>

      {/* Branches Section */}
      <section className="py-20 bg-brand-white dark:bg-brand-black">
        <div className="container mx-auto px-12 max-w-full">
          <div className="max-w-8xl mx-auto">
            {/* Headline */}
            <div className="max-w-7xl mb-16">
              <h3 className={`text-4xl leading-tight text-brand-black dark:text-brand-white ${
                locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
              }`}>
                {locale === 'en' ? 'Where every cup tells a story and every sip feels like home' : 
                 locale === 'ar' ? 'حيث كل فنجان يحكي قصة وكل رشفة تشعرك بالبيت' : 
                 'لێرە هەر کوپێک چیرۆکێک دەگێڕێتەوە و هەر جرعەیەک هەست بە ماڵەوە دەکات'}
              </h3>
            </div>

            {/* Branches Cards Grid - 4 column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Branch Image - At the top */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <Image 
                      src={branch.image} 
                      alt={branch.name[locale as keyof typeof branch.name]}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={533}
                    />
                  </div>
                  
                  {/* Branch Info - At the bottom */}
                  <div className="p-4 space-y-2">
                    {/* Branch Name */}
                    <h4 className={`text-lg font-medium text-brand-black dark:text-brand-white ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}>
                      {branch.name[locale as keyof typeof branch.name]}
                    </h4>
                    
                    {/* Address */}
                    <p className={`text-sm text-brand-black/70 dark:text-brand-white/70 ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}>
                      📍 {branch.address[locale as keyof typeof branch.address]}
                    </p>
                    
                    {/* Phone */}
                    <p className={`text-sm text-brand-black/70 dark:text-brand-white/70 ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}>
                      📞 <span dir="ltr">{branch.phone}</span>
                    </p>
                    
                    {/* Location */}
                    <p className={`text-sm text-brand-black/60 dark:text-brand-white/60 ${
                      locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                    }`}>
                      🏢 {branch.location[locale as keyof typeof branch.location]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </div>
      </section>
    </main>
  );
} 