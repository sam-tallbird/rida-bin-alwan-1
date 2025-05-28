'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Locale } from '@/lib/i18n/config';

export default function TasteCoffeeSection() {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;
  
  const { elementRef, scrollProgress } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '-10% 0px -10% 0px'
  });

  // Interpolate colors based on scroll progress
  const getBackgroundStyle = () => {
    const progress = scrollProgress;
    
    // RGB values for brand-white (255, 255, 255) to brand-red (200, 41, 40)
    const whiteR = 255, whiteG = 255, whiteB = 255;
    const redR = 200, redG = 41, redB = 40;
    
    const r = Math.round(whiteR + (redR - whiteR) * progress);
    const g = Math.round(whiteG + (redG - whiteG) * progress);
    const b = Math.round(whiteB + (redB - whiteB) * progress);
    
    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      transition: 'none', // Disable CSS transitions for smooth scroll animation
    };
  };

  // Get text color based on progress
  const getTextColor = () => {
    return scrollProgress > 0.5 ? 'text-brand-white' : 'text-brand-black';
  };

  // Get headline animation styles
  const getHeadlineStyle = () => {
    const progress = scrollProgress;
    
    // Start: 30% bigger and pushed down
    // End: default size and position
    const startScale = 3.3; // 30% bigger
    const endScale = 1.0;   // default size
    const startTranslateY = 600; // pushed down in pixels
    const endTranslateY = 0;    // default position
    
    // Create offset between scale and position animations
    // Scale animation: starts immediately (0-0.9 of progress)
    const scaleProgress = Math.min(progress / 0.9, 1);
    // Position animation: starts after a small delay (0.1-1.0 of progress)
    const positionProgress = Math.max(0, (progress - 0.1) / 0.9);
    
    const scale = startScale - (startScale - endScale) * scaleProgress;
    const translateY = startTranslateY - (startTranslateY - endTranslateY) * positionProgress;
    
    return {
      transform: `scale(${scale}) translateY(${translateY}px)`,
      transformOrigin: 'center center',
      transition: 'none', // Disable CSS transitions for smooth scroll animation
    };
  };

  return (
    <section 
      ref={elementRef}
      className="py-32 transition-none"
      style={getBackgroundStyle()}
    >
      <div className="container mx-auto px-12 max-w-full">
        <div className="max-w-8xl">
          {/* Big Headline - Responsive and Single Line */}
          <div className="flex items-center justify-center min-h-[50vh] mb-16">
            <h1 
              className={`text-center whitespace-nowrap font-bold
                         text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
                         leading-none tracking-wide transition-colors duration-300 ${getTextColor()} ${
                           locale === 'en' ? 'font-sans' : locale === 'ku' ? 'font-arabic' : 'font-arabic'
                         }`}
              style={getHeadlineStyle()}
            >
              {t('tasteCoffee.headline')}
            </h1>
          </div>
          
          {/* About Illustration - Full Width */}
          <div className="w-full mb-20">
            <Image
              src="/adbout-illustration.svg"
              alt="About Coffee Illustration"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          </div>
          
          {/* Two Column Text Section */}
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Column 1 */}
              <div>
                <p className={`text-4xl leading-tight transition-colors duration-300 ${getTextColor()} ${
                  locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                }`}>
                  {t('tasteCoffee.column1')}
                </p>
              </div>
              
              {/* Column 2 */}
              <div>
                <p className={`text-4xl leading-tight transition-colors duration-300 ${getTextColor()} ${
                  locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
                }`}>
                  {t('tasteCoffee.column2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 