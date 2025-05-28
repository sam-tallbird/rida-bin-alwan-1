'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';

interface ServiceCardProps {
  cardNumber: string;
  cardKey: string;
  imageSrc: string;
  index: number;
  rotation?: number;
}

export default function ServiceCard({ 
  cardNumber, 
  cardKey, 
  imageSrc, 
  index: _index, // eslint-disable-line @typescript-eslint/no-unused-vars
  rotation: _rotation = 0 // eslint-disable-line @typescript-eslint/no-unused-vars
}: ServiceCardProps) {
  const t = useTranslations('home.services.cards');
  const locale = useLocale() as Locale;

  return (
    <div className="bg-white dark:bg-brand-black-surface rounded-xl shadow-lg dark:shadow-brand-black/50 aspect-[3/4] w-full">
      <div className="flex flex-col h-full p-6">
        {/* Card Number */}
        <div className={`text-sm text-brand-black/60 dark:text-brand-white/60 mb-4 ${
          locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
        }`}>
          {cardNumber}
        </div>
        
        {/* Headline */}
        <h4 className={`text-lg font-semibold text-brand-black dark:text-brand-white text-center mb-2 ${
          locale === 'en' ? 'font-sans' : 'font-arabic'
        }`}>
          {t(`${cardKey}.headline`)}
        </h4>
        
        {/* Subline */}
        <p className={`text-md text-brand-black/70 dark:text-brand-white/70 text-center mb-4 ${
          locale === 'en' ? 'font-sans' : 'font-arabic'
        }`}>
          {t(`${cardKey}.subline`)}
        </p>
        
        {/* Image - Bottom 30% */}
        <div className="mt-auto">
          <div className="w-full aspect-[16/9] overflow-hidden rounded-md bg-brand-black/10 dark:bg-brand-white/10">
            <Image
              src={imageSrc}
              alt={t(`${cardKey}.headline`)}
              width={400}
              height={225}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 